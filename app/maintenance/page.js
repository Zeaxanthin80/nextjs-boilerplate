"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navigation from "../components/Navigation";
import LoadingSpinner from "../components/LoadingSpinner";

export default function MaintenancePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  // Redirect if not authenticated
  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return null;
  }

  const fixAllCampaignImages = async () => {
    setIsProcessing(true);
    setResults(null);
    setError(null);
    
    try {
      const response = await fetch("/api/maintenance/fix-images", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fixAll: true }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to fix campaign images");
      }
      
      setResults(data);
    } catch (err) {
      console.error("Error fixing campaign images:", err);
      setError(err.message || "An error occurred while fixing campaign images");
    } finally {
      setIsProcessing(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation session={session} />
      
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Maintenance Tools</h1>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Fix Expired Campaign Images</h2>
            <p className="text-gray-600 mb-4">
              This tool will scan all your campaigns for expired images and fix them by saving them permanently.
              Use this if you notice missing images in your older campaigns.
            </p>
            
            <button
              onClick={fixAllCampaignImages}
              disabled={isProcessing}
              className={`px-4 py-2 rounded-md text-white ${
                isProcessing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isProcessing ? "Processing..." : "Fix All Campaign Images"}
            </button>
          </div>
          
          {error && (
            <div className="p-4 bg-red-100 text-red-700 rounded-md mb-4">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}
          
          {results && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-md">
              <h3 className="font-medium text-green-800 mb-2">Results</h3>
              <p className="mb-2">{results.message}</p>
              
              {results.results && results.results.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-gray-700 mb-2">Campaign Details:</h4>
                  <div className="max-h-96 overflow-y-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Campaign
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fixed
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Skipped
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Failed
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results.results.map((result, index) => (
                          <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {result.campaignName || result.campaignId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className="text-green-600 font-medium">{result.fixed}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {result.skipped}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <span className={result.failed > 0 ? "text-red-600 font-medium" : "text-gray-500"}>
                                {result.failed}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
