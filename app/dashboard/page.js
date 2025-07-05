import { auth } from "../lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "../components/SignOutButton";

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                MarketingHub
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {session.user?.name}!
              </span>
              <SignOutButton />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Welcome Section */}
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to your Dashboard, {session.user?.name}! 🎉
              </h1>
              <p className="text-gray-600 mb-6">
                You're successfully logged in and ready to start creating
                amazing marketing campaigns.
              </p>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* User Info Card */}
                <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {session.user?.name?.charAt(0) || "U"}
                          </span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Your Account
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900">
                              {session.user?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {session.user?.email}
                            </div>
                            <div className="text-sm text-gray-500">
                              Role: {session.user?.role}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Card */}
                <div className="bg-green-50 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white">🚀</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Quick Actions
                          </dt>
                          <dd>
                            <div className="mt-3 space-y-2">
                              <button className="w-full text-left px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                Create Campaign
                              </button>
                              <button className="w-full text-left px-3 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                                View Analytics
                              </button>
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics Card */}
                <div className="bg-purple-50 overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white">📊</span>
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Your Stats
                          </dt>
                          <dd>
                            <div className="mt-3 space-y-1">
                              <div className="text-sm text-gray-600">
                                Campaigns: 0
                              </div>
                              <div className="text-sm text-gray-600">
                                Total Clicks: 0
                              </div>
                              <div className="text-sm text-gray-600">
                                Conversions: 0
                              </div>
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Get Started Section */}
              <div className="mt-8 border-t border-gray-200 pt-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Get Started
                </h2>
                <div className="bg-blue-600 text-white rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">
                    Ready to launch your first campaign?
                  </h3>
                  <p className="mb-4">
                    Create powerful marketing campaigns and track their
                    performance with our advanced analytics.
                  </p>
                  <button className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-50">
                    Create Your First Campaign
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
