"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoadingSpinner from "../../components/LoadingSpinner";
import Toast from "../../components/Toast";
import SimpleSocialIcon from "../../components/SimpleSocialIcon";
import Navigation from "../../components/Navigation";

const TONES = [
  { value: "PROFESSIONAL", label: "Professional" },
  { value: "CASUAL", label: "Casual" },
  { value: "HUMOROUS", label: "Humorous" },
  { value: "INSPIRATIONAL", label: "Inspirational" },
  { value: "EDUCATIONAL", label: "Educational" },
  { value: "URGENT", label: "Urgent" },
];

const PLATFORMS = [
  { value: "TIKTOK", label: "TikTok" },
  { value: "INSTAGRAM", label: "Instagram" },
  { value: "FACEBOOK", label: "Facebook" },
  { value: "YOUTUBE", label: "YouTube" },
];

export default function CreateCampaign() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    product: "",
    audience: "",
    tone: "PROFESSIONAL",
    goals: "",
    platforms: [],
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [toast, setToast] = useState(null);

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (!session) {
    router.push("/auth/signin");
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlatformToggle = (platform) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.platforms.length === 0) {
      setToast({
        type: "error",
        message: "Please select at least one platform",
      });
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/campaigns/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          goals: formData.goals
            .split(",")
            .map((g) => g.trim())
            .filter((g) => g),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate campaign");
      }

      const { campaignId } = await response.json();

      setToast({
        type: "success",
        message: "Campaign generated successfully!",
      });

      // Redirect to campaign view after a short delay
      setTimeout(() => {
        router.push(`/campaigns/${campaignId}`);
      }, 1500);
    } catch (error) {
      console.error("Error generating campaign:", error);
      setToast({
        type: "error",
        message: "Failed to generate campaign. Please try again.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation session={session} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Create AI Campaign
              </h1>
              <p className="mt-2 text-gray-600">
                Generate platform-specific content for your marketing campaign
                using AI
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Campaign Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Campaign Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Summer Product Launch"
                />
              </div>

              {/* Product Description */}
              <div>
                <label
                  htmlFor="product"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Product/Service Description
                </label>
                <textarea
                  id="product"
                  name="product"
                  required
                  rows={3}
                  value={formData.product}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your product or service in detail..."
                />
              </div>

              {/* Target Audience */}
              <div>
                <label
                  htmlFor="audience"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Target Audience
                </label>
                <textarea
                  id="audience"
                  name="audience"
                  required
                  rows={2}
                  value={formData.audience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Young professionals aged 25-35 interested in fitness..."
                />
              </div>

              {/* Campaign Tone */}
              <div>
                <label
                  htmlFor="tone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Campaign Tone
                </label>
                <select
                  id="tone"
                  name="tone"
                  value={formData.tone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {TONES.map((tone) => (
                    <option key={tone.value} value={tone.value}>
                      {tone.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Campaign Goals */}
              <div>
                <label
                  htmlFor="goals"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Campaign Goals
                </label>
                <input
                  type="text"
                  id="goals"
                  name="goals"
                  required
                  value={formData.goals}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Increase brand awareness, Drive sales, Build community (comma separated)"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Separate multiple goals with commas
                </p>
              </div>

              {/* Platform Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Select Platforms
                </label>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {PLATFORMS.map((platform) => (
                    <button
                      key={platform.value}
                      type="button"
                      onClick={() => handlePlatformToggle(platform.value)}
                      className={`relative rounded-lg border-2 p-4 text-center transition-colors ${
                        formData.platforms.includes(platform.value)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                    >
                      <div className="mb-2 flex justify-center">
                        <SimpleSocialIcon
                          platform={platform.value}
                          size="w-8 h-8"
                        />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {platform.label}
                      </div>
                      {formData.platforms.includes(platform.value) && (
                        <div className="absolute top-2 right-2 text-blue-500">
                          ✓
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Link
                  href="/dashboard"
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={isGenerating}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating Campaign...
                    </>
                  ) : (
                    "Generate Campaign"
                  )}
                </button>
              </div>
            </form>
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
