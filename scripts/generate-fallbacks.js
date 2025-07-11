const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create directory if it doesn't exist
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Platform configurations
const platforms = [
  { name: 'instagram', color: '#E1306C', size: [1024, 1024], text: 'Instagram Content' },
  { name: 'facebook', color: '#4267B2', size: [1792, 1024], text: 'Facebook Content' },
  { name: 'linkedin', color: '#0077B5', size: [1792, 1024], text: 'LinkedIn Content' },
  { name: 'tiktok', color: '#000000', size: [1024, 1792], text: 'TikTok Content' },
  { name: 'youtube', color: '#FF0000', size: [1792, 1024], text: 'YouTube Content' },
  { name: 'default', color: '#6B7280', size: [1024, 1024], text: 'Campaign Content' }
];

// Generate a fallback image for each platform
platforms.forEach(platform => {
  const [width, height] = platform.size;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = platform.color;
  ctx.fillRect(0, 0, width, height);

  // Add gradient overlay
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0.1)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add platform name
  ctx.fillStyle = 'white';
  ctx.font = `bold ${Math.floor(width / 15)}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(platform.text, width / 2, height / 2);

  // Add note about fallback
  ctx.font = `${Math.floor(width / 30)}px Arial`;
  ctx.fillText('Fallback Image - Original Expired', width / 2, height / 2 + Math.floor(width / 12));

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(uploadsDir, `fallback-${platform.name}.png`), buffer);
  
  console.log(`Generated fallback image for ${platform.name}`);
});

console.log('All fallback images generated successfully');
