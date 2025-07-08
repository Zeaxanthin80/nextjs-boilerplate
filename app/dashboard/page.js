import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "../components/SignOutButton";
import Navigation from "../components/Navigation";
import { prisma } from "../lib/prisma";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  // Fetch user's campaigns and stats
  const [campaigns, campaignStats] = await Promise.all([
    prisma.campaign.findMany({
      where: { userId: session.user.id },
      include: {
        content: {
          select: { platform: true },
        },
        _count: {
          select: { content: true },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: 5, // Show only recent 5 campaigns
    }),
    prisma.campaign.groupBy({
      by: ["status"],
      where: { userId: session.user.id },
      _count: true,
    }),
  ]);

  const totalCampaigns = campaigns.length;
  const publishedCampaigns =
    campaignStats.find((stat) => stat.status === "PUBLISHED")?._count || 0;
  const draftCampaigns =
    campaignStats.find((stat) => stat.status === "DRAFT")?._count || 0;
  const archivedCampaigns =
    campaignStats.find((stat) => stat.status === "ARCHIVED")?._count || 0;

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation session={session} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Manage your AI-powered marketing campaigns
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {/* Total Campaigns */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-4xl">📊</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Campaigns
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {totalCampaigns}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Published Campaigns */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-green-600  flex items-center justify-center">
                      <span className="text-white text-4xl">✅</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Published
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {publishedCampaigns}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Draft Campaigns */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-yellow-600 flex items-center justify-center">
                      <span className="text-white text-4xl">?</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Drafts
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {draftCampaigns}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Archived Campaigns */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 flex items-center justify-center">
                      <span className="text-white text-4xl">📦</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Archived
                      </dt>
                      <dd className="text-2xl font-bold text-gray-900">
                        {archivedCampaigns}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Campaigns */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Campaigns
                </h2>
                <Link
                  href="/campaigns/create"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Create New →
                </Link>
              </div>
            </div>

            {campaigns.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Link
                            href={`/campaigns/${campaign.id}`}
                            className="text-lg font-medium text-gray-900 hover:text-blue-600"
                          >
                            {campaign.name}
                          </Link>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              campaign.status === "PUBLISHED"
                                ? "bg-green-100 text-green-800"
                                : campaign.status === "DRAFT"
                                ? "bg-yellow-100 text-yellow-800"
                                : campaign.status === "ARCHIVED"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {campaign.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {campaign.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span>{campaign._count.content} content pieces</span>
                          <span>•</span>
                          <span>
                            {new Date(campaign.updatedAt).toLocaleDateString()}
                          </span>
                          <span>•</span>
                          <div className="flex space-x-1">
                            {Array.from(
                              new Set(campaign.content.map((c) => c.platform))
                            ).map((platform) => (
                              <span
                                key={platform}
                                className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                              >
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <Link
                        href={`/campaigns/${campaign.id}`}
                        className="ml-4 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="px-6 py-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-12 h-12 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No campaigns yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Create your first AI-powered marketing campaign to get
                  started.
                </p>
                <Link
                  href="/campaigns/create"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <span className="mr-2">✨</span>
                  Create Your First Campaign
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
