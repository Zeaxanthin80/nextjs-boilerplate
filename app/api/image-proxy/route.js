import { NextResponse } from 'next/server';

// Cache for storing temporary DALL-E URLs that we've already processed
const imageCache = new Map();

// Helper function to parse DALL-E URL parameters
function parseDalleUrl(url) {
  try {
    const parsedUrl = new URL(url);
    if (!parsedUrl.hostname.includes('oaidalleapiprodscus.blob.core.windows.net')) {
      return null; // Not a DALL-E URL
    }

    const params = new URLSearchParams(parsedUrl.search);
    const stParam = params.get('st');
    const expiryTime = stParam ? new Date(stParam).getTime() + (2 * 60 * 60 * 1000) : null; // 2 hours from creation
    
    return {
      isExpired: expiryTime ? (Date.now() > expiryTime) : true,
      expiryTime,
      url: url.toString()
    };
  } catch (error) {
    console.error('Error parsing DALL-E URL:', error);
    return null;
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    // Check if this is a DALL-E URL
    const dalleInfo = parseDalleUrl(imageUrl);
    
    // If it's a DALL-E URL and it's expired, return an error
    if (dalleInfo && dalleInfo.isExpired) {
      return new NextResponse('Image has expired', { 
        status: 410, // Gone
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if we have this image in our cache
    const cacheKey = imageUrl.split('?')[0]; // Use base URL as cache key
    const cachedImage = imageCache.get(cacheKey);
    
    if (cachedImage && (Date.now() - cachedImage.timestamp < 1000 * 60 * 10)) { // 10 minute cache
      return new NextResponse(cachedImage.buffer, {
        status: 200,
        headers: {
          'Content-Type': cachedImage.contentType,
          'X-Cache': 'HIT',
          'Cache-Control': 'public, max-age=600' // 10 minutes
        },
      });
    }

    // Set up headers for the request
    const headers = {
      'User-Agent': 'MarketingHub/1.0',
      'Accept': 'image/*',
      'Referer': request.headers.get('referer') || 'https://app.marketinghub.com',
    };

    // Add any necessary authentication headers for DALL-E
    if (dalleInfo) {
      // Add any required DALL-E specific headers here
      // Note: DALL-E URLs are signed, so we don't need additional auth
    }

    // Make the request to fetch the image
    const response = await fetch(imageUrl, { 
      headers,
      // Add a timeout to prevent hanging
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      // If we get a 403, the image might have expired
      if (response.status === 403 || response.status === 404) {
        return new NextResponse('Image not found or access denied', { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }

    // Get the image data
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';

    // Cache the image
    if (imageBuffer.byteLength < 5 * 1024 * 1024) { // Only cache images < 5MB
      imageCache.set(cacheKey, {
        buffer: Buffer.from(imageBuffer),
        contentType,
        timestamp: Date.now()
      });
    }

    return new NextResponse(Buffer.from(imageBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'X-Cache': 'MISS',
        'Cache-Control': 'public, max-age=600' // 10 minutes
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    
    // Handle different types of errors
    if (error.name === 'TimeoutError' || error.name === 'AbortError') {
      return new NextResponse('Request timed out', { status: 504 });
    }
    
    if (error.message.includes('Failed to fetch')) {
      return new NextResponse('Failed to fetch image from source', { status: 502 });
    }
    
    return new NextResponse('Failed to process image', { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
