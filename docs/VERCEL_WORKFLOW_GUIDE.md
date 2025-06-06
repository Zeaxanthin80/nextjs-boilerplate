# Vercel + GitHub Workflow Guide

## Table of Contents
1. [Quick Summary - Key Definitions](#quick-summary---key-definitions)
2. [Understanding the Integration](#understanding-the-integration)
3. [Setup Instructions](#setup-instructions)
4. [Quick Setup Guide for Team Members](#quick-setup-guide-for-team-members)
5. [Team Member Vercel Setup Options](#team-member-vercel-setup-options)
6. [Practical Example - Combined Workflow](#practical-example---combined-workflow)
7. [Team Collaboration for Capstone Projects](#team-collaboration-for-capstone-projects)
8. [Command Reference](#command-reference)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Quick Summary - Key Definitions

### Essential Terms
- **PR (Pull Request)**: A GitHub feature to propose and review code changes before merging into main branch
- **npm run dev**: Basic Next.js local development server using local environment
- **vercel dev**: Enhanced development server that mimics Vercel's production environment
- **Preview Deployment**: Temporary deployment of your changes for testing (automatically created from PRs)
- **Production Deployment**: Live website accessible to users (deployed from main branch)

### Additional Useful Terms
- **Branch**: Separate line of development in Git (like a copy of your code to work on)
- **Commit**: Snapshot of your code changes with a descriptive message
- **Merge**: Combining changes from one branch into another (usually into main)
- **Environment Variables**: Configuration values (API keys, database URLs) stored securely
- **Serverless Functions**: Code that runs on-demand without managing servers (in `/api` folder)
- **Edge Runtime**: Vercel's global network that runs your code closer to users
- **Hot Reload**: Automatic page refresh when you save code changes
- **CI/CD**: Continuous Integration/Continuous Deployment (automated testing and deployment)
- **Rollback**: Reverting to a previous version if something breaks
- **Staging**: Testing environment that mimics production

---

## Understanding the Integration

### Your Current Setup
You started with:
1. **Vercel Dashboard** → Created project from Next.js template
2. **Connected to GitHub** → Vercel created a new GitHub repo
3. **Auto-deployed** → Vercel deployed the template to production
4. **Cloned locally** → You cloned the GitHub repo to work on it locally

### Two Integration Workflows

#### Workflow 1: GitHub-Driven (Automatic) - Your Primary Method
```
GitHub Repo ←→ Vercel Project (Connected)
     ↓
Push to main branch → Auto-deploys to Production
Create PR → Auto-creates Preview Deployment
```

**Benefits:**
- Automatic deployments
- Team collaboration through PRs
- Code review process
- Deployment history

#### Workflow 2: CLI-Driven (Manual) - Additional Control
```
Local Machine → Vercel CLI → Direct Deployment
     ↓
Skip GitHub entirely for quick tests
Or supplement GitHub workflow
```

**Benefits:**
- Quick testing without Git commits
- Emergency deployments
- Local development enhancement
- Environment variable management

---

## Setup Instructions

> **⚠️ Important:** The setup steps below depend on which team approach you choose (see Section 5: Team Member Vercel Setup Options). 
> - **Minimal Setup**: Only Jose needs steps 2-4 (Login & Link). Norma & Lily only need step 1 (CLI install)
> - **Full Access**: All team members need all steps 1-4
> - **Hybrid (Recommended)**: Jose needs all steps 1-4, Norma & Lily need steps 1 & 4 only

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```
**Who needs this:** 
- **Hybrid Approach (Recommended):** Jose only
- **Full Team Access:** All team members
- **Minimal Setup:** No one (skip this step)

### 3. Link Your Project
```bash
vercel link
```
This connects your local folder to your existing Vercel project.

**Who needs this:** Same as step 2 above.

### 4. Verify Setup
```bash
vercel --version
vercel whoami
```

---

## Quick Setup Guide for Team Members

### **For Jose (Backend/Infrastructure - Project Lead):**

```bash
# 1. Create/clone the repository (if not already done)
git clone https://github.com/your-team/nextjs-boilerplate.git
cd nextjs-boilerplate

# 2. Install dependencies
npm install

# 3. Install Vercel CLI globally
npm i -g vercel

# 4. Login and link to Vercel project
vercel login
vercel link

# 5. Pull production environment variables
vercel env pull .env.local

# 6. Create environment template for team
cp .env.local .env.example
# Edit .env.example to remove sensitive values, keep structure only
git add .env.example
git commit -m "Add environment variables template for team"
git push origin main

# 7. Set up branch protection rules on GitHub:
# Go to GitHub → Settings → Branches → Add rule
# - Branch name pattern: main
# - Require pull request reviews before merging
# - Require status checks to pass before merging

# 8. Invite team members as collaborators:
# GitHub → Settings → Manage access → Invite collaborators
# Add Norma and Lily with "Write" permissions

# 9. Your daily workflow:
git checkout main
git pull origin main
git checkout -b feature/auth-system
# Make your changes...
vercel dev  # Start enhanced development server
git add .
git commit -m "feat: implement NextAuth.js authentication system"
git push origin feature/auth-system
# Create PR on GitHub, review team PRs, manage deployments
```

### **For Norma (Frontend/UI):**

```bash
# 1. Clone the repository
git clone https://github.com/your-team/nextjs-boilerplate.git
cd nextjs-boilerplate

# 2. Install dependencies
npm install

# 3. Install Vercel CLI (for enhanced local development)
npm i -g vercel

# 4. Set up environment variables
cp .env.example .env.local
# Edit .env.local with development credentials (Jose will provide)

# 5. Start development server
vercel dev  # Enhanced development server
# OR
npm run dev  # Basic Next.js server

# 6. Your daily workflow:
git checkout main
git pull origin main
git checkout -b feature/dashboard-redesign
# Make your changes...
git add .
git commit -m "Improve dashboard layout and add responsive design"
git push origin feature/dashboard-redesign
# Create PR on GitHub
```

### **For Lily (Features/Integration):**

```bash
# 1. Clone the repository
git clone https://github.com/your-team/nextjs-boilerplate.git
cd nextjs-boilerplate

# 2. Install dependencies
npm install

# 3. Install Vercel CLI (for enhanced local development)
npm i -g vercel

# 4. Set up environment variables
cp .env.example .env.local
# Edit .env.local with development credentials (Jose will provide)

# 5. Start development server
vercel dev  # Enhanced development server

# 6. Your daily workflow:
git checkout main
git pull origin main
git checkout -b feature/email-campaigns
# Make your changes...
git add .
git commit -m "Add email campaign sending functionality"
git push origin feature/email-campaigns
# Create PR on GitHub
```

### **Team Communication Setup:**

```bash
# Daily standup (15 minutes, can be async):
# 1. What did you work on yesterday?
# 2. What will you work on today?
# 3. Any blockers or questions?

# Weekly demo (Friday afternoon):
# - Show progress on preview deployment
# - Demo new features
# - Plan next week's work
# - Address any integration issues
```

### **Git Workflow for Team:**

```bash
# Feature branch naming convention:
git checkout -b feature/login-ui          # Norma
git checkout -b feature/email-api         # Jose  
git checkout -b feature/campaign-testing  # Lily

# Commit message format:
git commit -m "feat: add responsive navigation menu

- Implement mobile hamburger menu
- Add smooth transitions
- Fix accessibility issues
- Test on mobile devices"

# Before starting work each day:
git checkout main
git pull origin main  # Get latest changes
git checkout -b feature/your-new-feature
```

### **VS Code Extensions (Recommended):**

```bash
# Install these extensions for better development:
# - ES7+ React/Redux/React-Native snippets
# - Tailwind CSS IntelliSense
# - Prisma
# - GitLens
# - Auto Rename Tag
# - Prettier - Code formatter
```

### **VS Code Color Theme (Recommended):**

```bash
# Install these color themes for better team coordination:
# - Frequency Grey <- Preferred
# - Frequency Dark
```

---

## Team Member Vercel Setup Options

#### **Option 1: Minimal Setup (Recommended for Most Teams)**

**What each team member needs:**
```bash
# Only install Vercel CLI (no account linking required)
npm i -g vercel

# Use for local development enhancement only
vercel dev  # Works without linking to Vercel account
```

**Benefits:**
- ✅ Enhanced local development (production-like environment)
- ✅ No Vercel account required for team members
- ✅ No access to production environment variables
- ✅ Simple and secure
- ✅ All deployments happen through GitHub (automated)

**Workflow:**
```bash
# Team member daily workflow
git checkout -b feature/new-feature
vercel dev  # Local development with enhanced features
# Make changes, test locally
git add .
git commit -m "Add new feature"
git push origin feature/new-feature
# Create PR on GitHub → Vercel auto-deploys preview
```

#### **Option 2: Full Team Access (For Advanced Teams)**

**What each team member needs:**
```bash
# 1. Create individual Vercel accounts (free)
# 2. Project owner invites team members to Vercel project
# 3. Each member links their local project
vercel login  # Login with their own account
vercel link   # Link to shared project
```

**Benefits:**
- ✅ Access to production environment variables
- ✅ Can create manual preview deployments
- ✅ Can view deployment logs and analytics
- ✅ Can manage environment variables

**Team Setup Process:**
```bash
# Project owner (Jose):
# 1. Go to Vercel Dashboard → Project → Settings → Members
# 2. Invite team members by email
# 3. Set appropriate permissions (Developer/Viewer)

# Team members (Norma & Lily):
# 1. Accept Vercel invitation email
# 2. Create Vercel account (if needed)
vercel login
vercel link  # Select the shared project
```

#### **Option 3: Hybrid Approach (Recommended for Capstone)**

**Setup:**
- **Jose (Project Lead)**: Full Vercel access with linking
- **Norma & Lily (Developers)**: Vercel CLI for local development only

**Benefits:**
- ✅ One person manages deployments and settings
- ✅ Others get enhanced local development
- ✅ Simpler permission management
- ✅ Clear responsibility structure

```bash
# Jose (Project Lead) - Full Setup
vercel login
vercel link
vercel env pull .env.local  # Downloads production env vars

# Norma & Lily setup:
npm i -g vercel
# That's it! They use vercel dev without linking
```

### Environment Variables Management

#### **Shared Development Environment Variables**
Create a `.env.example` file for team coordination:

```bash
# .env.example (committed to Git)
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### **Team Member Environment Setup**
```bash
# Each team member creates their own .env.local
cp .env.example .env.local

# Fill in with development/test credentials
# Use test API keys, local database, etc.
```

### Vercel CLI Commands Without Account Linking

#### **What Works Without vercel link:**
```bash
vercel dev          # ✅ Enhanced local development
vercel --version    # ✅ Check CLI version
npx vercel dev      # ✅ Alternative if globally installed CLI has issues
```

#### **What Requires vercel link:**
```bash
vercel --prod=false # ❌ Requires linked project
vercel env pull     # ❌ Requires project access
vercel logs         # ❌ Requires project access
vercel ls          # ❌ Requires account access
```

### Recommended Workflow for Your Capstone Team

#### **Initial Setup (Jose - Project Lead Only):**
```bash
# Jose (Project Lead) - Full Setup
vercel login
vercel link
vercel env pull .env.local

# Create .env.example for team
cp .env.local .env.example
# Remove sensitive values, keep structure
git add .env.example
git commit -m "Add environment variables template"
git push origin main
```

#### **Team Member Setup (Norma & Lily):**
```bash
# Clone repository
git clone https://github.com/your-team/nextjs-boilerplate.git
cd nextjs-boilerplate

# Install dependencies
npm install

# Install Vercel CLI
npm i -g vercel

# Set up local environment
cp .env.example .env.local
# Edit .env.local with development credentials

# Start development
vercel dev
```

#### **Daily Development Workflow:**
```bash
# Everyone follows the same process:
git checkout main
git pull origin main
git checkout -b feature/your-feature

# Start development server
vercel dev  # Enhanced local development

# Make changes, test locally
git add .
git commit -m "Descriptive commit message"
git push origin feature/your-feature

# Create PR on GitHub
# Vercel automatically creates preview deployment
# Team reviews PR and preview URL
# Merge when approved
```

### Security and Best Practices

#### **Environment Variable Security:**
- ✅ Never commit `.env.local` to Git (already in .gitignore)
- ✅ Use test/development API keys for local development
- ✅ Only project lead has access to production secrets
- ✅ Share development credentials through secure channels (not Slack/email)

#### **Team Access Control:**
```bash
# If using Option 2 (Full Team Access):
# Set appropriate Vercel permissions:
# - Project Lead: Admin
# - Developers: Developer (can deploy, view logs)
# - Others: Viewer (can view deployments only)
```

### Troubleshooting Team Setup

#### **Common Issues:**

**1. "vercel dev" not working without linking:**
```bash
# Solution: Use basic Next.js dev server
npm run dev

# Or install packages for enhanced development
npm install @vercel/node
```

**2. Environment variables not available:**
```bash
# Team members without linking need to manually set up .env.local
cp .env.example .env.local
# Add development API keys and database URLs
```

**3. Different team members seeing different behavior:**
```bash
# Ensure everyone is using the same versions
node --version
npm --version
vercel --version

# Update if needed
npm i -g vercel@latest
```

---

## Practical Example - Combined Workflow

Let's add a contact form to demonstrate the complete workflow:

### Step 1: Local Development (CLI)
```bash
# Start local dev with production environment
cd /home/jose/nextjs-boilerplate
vercel dev

# Open http://localhost:3000
# You now have production environment variables available locally
```

### Step 2: Create Feature Branch
```bash
# Create and switch to new branch
git checkout -b add-contact-form

# Verify you're on the new branch
git branch
```

### Step 3: Make Changes
```bash
# Edit your files (app/page.tsx, create API routes, etc.)
# Test changes with vercel dev running
```

### Step 4: Quick Preview (CLI) - Optional
```bash
# Quick test deployment without Git commit
vercel --prod=false

# You'll get a preview URL like:
# https://nextjs-boilerplate-abc123.vercel.app
# Share this for quick feedback
```

### Step 5: Commit Changes
```bash
# Stage your changes
git add .

# Commit with descriptive message
git commit -m "Add contact form with email validation"

# Check status
git status
```

### Step 6: Push and Create PR
```bash
# Push branch to GitHub
git push origin add-contact-form

# Go to GitHub.com → Your repo → You'll see "Create Pull Request" button
# Click it and fill out the PR description
```

### Step 7: Automatic Preview Deployment
- Vercel automatically creates a preview deployment from your PR
- Preview URL appears as a comment in the PR
- Team can review both code and live preview

### Step 8: Review and Merge
- Team reviews your changes
- Test the preview deployment
- Once approved, merge the PR
- Vercel automatically deploys to production

### Step 9: Cleanup
```bash
# Switch back to main branch
git checkout main

# Pull the latest changes
git pull origin main

# Delete the feature branch (optional)
git branch -d add-contact-form
```

---

## Team Collaboration for Capstone Projects

### Why This Workflow is Perfect for Your Marketing SaaS

✅ **3-Person Team Coordination**: PR-based workflow prevents conflicts and ensures code review  
✅ **Preview Deployments**: Stakeholders can test features before they go live  
✅ **Environment Management**: Separate dev, staging, and production environments  
✅ **Version Control**: Track who changed what and when (important for grading)  
✅ **Professional Standards**: Industry-standard workflow that looks great in portfolios  
✅ **SaaS-Ready**: Built-in support for databases, authentication, and APIs  

### Team Setup and Organization

#### 1. Repository Setup
```bash
# One team member creates the main repository
# Add other team members as collaborators:
# GitHub → Settings → Manage access → Invite collaborators

# Everyone clones the same repository
git clone https://github.com/your-team/nextjs-boilerplate.git
cd nextjs-boilerplate

# Everyone links their local project to Vercel
vercel link
```

#### 2. Branch Protection Rules (Recommended)
Set up branch protection on GitHub:
- Go to **Settings** → **Branches** → **Add rule**
- Branch name pattern: `main`
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass before merging
- ✅ Require branches to be up to date before merging

#### 3. Team Workflow Structure
```
main branch (production)
├── dev branch (shared development)
├── feature/user-authentication (Jose)
├── feature/dashboard-ui (Norma)
└── feature/email-campaigns (Lily)
```

### SaaS-Specific Implementation

#### 1. Environment Structure
```bash
# Development (local)
vercel dev  # Uses development database

# Staging (preview deployments)
# Uses staging database, test payment processor

# Production
# Uses production database, live payment processor
```

#### 2. Essential SaaS Features Setup

**Authentication System:**
```bash
# Install NextAuth.js for authentication
npm install next-auth
npm install @auth/prisma-adapter prisma @prisma/client

# Set up providers (Google, GitHub, email)
# Environment variables needed:
# NEXTAUTH_SECRET=
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
```

**Database Setup:**
```bash
# Install Prisma for database management
npm install prisma @prisma/client
npx prisma init

# Environment variables:
# DATABASE_URL="postgresql://..."
# DIRECT_URL="postgresql://..." (for migrations)
```

**Payment Processing:**
```bash
# Install Stripe for subscriptions
npm install stripe @stripe/stripe-js

# Environment variables:
# STRIPE_SECRET_KEY=
# STRIPE_PUBLISHABLE_KEY=
# STRIPE_WEBHOOK_SECRET=
```

#### 3. Team Development Workflow

**Daily Workflow:**
```bash
# Start each day
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name

# Start development
vercel dev

# Work on your feature...
# Commit frequently with descriptive messages
git add .
git commit -m "Add user registration form with validation"

# Push and create PR when ready
git push origin feature/your-feature-name
```

**Weekly Integration:**
```bash
# Merge completed features to dev branch
git checkout dev
git pull origin dev
git merge feature/completed-feature
git push origin dev

# Test integration
vercel --prod=false  # Creates preview deployment
```

#### 4. Project Organization by Team Member

**Jose: Backend/Infrastructure**
- Authentication system (NextAuth.js)
- Database schema design (Prisma)
- API routes and serverless functions
- Environment setup and deployment
- Stripe integration for subscriptions

**Norma: Frontend/UI**
- Dashboard components and layouts
- Landing page and marketing site
- User interface design and styling
- Responsive design and mobile optimization
- Component library and design system

**Lily: Features/Integration**
- Email campaign functionality
- Analytics and reporting dashboard
- Third-party integrations (SendGrid, etc.)
- Testing and quality assurance
- User experience and flow optimization

### Marketing SaaS Specific Features

#### 1. Core Features to Implement
```bash
# Email marketing functionality
npm install @sendgrid/mail nodemailer

# Analytics and tracking
npm install @vercel/analytics mixpanel

# Charts and dashboards
npm install recharts chart.js

# Form handling
npm install react-hook-form zod
```

#### 2. API Routes Structure
```
/api
├── auth/           # Authentication endpoints
├── users/          # User management
├── campaigns/      # Email campaigns
├── analytics/      # Usage analytics
├── billing/        # Subscription management
└── webhooks/       # External service webhooks
```

#### 3. Database Schema Example
```prisma
// prisma/schema.prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  plan      Plan     @default(FREE)
  campaigns Campaign[]
  createdAt DateTime @default(now())
}

model Campaign {
  id          String   @id @default(cuid())
  title       String
  content     String
  recipients  String[]
  status      Status   @default(DRAFT)
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}

enum Plan {
  FREE
  PRO
  ENTERPRISE
}

enum Status {
  DRAFT
  SCHEDULED
  SENT
}
```

### Project Management Integration

#### 1. GitHub Issues for Task Management
```bash
# Create issues for each feature
# Example issues:
- [ ] Set up user authentication system
- [ ] Design dashboard wireframes
- [ ] Implement email campaign creation
- [ ] Add payment processing
- [ ] Create landing page
- [ ] Set up analytics tracking
```

#### 2. GitHub Projects Board
Set up a project board with columns:
- **Backlog**: Features to implement
- **In Progress**: Currently being worked on
- **Review**: In pull request review
- **Testing**: In preview deployment testing
- **Done**: Merged and deployed

#### 3. Communication Workflow
```bash
# Daily standup (can be async in Slack/Discord):
# 1. What did you work on yesterday?
# 2. What will you work on today?
# 3. Any blockers or questions?

# Weekly demo:
# - Show progress on preview deployment
# - Discuss next week's priorities
# - Review any issues or bugs
```

### Capstone Documentation

#### 1. Track Everything for Your Portfolio
```bash
# Keep detailed commit messages
git commit -m "feat: add email template editor with drag-drop functionality

- Implement drag-drop interface using react-dnd
- Add template preview functionality
- Include responsive design for mobile
- Add unit tests for template validation

Closes #23"

# Document architectural decisions
# Create docs/ folder with:
# - README.md (project overview)
# - ARCHITECTURE.md (technical decisions)
# - API.md (API documentation)
# - DEPLOYMENT.md (deployment process)
```

#### 2. Demo Preparation
```bash
# Create separate demo environment
git checkout -b demo-environment
# Set up demo data, clean UI, etc.
vercel --prod=false  # Deploy demo version

# Prepare presentation materials:
# - Live demo URL
# - GitHub repository
# - Technical documentation
# - Feature walkthrough
```

### Grading and Assessment Benefits

✅ **Version Control History**: Professors can see individual contributions  
✅ **Professional Workflow**: Demonstrates industry-standard practices  
✅ **Deployment Pipeline**: Shows understanding of modern development  
✅ **Team Collaboration**: Evidence of effective teamwork  
✅ **Documentation**: Well-documented codebase and processes  
✅ **Live Demo**: Working application with real URL  

### 7-Week Capstone Timeline (Accelerated)

**Week 1: Foundation & Setup** 🚀
- **Jose (Backend)**: Repository setup, basic Next.js app, database schema
- **Norma (Frontend)**: Team onboarding, design system setup, basic components
- **Lily (Features)**: Project planning, API research, testing framework
- **Deliverable**: Working Next.js app with basic authentication

**Week 2: Core Authentication & UI** 🔐
- **Jose**: NextAuth.js setup, user registration/login, database integration
- **Norma**: Landing page, dashboard layout, navigation components
- **Lily**: User flow testing, form validation, basic email setup
- **Deliverable**: Users can register, login, and see basic dashboard

**Week 3: Essential SaaS Features** 📧
- **Jose**: Email campaign API routes, database models for campaigns
- **Norma**: Campaign creation UI, email template builder
- **Lily**: Email sending integration (SendGrid), campaign management
- **Deliverable**: Users can create and send basic email campaigns

**Week 4: Dashboard & Analytics** 📊
- **Jose**: Analytics API, campaign performance tracking
- **Norma**: Dashboard with charts, campaign analytics UI
- **Lily**: Data integration, reporting features, user feedback
- **Deliverable**: Working dashboard with campaign analytics

**Week 5: Subscriptions & Polish** 💳
- **Jose**: Stripe integration, subscription management API
- **Norma**: Pricing page, subscription UI, mobile responsiveness
- **Lily**: Payment flow testing, feature limitations by plan
- **Deliverable**: Complete SaaS with subscription tiers

**Week 6: Testing & Documentation** 🧪
- **Jose**: Performance optimization, security review, API documentation
- **Norma**: UI/UX improvements, accessibility, design polish
- **Lily**: End-to-end testing, bug fixes, user documentation
- **Deliverable**: Production-ready application with documentation

**Week 7: Final Demo Preparation** 🎯
- **All Team**: Demo environment setup, presentation materials, final testing
- **Jose**: Deploy demo version, prepare technical documentation
- **Norma**: Create presentation slides, demo script
- **Lily**: Test all user flows, prepare feature walkthrough
- **Deliverable**: Live demo, presentation, and project submission

### Simplified 7-Week SaaS Scope (MVP Approach)

#### **Core Features Only (MVP)**
```bash
# Week 1-2: Foundation
✅ User authentication (login/register)
✅ Basic dashboard layout
✅ Database setup

# Week 3-4: Essential SaaS
✅ Email campaign creation
✅ Campaign sending (basic)
✅ Campaign list/management

# Week 5-6: Business Model
✅ Subscription plans (Free/Pro)
✅ Payment integration
✅ Basic analytics

# Week 7: Demo Ready
✅ Landing page
✅ Demo data
✅ Presentation materials
```

#### **Features We'll Skip (for time)**
❌ Advanced email templates
❌ Complex analytics/charts
❌ A/B testing
❌ Advanced automation
❌ Team collaboration features
❌ Advanced user management

#### **Tech Stack (Keep It Simple)**
```bash
# Frontend
- Next.js 14 (React framework)
- Tailwind CSS (styling)
- Shadcn/ui (component library)

# Backend
- NextAuth.js (authentication)
- Prisma + PostgreSQL (database)
- Vercel (deployment)

# SaaS Features
- Stripe (payments)
- SendGrid (email sending)
- Recharts (simple charts)
```

---

## Command Reference

### Git Commands
```bash
# Branch management
git checkout -b feature-name    # Create and switch to new branch
git checkout main               # Switch to main branch
git branch                      # List all branches
git branch -d branch-name       # Delete branch

# Changes management
git status                      # Check current status
git add .                       # Stage all changes
git add filename                # Stage specific file
git commit -m "message"         # Commit changes
git push origin branch-name     # Push branch to GitHub
git pull origin main            # Pull latest changes from main

# View history
git log --oneline              # View commit history
git diff                       # View unstaged changes
```

### Vercel CLI Commands
```bash
# Development
vercel dev                     # Start development server
vercel --prod=false           # Create preview deployment
vercel --prod                 # Deploy to production
vercel link                   # Connect local project to Vercel

# Environment management
vercel env pull .env.local    # Download production env vars
vercel env ls                 # List environment variables
vercel env add               # Add new environment variable

# Project management
vercel ls                    # List all deployments
vercel inspect <url>         # Get deployment details
vercel promote <url>         # Promote preview to production
vercel rollback <url>        # Rollback to previous deployment

# Logs and debugging
vercel logs <url>            # View deployment logs
vercel whoami                # Check current user
vercel --version             # Check CLI version
```

### NPM Commands
```bash
npm run dev                  # Start basic Next.js dev server
npm run build               # Build for production
npm run start               # Start production server locally
npm install                 # Install dependencies
npm install package-name    # Install specific package
```

---

## Troubleshooting

### Common Issues

#### 1. "vercel command not found"
```bash
# Solution: Install globally
npm i -g vercel

# Or use npx
npx vercel
```

#### 2. "Project not linked"
```bash
# Solution: Link your project
vercel link

# Follow the prompts to connect to your existing Vercel project
```

#### 3. "Environment variables not working"
```bash
# Solution: Pull from production
vercel env pull .env.local

# Then restart your dev server
```

#### 4. "Git push rejected"
```bash
# Solution: Pull latest changes first
git pull origin main

# Then push again
git push origin your-branch-name
```

#### 5. "Preview deployment failed"
Check the Vercel dashboard for build logs:
```bash
# Or check logs via CLI
vercel logs <deployment-url>
```

---

## Best Practices

### 1. Branch Naming
Use descriptive branch names:
```bash
git checkout -b feature/contact-form
git checkout -b fix/navbar-mobile
git checkout -b update/dependencies
```

### 2. Commit Messages
Write clear commit messages:
```bash
git commit -m "Add contact form with validation"
git commit -m "Fix responsive navbar on mobile"
git commit -m "Update dependencies to latest versions"
```

### 3. Environment Variables
- Never commit sensitive data to Git
- Use `vercel env pull` to sync production variables
- Keep `.env.local` in `.gitignore`

### 4. Testing Strategy
1. **Local testing**: Use `vercel dev` for production-like environment
2. **Preview testing**: Create PR for team review
3. **Production monitoring**: Watch for errors after deployment

### 5. Deployment Strategy
- **Small changes**: Direct merge to main
- **Large features**: Use feature branches and PRs
- **Urgent fixes**: Use `vercel --prod` for emergency deployments

### 6. Team Collaboration
- Always create PRs for code review
- Use descriptive PR titles and descriptions
- Test preview deployments before merging
- Communicate with team about breaking changes

---

*This guide is for local reference only and is not committed to Git.*
