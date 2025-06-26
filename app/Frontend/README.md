# Digital Marketing App

A modern Next.js application for entrepreneurs and small businesses to create and manage digital marketing campaigns.

## 🚀 Features

- **Beautiful Landing Page** with blue and orange theme
- **Campaign Selection** - Choose from 6 different marketing campaign types:
  - Email Marketing
  - Social Media Marketing  
  - Search Engine Marketing (SEM)
  - Content Marketing
  - Influencer Marketing
  - Video Marketing
- **User Authentication** - Login and signup with validation
- **Campaign Setup** - Multi-step wizard for campaign creation
- **Dashboard** - Performance overview and campaign management
- **Responsive Design** - Works on all devices

## 🎨 Design

- **Primary Colors**: Blue (#2563eb) and Orange (#f97316)
- **Modern UI** with gradients, cards, and smooth animations
- **Mobile-first** responsive design
- **Accessibility** focused with proper contrast and keyboard navigation

## 🛠️ Tech Stack

- **Next.js 14** - React framework with SSR
- **React 18** - Component-based UI
- **CSS Modules** - Scoped styling
- **Modern JavaScript** - ES6+ features

## 📁 Project Structure

```
Frontend/
├── pages/
│   ├── index.js                  # Landing page
│   ├── campaigns.js              # Campaign selection
│   ├── dashboard.js              # User dashboard
│   ├── auth/
│   │   ├── login.js              # Login page
│   │   └── signup.js             # Signup page
│   └── campaign-setup/
│       └── [campaignType].js     # Campaign setup wizard
├── styles/
│   ├── globals.css               # Global styles
│   └── components.module.css     # Component styles
├── public/                       # Static assets
├── package.json
└── next.config.js
```

## 🚀 Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Pages Overview

### Landing Page (`/`)
- Hero section with call-to-actions
- Features showcase
- Trust indicators
- Professional gradient design

### Campaign Selection (`/campaigns`)
- 6 campaign types with detailed cards
- Pricing information
- Feature comparisons
- Interactive hover effects

### Authentication (`/auth/login`, `/auth/signup`)
- Form validation
- Social login options
- Professional styling
- Error handling

### Campaign Setup (`/campaign-setup/[type]`)
- 3-step wizard process
- Progress indicator
- Form validation
- Campaign configuration

### Dashboard (`/dashboard`)
- Performance metrics
- Recent campaigns overview
- Quick actions
- Tips and recommendations

## 🎯 Campaign Types

1. **📧 Email Marketing** - Build relationships & drive sales
2. **📱 Social Media Marketing** - Engage & grow your audience  
3. **🔍 Search Engine Marketing** - Get found on Google & Bing
4. **📝 Content Marketing** - Create valuable content that converts
5. **🤳 Influencer Marketing** - Partner with creators
6. **🎥 Video Marketing** - Engage with video content

## 💡 Features for Each Campaign

- Detailed feature lists
- Pricing tiers
- Setup wizards
- Performance tracking
- Analytics integration
- Expert recommendations

## 🎨 Styling Guidelines

- **Blue (#2563eb)** - Primary actions, trust, professionalism
- **Orange (#f97316)** - CTAs, highlights, energy
- **White** - Cards, content areas
- **Gradients** - Backgrounds, buttons, highlights
- **Rounded corners** - Modern, friendly appearance
- **Shadows** - Depth and elevation

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px  
- Desktop: > 1024px

## 🔧 Next Steps

1. Add backend API integration
2. Implement real authentication
3. Connect payment processing
4. Add campaign analytics
5. Integrate marketing platforms
6. Add more campaign types

## 👨‍💻 Development

Built with modern web development practices:
- Component-based architecture
- Responsive design principles
- Performance optimization
- SEO best practices
- Accessibility standards

Perfect for entrepreneurs and small businesses looking to grow their digital presence! 🚀
