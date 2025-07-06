"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoadingSpinner from "../../components/LoadingSpinner";
import Toast from "../../components/Toast";
import SocialIcon from "../../components/SocialIcon";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const deleteCampaign = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/campaigns/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete campaign");
      }

      setToast({
        type: "success",
        message: "Campaign deleted successfully",
      });

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Error deleting campaign:", error);
      setToast({
        type: "error",
        message: "Failed to delete campaign",
      });
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (status === "loading" || loading) {
    return <LoadingSpinner />;
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  const isDraft = campaign.status === "DRAFT";
  const isArchived = campaign.status === "ARCHIVED";

  return (
    <div className="min-h-screen">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <svg
                  className="h-6 w-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-4">
                Delete Campaign
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete "{campaign.name}"? This action
                  cannot be undone and will permanently remove all campaign
                  content.
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  onClick={deleteCampaign}
                  disabled={deleting}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md w-24 mr-2 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleting ? "..." : "Delete"}
                </button>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={deleting}
                  className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md w-24 hover:bg-gray-400 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
              <span className="text-gray-700">
                Welcome, {session.user?.name}!
              </span>
              <Link
                href="/dashboard"
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Campaign Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {campaign.name}
              </h1>
              <div className="flex items-center mt-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    campaign.status === "DRAFT"
                      ? "bg-yellow-100 text-yellow-800"
                      : campaign.status === "PUBLISHED"
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {campaign.status}
                </span>
                <span className="ml-4 text-sm text-gray-500">
                  Created: {new Date(campaign.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* DRAFT Actions */}
            {isDraft && (
              <div className="flex space-x-3">
                <Link
                  href={`/campaigns/${campaign.id}/edit`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  ✏️ Edit Campaign
                </Link>
                <Link
                  href={`/campaigns/${campaign.id}/regenerate`}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  🔄 Regenerate Content
                </Link>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  🗑️ Delete Campaign
                </button>
              </div>
            )}

            {/* ARCHIVED Actions */}
            {isArchived && (
              <div className="flex space-x-3">
                <button
                  onClick={() => updateCampaignStatus("PUBLISHED")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  📤 Republish
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  🗑️ Delete Permanently
                </button>
              </div>
            )}

            {/* PUBLISHED Actions */}
            {campaign.status === "PUBLISHED" && (
              <div className="flex space-x-3">
                <button
                  onClick={() => updateCampaignStatus("ARCHIVED")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  📦 Archive Campaign
                </button>
              </div>
            )}
          </div>

          {/* Campaign Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Product/Service
              </h3>
              <p className="text-gray-600">{campaign.product}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Target Audience
              </h3>
              <p className="text-gray-600">{campaign.audience}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Tone</h3>
              <p className="text-gray-600 capitalize">{campaign.tone}</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Goals</h3>
              <p className="text-gray-600">{campaign.goals}</p>
            </div>
          </div>
        </div>

        {/* Platform Content */}
        <div className="space-y-6">
          {campaign.content.map((content) => (
            <div key={content.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <SocialIcon
                    platform={content.platform}
                    size="w-8 h-8"
                    showName={true}
                  />
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(content.content)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded text-sm"
                >
                  📋 Copy
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Title</h4>
                  <p className="text-gray-600">{content.title}</p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900">Content</h4>
                  <p className="text-gray-600 whitespace-pre-wrap">
                    {content.content}
                  </p>
                </div>

                {content.hashtags && (
                  <div>
                    <h4 className="font-medium text-gray-900">Hashtags</h4>
                    <p className="text-blue-600">{content.hashtags}</p>
                  </div>
                )}

                {content.callToAction && (
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Call to Action
                    </h4>
                    <p className="text-gray-600">{content.callToAction}</p>
                  </div>
                )}
              </div>

              {/* Edit Content Button for DRAFT */}
              {isDraft && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    ✏️ Edit This Content
                  </button>
                </div>
              )}
            </div>
          ))}
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
