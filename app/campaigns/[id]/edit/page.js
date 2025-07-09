"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SocialIconOnly } from "@/app/components/SocialIcon";

export default function EditCampaign({ params }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [campaign, setCampaign] = useState(null);
  
  // Unwrap params using React.use()
  const resolvedParams = use(params);
  const campaignId = resolvedParams.id;
  
  const [formData, setFormData] = useState({
    name: "",
    product: "",
    audience: "",
    tone: "professional",
    goals: "",
    platforms: [],
  });

  useEffect(() => {
    fetchCampaign();
  }, []);

  const fetchCampaign = async () => {
    try {
      const response = await fetch(`/api/campaigns/${campaignId}`);
      if (response.ok) {
        const data = await response.json();
        setCampaign(data);
        setFormData({
          name: data.name,
          product: data.product,
          audience: data.audience,
          tone: data.tone,
          goals: data.goals,
          platforms: data.content.map((c) => c.platform.toLowerCase()),
        });
      }
    } catch (error) {
      console.error("Failed to fetch campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch(`/api/campaigns/${campaignId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push(`/campaigns/${campaignId}`);
      } else {
        throw new Error("Failed to update campaign");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to update campaign");
    } finally {
      setSaving(false);
    }
  };

  const handlePlatformToggle = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
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
            Only draft campaigns can be edited.
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Edit Campaign
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campaign Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Product/Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product/Service Description *
              </label>
              <textarea
                value={formData.product}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, product: e.target.value }))
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience *
              </label>
              <textarea
                value={formData.audience}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, audience: e.target.value }))
                }
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Tone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Tone *
              </label>
              <select
                value={formData.tone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, tone: e.target.value }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="humorous">Humorous</option>
                <option value="inspirational">Inspirational</option>
                <option value="urgent">Urgent</option>
                <option value="friendly">Friendly</option>
              </select>
            </div>

            {/* Goals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Campaign Goals *
              </label>
              <input
                type="text"
                value={formData.goals}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, goals: e.target.value }))
                }
                placeholder="e.g., Increase brand awareness, Drive sales, Build community"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Platform Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Platforms *
              </label>
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
                      formData.platforms.includes(platform.id)
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.platforms.includes(platform.id)}
                      onChange={() => handlePlatformToggle(platform.id)}
                      className="hidden"
                    />
                    <div className="text-center">
                      <div className="mb-1 flex justify-center">
                        <SocialIconOnly platform={platform.id} size="w-16 h-16" />
                      </div>
                      <div className="text-sm font-medium">{platform.name}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                href={`/campaigns/${campaignId}`}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={saving || formData.platforms.length === 0}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
