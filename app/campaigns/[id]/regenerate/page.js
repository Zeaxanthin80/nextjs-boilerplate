"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SocialIconOnly } from "@/app/components/SocialIcon";

export default function RegenerateCampaign({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const campaignId = resolvedParams.id;

  useEffect(() => {
    fetchCampaign();
  }, []);

  const fetchCampaign = async () => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`);
      if (response.ok) {
        const data = await response.json();
        setCampaign(data);
        setSelectedPlatforms(data.content.map((c) => c.platform.toLowerCase()));
      }
    } catch (error) {
      console.error("Failed to fetch campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleRegenerate = async () => {
    if (selectedPlatforms.length === 0) {
      alert("Please select at least one platform");
      return;
    }

    setGenerating(true);

    try {
      const response = await fetch(`/api/campaigns/${campaignId}/regenerate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          platforms: selectedPlatforms,
        }),
      });

      if (response.ok) {
        router.push(`/campaigns/${campaignId}`);
      } else {
        throw new Error("Failed to regenerate content");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to regenerate content");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading campaign...</p>
        </div>
      </div>
    );
  }

  if (!campaign || campaign.status !== "DRAFT") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Campaign Not Found
          </h1>
          <p className="text-gray-600 mt-2">
            Only draft campaigns can be regenerated.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
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
                Welcome, {session?.user?.name}!
              </span>
              <Link
                href={`/campaigns/${campaignId}`}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Regenerate Campaign Content
          </h1>
          <p className="text-gray-600 mb-6">
            Select platforms to regenerate content for "{campaign.name}"
          </p>

          {/* Campaign Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Campaign Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Product:</strong> {campaign.product}
              </div>
              <div>
                <strong>Audience:</strong> {campaign.audience}
              </div>
              <div>
                <strong>Tone:</strong> {campaign.tone}
              </div>
              <div>
                <strong>Goals:</strong> {campaign.goals}
              </div>
            </div>
          </div>

          {/* Platform Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Platforms to Regenerate *
            </label>{" "}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { id: "tiktok", name: "TikTok" },
                { id: "instagram", name: "Instagram" },
                { id: "facebook", name: "Facebook" },
                { id: "youtube", name: "YouTube" },
              ].map((platform) => (
                <label
                  key={platform.id}
                  className={`flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    selectedPlatforms.includes(platform.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedPlatforms.includes(platform.id)}
                    onChange={() => handlePlatformToggle(platform.id)}
                    className="hidden"
                  />
                  <div className="text-center">
                    <div className="mb-1 flex justify-center">
                      <SocialIconOnly platform={platform.id} size="w-16 h-16" />
                    </div>
                    <div className="text-sm font-medium">{platform.name}</div>
                    {campaign.content.some(
                      (c) => c.platform.toLowerCase() === platform.id
                    ) && (
                      <div className="text-xs text-green-600 mt-1">
                        Has content
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="text-yellow-400 mr-3">⚠️</div>
              <div>
                <h4 className="text-yellow-800 font-medium">Warning</h4>
                <p className="text-yellow-700 text-sm">
                  Regenerating content will replace the existing content for
                  selected platforms. This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Link
              href={`/campaigns/${campaignId}`}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              onClick={handleRegenerate}
              disabled={generating || selectedPlatforms.length === 0}
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {generating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Regenerating...
                </>
              ) : (
                <>🔄 Regenerate Content</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
