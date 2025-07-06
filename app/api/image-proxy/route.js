import { NextResponse } from 'next/server';

// Cache for storing processed image URLs
const imageCache = new Map();

// Cache TTL in milliseconds (10 minutes)
const CACHE_TTL = 10 * 60 * 1000;

// Clean up old cache entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, { timestamp }] of imageCache.entries()) {
    if (now - timestamp > CACHE_TTL) {
      imageCache.delete(key);
    }
  }
}, CACHE_TTL);

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
      return new NextResponse('Image URL is required', { status: 400 });
    }

    // Check if the URL is valid
    try {
      new URL(imageUrl);
    } catch (error) {
      return new NextResponse('Invalid image URL', { 
        status: 400,
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

    // Check if this is a DALL-E URL (Azure blob storage)
    const isDalleUrl = imageUrl.includes('oaidalleapiprodscus.blob.core.windows.net');
    
    // Add any necessary authentication headers for the image source
    if (isDalleUrl) {
      // DALL-E URLs are pre-signed and don't need additional auth
      console.log('Proxying DALL-E image');
    } else if (process.env.IMAGE_PROXY_AUTH_HEADER) {
      headers['Authorization'] = process.env.IMAGE_PROXY_AUTH_HEADER;
    }

    // Make the request to fetch the image
    const response = await fetch(imageUrl, { 
      headers,
      // Add a timeout to prevent hanging
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });

    if (!response.ok) {
      // Handle specific error statuses
      if (response.status === 403) {
        return new NextResponse('Access to the requested image is forbidden', { 
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      if (response.status === 404) {
        return new NextResponse('The requested image was not found', { 
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
