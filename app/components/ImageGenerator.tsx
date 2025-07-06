"use client";

import { useState } from "react";
import Image from "next/image";

interface GeneratedImage {
  success: boolean;
  imageUrl?: string;
  error?: string;
  revisedPrompt?: string;
}

interface ImageGeneratorProps {
  campaignId?: string;
  onImagesGenerated?: (images: Record<string, GeneratedImage>) => void;
}

export default function ImageGenerator({
  campaignId,
  onImagesGenerated,
}: ImageGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [selectedChannels, setSelectedChannels] = useState([
    "social",
    "email",
    "web",
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<
    Record<string, GeneratedImage>
  >({});

  const availableChannels = [
    { id: "social", name: "Social Media", size: "1:1" },
    { id: "instagram", name: "Instagram", size: "1:1" },
    { id: "facebook", name: "Facebook", size: "16:9" },
    { id: "linkedin", name: "LinkedIn", size: "16:9" },
    { id: "email", name: "Email Header", size: "16:9" },
    { id: "web", name: "Website Banner", size: "16:9" },
  ];

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId]
    );
  };

  const generateImages = async () => {
    if (!prompt.trim()) {
      alert("Please enter a description for the image");
      return;
    }

    if (selectedChannels.length === 0) {
      alert("Please select at least one channel");
      return;
    }

    setIsGenerating(true);
    setGeneratedImages({});

    try {
      const response = await fetch("/api/generate-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          channels: selectedChannels,
          campaignId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate images");
      }

      if (data.success) {
        setGeneratedImages(data.images);
        onImagesGenerated?.(data.images);
      } else {
        console.error("Generation failed:", data.error);
        alert(`Failed to generate images: ${data.error || "Unknown error"}`);
      }
    } catch (error: unknown) {
      console.error("Error generating images:", error);
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to generate images. Please try again.";
      alert(`Error: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Generate Campaign Images
      </h3>

      {/* Prompt Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Image Description
        </label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate for your campaign..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Channel Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Channels
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {availableChannels.map((channel) => (
            <label key={channel.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedChannels.includes(channel.id)}
                onChange={() => handleChannelToggle(channel.id)}
                className="text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">
                {channel.name}{" "}
                <span className="text-gray-500">({channel.size})</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateImages}
        disabled={
          !prompt.trim() || selectedChannels.length === 0 || isGenerating
        }
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isGenerating ? "Generating Images..." : "Generate Images"}
      </button>

      {/* Generated Images */}
      {Object.keys(generatedImages).length > 0 && (
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">
            Generated Images
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(generatedImages).map(([channel, result]) => (
              <div key={channel} className="border rounded-lg p-3">
                <div className="text-sm font-medium text-gray-700 mb-2 capitalize">
                  {channel}
                </div>
                {result.success && result.imageUrl ? (
                  <div className="space-y-2">
                    <Image
                      src={result.imageUrl}
                      alt={`Generated image for ${channel}`}
                      width={300}
                      height={300}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button className="w-full text-xs bg-gray-100 hover:bg-gray-200 py-1 px-2 rounded">
                      Use This Image
                    </button>
                  </div>
                ) : (
                  <div className="text-sm text-red-600">
                    {result.error || "Generation failed"}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
