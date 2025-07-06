"use client";

import ImageGenerator from "../../../components/ImageGenerator";

interface GeneratedImage {
  success: boolean;
  imageUrl?: string;
  error?: string;
  revisedPrompt?: string;
}

export default function CreateCampaign() {
  const handleImagesGenerated = (images: Record<string, GeneratedImage>) => {
    console.log("Generated images:", images);
    // Handle the generated images (save to state, database, etc.)
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Create New Campaign
      </h1>

      {/* Other campaign creation fields */}

      {/* Image Generation Component */}
      <ImageGenerator onImagesGenerated={handleImagesGenerated} />
    </div>
  );
}
