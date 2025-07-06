"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import LoadingSpinner from "../../components/LoadingSpinner";
import Toast from "../../components/Toast";
import SocialIcon from "../../components/SocialIcon";
import ImagePreview from "../../components/ImagePreview";

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
  }, [session, id, status, router]);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/campaigns/${id}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to fetch campaign");
      }

      const data = await response.json();
      
      if (!data) {
        throw new Error("No campaign data received");
      }

      setCampaign(data);

      // Set first content as selected by default if available
      if (data.content && data.content.length > 0) {
        setSelectedContent(data.content[0]);
      }
    } catch (error) {
      console.error("Error fetching campaign:", error);
      setToast({
        type: "error",
        message: error.message || "Failed to load campaign. Please try again.",
      });
      // Redirect to dashboard if campaign not found or unauthorized
      if (error.message.includes("not found") || error.message.includes("Unauthorized")) {
        setTimeout(() => router.push('/dashboard'), 2000);
      }
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

  // Helper function to get image dimensions text
  function getImageDimensions(platform) {
    const dimensions = {
      TIKTOK: "1024×1792",
      INSTAGRAM: "1024×1024",
      FACEBOOK: "1792×1024",
      YOUTUBE: "1792×1024",
      LINKEDIN: "1792×1024",
    };
    return dimensions[platform?.toUpperCase()] || "1024×1024";
  }

  // Function to download image
  async function downloadImage(imageUrl, filename) {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${filename}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback - open in new tab
      window.open(imageUrl, "_blank");
    }
  }

  // Function to copy image URL to clipboard
  async function copyImageUrl(imageUrl) {
    try {
      await navigator.clipboard.writeText(imageUrl);
      // You could add a toast notification here
      alert("Image URL copied to clipboard!");
    } catch (error) {
      console.error("Copy failed:", error);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = imageUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      alert("Image URL copied to clipboard!");
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Loading campaign details...</p>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-md w-full" role="alert">
          <p className="font-bold">Campaign Not Found</p>
          <p>Redirecting to dashboard...</p>
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

        {/* Campaign Content */}
        <div className="space-y-8">
          {campaign.content.map((content, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              {/* Platform Header */}
              <div className="flex items-center justify-between mb-4 border-b border-gray-20">
                <div className="flex items-center space-x-3">
                  <SocialIcon
                    platform={content.platform}
                    size="w-16 h-16"
                    showName={false}
                  />
                  {/*<h3 className="text-lg font-semibold text-gray-900">
                    {content.platform}
                  </h3>*/}
                </div>
              </div>

              {/* Image Preview with Download */}
              {content.imageUrl && (
                <ImagePreview
                  imageUrl={content.imageUrl}
                  alt={`Generated image for ${content.platform}`}
                  platform={content.platform}
                  campaignName={campaign.name}
                />
              )}

              {/* Content sections */}
              {content.title && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                    Title
                  </h4>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-md">
                    {content.title}
                  </p>
                </div>
              )}

              <div>
                <h4 className="font-medium text-gray-900">Content</h4>
                <p className="text-gray-600 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">
                  {content.content}
                </p>
              </div>

              {content.hashtags && (
                <div>
                  <h4 className="font-medium text-gray-900">Hashtags</h4>
                  <div className="flex flex-wrap gap-2 bg-gray-50 p-3 rounded-md">
                    {content.hashtags.split(/\s+/).filter(tag => tag).map((tag, i) => (
                      <span key={i} className="text-blue-600">
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {content.callToAction && (
                <div>
                  <h4 className="font-medium text-gray-900">
                    Call to Action
                  </h4>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-md">{content.callToAction}</p>
                </div>
              )}

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
