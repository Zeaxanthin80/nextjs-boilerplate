# Marketing SaaS Platform

A comprehensive marketing SaaS application built by Jose, Norma, and Lily for their capstone project.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repo-url>
cd nextjs-boilerplate

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Generate Prisma client
npm run db:generate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📚 Documentation

**Complete project documentation is available in the [`docs/`](./docs/) directory:**

- **[📋 Documentation Overview](./docs/README.md)** - Start here for complete project information
- **[🔧 Vercel Workflow Guide](./docs/VERCEL_WORKFLOW_GUIDE.md)** - Team workflow and deployment setup
- **[🗄️ Database Setup Guide](./docs/DATABASE_SETUP_GUIDE.md)** - Prisma Postgres configuration
- **[👑 Project Lead Guide](./docs/PROJECT_LEAD_GUIDE.md)** - Administrative tasks (Jose)
- **[🔐 Environment Variables Guide](./docs/ENVIRONMENT_VARIABLES_GUIDE.md)** - Configuration reference

## 🛠️ Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes, Prisma ORM
- **Database:** Prisma Postgres (cloud-hosted)
- **Deployment:** Vercel
- **Authentication:** NextAuth.js (planned)
- **Payments:** Stripe (planned)

## 👥 Team

- **Jose** - Backend/Infrastructure, Database, DevOps
- **Norma** - Frontend/UI, React Components, Styling  
- **Lily** - Features/Integration, Testing, Business Logic

## 🗃️ Database Schema

Marketing SaaS data models:
- **Users** - Authentication and role management
- **Accounts** - Customer organizations with subscription plans
- **Campaigns** - Marketing campaigns with budgets and tracking
- **Analytics** - Performance metrics (impressions, clicks, conversions)

## 📱 Features (Planned)

- [ ] User authentication and authorization
- [ ] Multi-tenant account management
- [ ] Campaign creation and management
- [ ] Real-time analytics dashboard
- [ ] Subscription billing with Stripe
- [ ] Email marketing integration
- [ ] Performance reporting

## 🔧 Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema changes
npm run db:studio       # Open Prisma Studio
npm run db:migrate      # Create and apply migrations

# Testing
node test-database.js   # Test database connection
```

## 🌐 Deployment

This application is deployed on Vercel with automatic deployments from the main branch.

- **Production:** [Your production URL]
- **Preview:** Automatic preview deployments for pull requests
- **Database:** Prisma Postgres hosted on Vercel

## 📋 Project Status

- ✅ **Setup Complete:** Database, documentation, team workflow
- ✅ **Database:** Prisma Postgres connected and schema deployed
- 🚧 **In Progress:** Authentication system
- 📅 **Next:** API routes and dashboard UI

## 🆘 Need Help?

1. Check the [documentation](./docs/) for detailed guides
2. Review existing GitHub issues
3. Contact team members via Discord/Slack
4. Create a new GitHub issue for bugs or feature requests

---

**Timeline:** 7-week capstone project  
**Started:** June 2025  
**Status:** ✅ Infrastructure Complete - Development Phase
