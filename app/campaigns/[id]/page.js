"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoadingSpinner from "../../components/LoadingSpinner";
import Toast from "../../components/Toast";

const PLATFORM_ICONS = {
  TIKTOK: "🎵",
  INSTAGRAM: "📸",
  FACEBOOK: "👥",
  YOUTUBE: "📹",
};

const PLATFORM_COLORS = {
  TIKTOK: "bg-pink-100 text-pink-800",
  INSTAGRAM: "bg-purple-100 text-purple-800",
  FACEBOOK: "bg-blue-100 text-blue-800",
  YOUTUBE: "bg-red-100 text-red-800",
};

export default function CampaignDetail() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
      return;
    }

    if (session && id) {
      fetchCampaign();
    }
  }, [session, id, status]);

  const fetchCampaign = async () => {
    try {
      const response = await fetch(`/api/campaigns/${id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch campaign");
      }

      const data = await response.json();
      setCampaign(data);

      // Set first content as selected by default
      if (data.content && data.content.length > 0) {
        setSelectedContent(data.content[0]);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error);
      setToast({
        type: "error",
        message: "Failed to load campaign",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCampaignStatus = async (newStatus) => {
    try {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update campaign");
      }

      setCampaign((prev) => ({ ...prev, status: newStatus }));
      setToast({
        type: "success",
        message: `Campaign ${newStatus.toLowerCase()} successfully`,
      });
    } catch (error) {
      console.error("Error updating campaign:", error);
      setToast({
        type: "error",
        message: "Failed to update campaign status",
      });
    }
  };

  if (status === "loading" || loading) {
    return <LoadingSpinner />;
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Campaign not found
          </h2>
          <Link href="/dashboard" className="text-blue-600 hover:text-blue-800">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                href="/dashboard"
                className="text-2xl font-bold text-blue-600"
              >
                MarketingHub
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900"
              >
                Dashboard
              </Link>
              <span className="text-gray-700">{session?.user?.name}</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Campaign Header */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {campaign.name}
                </h1>
                <p className="text-gray-600 mt-1">{campaign.description}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    campaign.status === "PUBLISHED"
                      ? "bg-green-100 text-green-800"
                      : campaign.status === "DRAFT"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {campaign.status}
                </span>
                {campaign.status === "DRAFT" && (
                  <button
                    onClick={() => updateCampaignStatus("PUBLISHED")}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Publish
                  </button>
                )}
                {campaign.status === "PUBLISHED" && (
                  <button
                    onClick={() => updateCampaignStatus("ARCHIVED")}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Campaign Details */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Product</h3>
                <p className="mt-1 text-sm text-gray-900">{campaign.product}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Audience</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {campaign.audience}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Tone</h3>
                <p className="mt-1 text-sm text-gray-900">{campaign.tone}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Goals</h3>
                <div className="mt-1">
                  {campaign.goals.map((goal, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Platform Selector */}
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Platform Content ({campaign.content?.length || 0})
            </h2>
            <div className="space-y-3">
              {campaign.content?.map((content) => (
                <button
                  key={content.id}
                  onClick={() => setSelectedContent(content)}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                    selectedContent?.id === content.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">
                      {PLATFORM_ICONS[content.platform]}
                    </span>
                    <div>
                      <div className="font-medium text-gray-900">
                        {content.platform}
                      </div>
                      <div className="text-sm text-gray-500">
                        {content.contentType}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Display */}
          <div className="lg:col-span-2 bg-white shadow rounded-lg">
            {selectedContent ? (
              <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">
                    {PLATFORM_ICONS[selectedContent.platform]}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                      {selectedContent.platform} Content
                    </h2>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        PLATFORM_COLORS[selectedContent.platform]
                      }`}
                    >
                      {selectedContent.contentType}
                    </span>
                  </div>
                </div>

                {/* Title */}
                {selectedContent.title && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Title
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {selectedContent.title}
                    </p>
                  </div>
                )}

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    Content
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="whitespace-pre-wrap text-gray-900">
                      {selectedContent.content}
                    </p>
                  </div>
                </div>

                {/* Hashtags */}
                {selectedContent.hashtags &&
                  selectedContent.hashtags.length > 0 && (
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">
                        Hashtags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedContent.hashtags.map((hashtag, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                          >
                            {hashtag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Call to Action */}
                {selectedContent.callToAction && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">
                      Call to Action
                    </h3>
                    <p className="font-medium text-blue-600">
                      {selectedContent.callToAction}
                    </p>
                  </div>
                )}

                {/* Copy Button */}
                <button
                  onClick={() => {
                    const fullContent = `${
                      selectedContent.title
                        ? selectedContent.title + "\n\n"
                        : ""
                    }${selectedContent.content}${
                      selectedContent.hashtags?.length
                        ? "\n\n" + selectedContent.hashtags.join(" ")
                        : ""
                    }${
                      selectedContent.callToAction
                        ? "\n\n" + selectedContent.callToAction
                        : ""
                    }`;
                    navigator.clipboard.writeText(fullContent);
                    setToast({
                      type: "success",
                      message: "Content copied to clipboard!",
                    });
                  }}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Copy Content
                </button>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <p>Select a platform to view content</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
