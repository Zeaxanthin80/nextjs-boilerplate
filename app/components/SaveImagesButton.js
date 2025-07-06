"use client";

import { useState } from "react";

export default function SaveImagesButton({ campaignId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSaveImages = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setResult(null);
    setError(null);
    
    try {
      const response = await fetch("/api/campaigns/save-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ campaignId }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to save images");
      }
      
      setResult(data);
      
      // Reload the page after successful save to show the updated images
      if (data.success) {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      console.error("Error saving images:", err);
      setError(err.message || "An error occurred while saving images");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 mb-4">
      <button
        onClick={handleSaveImages}
        disabled={isLoading}
        className={`px-4 py-2 rounded-md text-white ${
          isLoading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Saving Images..." : "Save Images Permanently"}
      </button>
      
      {error && (
        <div className="mt-2 p-2 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {result && (
        <div className="mt-2 p-2 bg-green-100 text-green-700 rounded-md">
          {result.success ? (
            <div>
              <p className="font-medium">Images saved successfully!</p>
              <p className="text-sm">
                {result.results.filter(r => r.status === "success").length} images saved.
                {result.results.filter(r => r.status === "skipped").length > 0 && 
                  ` ${result.results.filter(r => r.status === "skipped").length} images skipped.`}
                {result.results.filter(r => r.status === "error").length > 0 && 
                  ` ${result.results.filter(r => r.status === "error").length} errors.`}
              </p>
              <p className="text-sm mt-1">Reloading page to show updated images...</p>
            </div>
          ) : (
            <p>No images were saved. They may already be permanent or have expired URLs.</p>
          )}
        </div>
      )}
    </div>
  );
}
