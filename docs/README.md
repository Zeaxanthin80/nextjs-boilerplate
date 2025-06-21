# Marketing SaaS Documentation

Welcome to the comprehensive documentation for the Marketing SaaS capstone project by Jose, Norma, and Lily.

## 🧭 Navigation

**🚀 New to the project?** Start with [Getting Started](#-getting-started-read-in-order)  
**🔍 Looking for a specific guide?** See [Documentation Index](#-quick-reference---guide-summaries)  
**❓ Need help?** Check [Troubleshooting](#-getting-help)  
**📋 Ready to code?** See [Setup Checklist](#-setup-checklist-by-role)

---

## 📚 Documentation Overview

This documentation covers all aspects of setting up, developing, and managing the Marketing SaaS application built with Next.js, Prisma, and Vercel.

**🎯 Project Info:** 7-week capstone project | **👥 Team:** Jose (Backend/Infrastructure), Norma (Frontend/UI), Lily (Features/Integration) | **💻 Tech Stack:** Next.js 15, Prisma, PostgreSQL, Vercel, TypeScript

## 🚀 Getting Started (Read in Order)

### 📋 **Step 1: Choose Your Setup Strategy**

Before following any guides, **choose which database approach your team wants:**

- **☁️ Cloud Database (RECOMMENDED):** Shared Prisma Postgres on Vercel - easier collaboration
- **🏠 Local Database:** Individual PostgreSQL setups - more complex but educational

---

### 🔄 **Option A: Cloud Database Setup Flow (RECOMMENDED)**

Follow these guides **in exact order** for cloud database setup:

| Order | Guide | Purpose | Who Does This | Formats |
|-------|-------|---------|---------------|---------|
| **1st** | **Vercel Workflow Guide** | Team collaboration and deployment setup | All team members read<br>Jose implements | [📄 MD](./VERCEL_WORKFLOW_GUIDE.md) \| [🌐 HTML](./VERCEL_WORKFLOW_GUIDE.html) |
| **2nd** | **Project Lead Guide** | Administrative setup and team management | Jose (Project Lead) | [📄 MD](./PROJECT_LEAD_GUIDE.md) \| [🌐 HTML](./PROJECT_LEAD_GUIDE.html) |
| **3rd** | **Database Setup Guide** | Cloud Prisma Postgres setup and schema | Jose (Project Lead) | [📄 MD](./DATABASE_SETUP_GUIDE.md) \| [🌐 HTML](./DATABASE_SETUP_GUIDE.html) |
| **4th** | **Environment Variables Guide** | Team environment configuration | All team members | [📄 MD](./ENVIRONMENT_VARIABLES_GUIDE.md) \| [🌐 HTML](./ENVIRONMENT_VARIABLES_GUIDE.html) |

**Skip DATABASE_USER_SETUP** - not needed for cloud approach.

---

### 🔄 **Option B: Local Database Setup Flow (ALTERNATIVE)**

Follow these guides **in exact order** for local database setup:

| Order | Guide | Purpose | Who Does This | Formats |
|-------|-------|---------|---------------|---------|
| **1st** | **Vercel Workflow Guide** | Team collaboration and deployment setup | All team members read<br>Jose implements | [📄 MD](./VERCEL_WORKFLOW_GUIDE.md) \| [🌐 HTML](./VERCEL_WORKFLOW_GUIDE.html) |
| **2nd** | **Project Lead Guide** | Administrative setup and team management | Jose (Project Lead) | [📄 MD](./PROJECT_LEAD_GUIDE.md) \| [🌐 HTML](./PROJECT_LEAD_GUIDE.html) |
| **3rd** | **Database User Setup** | Local PostgreSQL with individual credentials | Jose (Project Lead) | [📄 MD](./DATABASE_USER_SETUP.md) \| [🌐 HTML](./DATABASE_USER_SETUP.html) |
| **4th** | **Environment Variables Guide** | Team environment configuration | All team members | [📄 MD](./ENVIRONMENT_VARIABLES_GUIDE.md) \| [🌐 HTML](./ENVIRONMENT_VARIABLES_GUIDE.html) |

**Skip DATABASE_SETUP_GUIDE** - not needed for local approach.

## 🔍 Database Guides Clarification

### DATABASE_SETUP_GUIDE vs DATABASE_USER_SETUP - What's the Difference?

**⚠️ Important:** These guides represent **TWO DIFFERENT DATABASE STRATEGIES** - choose one approach for your team.

| Aspect | DATABASE_SETUP_GUIDE | DATABASE_USER_SETUP |
|--------|---------------------|-------------------|
| **Database Type** | ☁️ **Cloud Database** (Prisma Postgres on Vercel) | 🏠 **Local Database** (PostgreSQL on each machine) |
| **Purpose** | Complete cloud database setup and Prisma configuration | Local PostgreSQL with individual user accounts |
| **Team Access** | Shared cloud database - all team members connect to same DB | Individual local databases with secure user credentials |
| **When to Use** | **RECOMMENDED** - For teams wanting shared data | Alternative - For teams preferring isolated local development |
| **Who Runs It** | Jose (Project Lead) - One time setup | Jose sets up local DB + creates user accounts for team |
| **What It Creates** | • Cloud Prisma Postgres database<br>• Database schema<br>• Shared environment variables<br>• Team access via Vercel | • Local PostgreSQL installation<br>• Individual database users<br>• Local environment templates<br>• Secure credential distribution |
| **Pros** | ✅ Shared data across team<br>✅ No local PostgreSQL needed<br>✅ Vercel integration<br>✅ Easier team collaboration | ✅ Individual accountability<br>✅ Offline development<br>✅ Full local control<br>✅ Learning PostgreSQL admin |
| **Cons** | ❌ Requires internet connection<br>❌ Shared database state | ❌ Complex setup<br>❌ Local PostgreSQL required<br>❌ Data sync challenges |

### 📋 **Choose Your Database Strategy:**

#### 🎯 **Option A: Cloud Database (RECOMMENDED)**
1. Follow **DATABASE_SETUP_GUIDE** → Creates shared cloud database
2. Skip DATABASE_USER_SETUP → Not needed for cloud approach
3. All team members connect to the same cloud database via Vercel

#### 🎯 **Option B: Local Database with Individual Users**
1. Skip DATABASE_SETUP_GUIDE → Not needed for local approach  
2. Follow **DATABASE_USER_SETUP** → Sets up local PostgreSQL with team users
3. Each team member has local database with individual credentials

## 🎯 Project Information

- **Team:** Jose (Backend/Infrastructure), Norma (Frontend/UI), Lily (Features/Integration)
- **Timeline:** 7-week accelerated capstone project
- **Tech Stack:** Next.js 15, Prisma, PostgreSQL, Vercel, TypeScript
- **Database:** Prisma Postgres (cloud-hosted)

## 📋 Setup Checklist by Role

### ✅ **For Jose (Project Lead):**
**Follow the Project Lead Guide completely, then:**

#### Cloud Database Approach:
1. Complete **Vercel Workflow Guide** setup ➜ [Guide](./VERCEL_WORKFLOW_GUIDE.md)
2. Complete **Project Lead Guide** administrative tasks ➜ [Guide](./PROJECT_LEAD_GUIDE.md)  
3. Set up cloud database using **Database Setup Guide** ➜ [Guide](./DATABASE_SETUP_GUIDE.md)
4. Configure team environment variables ➜ [Environment Guide](./ENVIRONMENT_VARIABLES_GUIDE.md)
5. Share development credentials with Norma and Lily securely

#### Local Database Approach:
1. Complete **Vercel Workflow Guide** setup ➜ [Guide](./VERCEL_WORKFLOW_GUIDE.md)
2. Complete **Project Lead Guide** administrative tasks ➜ [Guide](./PROJECT_LEAD_GUIDE.md)
3. Set up local PostgreSQL using **Database User Setup** ➜ [Guide](./DATABASE_USER_SETUP.md)
4. Configure team environment variables ➜ [Environment Guide](./ENVIRONMENT_VARIABLES_GUIDE.md)
5. Create individual database users and share credentials with team

### ✅ **For Norma & Lily (Team Members):**
**After Jose completes his setup:**

1. **Read first:** **Vercel Workflow Guide** (understand the workflow) ➜ [Guide](./VERCEL_WORKFLOW_GUIDE.md)
2. Clone repository: `git clone <repo-url>`
3. Install dependencies: `npm install`
4. **Set up environment:** Follow **Environment Variables Guide** ➜ [Guide](./ENVIRONMENT_VARIABLES_GUIDE.md)
   - Copy `.env.example` to `.env.local`
   - Get credentials from Jose (sent via secure email)
   - Fill in your personal `.env.local` file
5. Generate Prisma client: `npm run db:generate`
6. Test setup: `npm run dev`
7. **Verify database connection:** `node test-database.js`

### 🔄 **Team Sync Process:**
1. **Daily:** Pull latest changes: `git pull origin main`
2. **Before coding:** Ensure Prisma client is updated: `npm run db:generate`
3. **New schema changes:** Jose runs migrations, team pulls and regenerates client
4. **Environment updates:** Jose updates variables, team pulls with `vercel env pull .env.local` (if using cloud)

### ✅ Project Status:
- [x] **Database:** Prisma Postgres connected and schema deployed
- [x] **Documentation:** Complete setup guides created
- [x] **Team Structure:** Roles and responsibilities defined
- [x] **Workflow:** Git and Vercel integration configured
- [ ] **Authentication:** NextAuth.js setup (next phase)
- [ ] **API Routes:** Core endpoints (next phase)
- [ ] **UI Components:** Dashboard and forms (next phase)

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema changes
npm run db:studio       # Open visual database browser
npm run db:migrate      # Create and apply migrations

# Testing
node test-database.js   # Test database connection
```

## 📖 Quick Reference - Guide Summaries

### [📊 Vercel Workflow Guide](./VERCEL_WORKFLOW_GUIDE.md) | [🌐 HTML](./VERCEL_WORKFLOW_GUIDE.html)
- **Purpose:** Complete team Git + Vercel workflow setup
- **Covers:** GitHub integration, deployment pipelines, PR workflow, team collaboration
- **For:** All team members (essential reading) | **Priority:** 🔥 Critical
- **Cross-references:** Links to Project Lead Guide, Environment Variables Guide

### [👑 Project Lead Guide](./PROJECT_LEAD_GUIDE.md) | [🌐 HTML](./PROJECT_LEAD_GUIDE.html)
- **Purpose:** Administrative and leadership responsibilities for Jose
- **Covers:** Team onboarding, project management, advanced Vercel configuration, security
- **For:** Jose (project administrator) | **Priority:** 🔥 Critical for Jose
- **Cross-references:** References all other guides for team onboarding tasks

### [☁️ Database Setup Guide](./DATABASE_SETUP_GUIDE.md) | [🌐 HTML](./DATABASE_SETUP_GUIDE.html)
- **Purpose:** Cloud database infrastructure setup (Prisma Postgres on Vercel)
- **Covers:** Vercel database creation, Prisma configuration, schema deployment, team sync
- **For:** Jose (Project Lead) + reference for all team members | **Priority:** 🔥 Critical if using cloud DB
- **Note:** ⚠️ Use this OR Database User Setup, not both
- **Cross-references:** Links to Environment Variables Guide for connection strings

### [🏠 Database User Setup](./DATABASE_USER_SETUP.md) | [🌐 HTML](./DATABASE_USER_SETUP.html)
- **Purpose:** Local PostgreSQL with individual user accounts and credentials
- **Covers:** Local PostgreSQL setup, user creation, credential distribution, security
- **For:** Jose (setup) + all team members (credential usage) | **Priority:** 🔥 Critical if using local DB
- **Note:** ⚠️ Use this OR Database Setup Guide, not both
- **Cross-references:** Links to Environment Variables Guide for local configuration

### [⚙️ Environment Variables Guide](./ENVIRONMENT_VARIABLES_GUIDE.md) | [🌐 HTML](./ENVIRONMENT_VARIABLES_GUIDE.html)
- **Purpose:** Complete environment configuration reference and security practices
- **Covers:** Variable explanations, file structure, security practices, team setup, troubleshooting
- **For:** All team members (configuration reference) | **Priority:** 🔥 Critical
- **Cross-references:** Referenced by all other guides for specific environment setups

## 🚨 Important Notes

### Security Reminders:
- Never commit `.env.local` files to Git
- Use separate development vs production API keys
- Share sensitive credentials through secure channels only

### Team Collaboration:
- All documentation changes should be committed to Git
- Use pull requests for major changes
- Update documentation when adding new features

### Development Environment:
- **No local PostgreSQL required** - team connects to shared cloud database
- **Shared data** - all team members see the same database content
- **Real-time collaboration** - changes are immediately visible to all

## 🆘 Getting Help

### 🔍 **Problem-Solving Flow:**
1. **Identify your issue type:**
   - 🌐 **Vercel/Deployment issues** → [Vercel Workflow Guide - Troubleshooting](./VERCEL_WORKFLOW_GUIDE.md#troubleshooting)
   - 🗄️ **Database connection issues** → Check which database guide you're using:
     - Cloud DB: [Database Setup Guide - Troubleshooting](./DATABASE_SETUP_GUIDE.md#troubleshooting)  
     - Local DB: [Database User Setup - Troubleshooting](./DATABASE_USER_SETUP.md#troubleshooting)
   - ⚙️ **Environment variable issues** → [Environment Variables Guide - Troubleshooting](./ENVIRONMENT_VARIABLES_GUIDE.md#troubleshooting)
   - 👑 **Team coordination issues** → [Project Lead Guide - Troubleshooting](./PROJECT_LEAD_GUIDE.md#troubleshooting)

2. **Check the specific guide** for your issue type (each guide has its own troubleshooting section)
3. **Search existing issues** in the GitHub repository
4. **Ask in team chat** (Discord/Slack) with:
   - What you were trying to do
   - What error message you got
   - Which guide you were following
   - Your operating system (Windows/Mac/Linux)
5. **Create GitHub issue** for bugs or feature requests

### 🚨 **Emergency Contacts:**
- **Jose (Project Lead):** Database issues, Vercel problems, environment variables, infrastructure
- **Norma (Frontend Lead):** UI components, styling issues, React problems
- **Lily (Integration Lead):** Feature development, testing, third-party integrations

### 📚 **External Resources:**
- **Next.js Docs:** [nextjs.org/docs](https://nextjs.org/docs)
- **Prisma Docs:** [prisma.io/docs](https://www.prisma.io/docs)  
- **Vercel Docs:** [vercel.com/docs](https://vercel.com/docs)
- **Vercel Discord:** [vercel.com/discord](https://vercel.com/discord)
- **GitHub Issues:** Use for bug reports and feature requests

---

## 🔗 Cross-Reference Guide

**Looking for something specific?** Use this quick reference:

| I want to... | Go to... |
|--------------|----------|
| **Understand Git + Vercel workflow** | [Vercel Workflow Guide](./VERCEL_WORKFLOW_GUIDE.md) |
| **Set up team management and permissions** | [Project Lead Guide](./PROJECT_LEAD_GUIDE.md) |
| **Set up cloud database (shared)** | [Database Setup Guide](./DATABASE_SETUP_GUIDE.md) |
| **Set up local database (individual)** | [Database User Setup](./DATABASE_USER_SETUP.md) |
| **Configure environment variables** | [Environment Variables Guide](./ENVIRONMENT_VARIABLES_GUIDE.md) |
| **Understand database strategy options** | [Database Guides Clarification](#-database-guides-clarification) |
| **Get team member onboarding checklist** | [Setup Checklist by Role](#-setup-checklist-by-role) |
| **Find troubleshooting help** | [Getting Help](#-getting-help) |
| **See all available documentation** | [Documentation Index](#-quick-reference---guide-summaries) |

## 📞 Contact Information

- **Jose (Project Lead):** Backend/Infrastructure, Database, DevOps
- **Norma (Frontend):** UI/UX, React Components, Styling
- **Lily (Features):** Integration, Testing, Business Logic

---

**Last Updated:** June 20, 2025  
**Project Status:** ✅ Documentation Reorganized - Database Strategy Clarified  
**Next Phase:** Choose Database Strategy → Complete Setup → Begin Development

**📋 Quick Links:**
- [Main Documentation Index](./README.md) (you are here)
- [🌐 All HTML Docs](./VERCEL_WORKFLOW_GUIDE.html) | [📄 All Markdown Docs](./VERCEL_WORKFLOW_GUIDE.md)
- [🆘 Troubleshooting](#-getting-help) | [📞 Team Contacts](#-contact-information)