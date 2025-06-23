# Vercel + GitHub Workflow Guide

## Table of Contents
1. [Quick Summary - Team Roles](#quick-summary---team-roles)
2. [Understanding the Integration](#understanding-the-integration)
3. [Setup Instructions for Jose (Project Lead)](#setup-instructions-for-jose-project-lead)
4. [Setup Instructions for Team Members](#setup-instructions-for-team-members)
5. [Daily Development Workflow](#daily-development-workflow)
6. [Practical Example - Combined Workflow](#practical-example---combined-workflow)
7. [Team Collaboration Best Practices](#team-collaboration-best-practices)
8. [Command Reference](#command-reference)
9. [Troubleshooting](#troubleshooting)
10. [Best Practices](#best-practices)

---

## Quick Summary - Team Roles

### **Jose (Project Lead)**
- **Has Vercel account and manages all deployments**
- **Manages environment variables and production settings**
- **Reviews and merges pull requests**
- **Handles all Vercel CLI operations**

### **Norma & Lily (Team Members)**
- **Use GitHub for collaboration (no Vercel account needed)**
- **Use `npm run dev` for all local development**
- **Create branches and submit pull requests**
- **Focus on coding without deployment concerns**

### Essential Terms
- **Pull Request (PR)**: GitHub feature to propose and review code changes before merging into main branch
- **npm run dev**: Next.js local development server (what team members use)
- **Preview Deployment**: Automatic temporary deployment created from PRs for testing
- **Production Deployment**: Live website deployed from main branch (Jose manages)

---

## Understanding the Integration

### Current Setup (Simplified)
1. **GitHub Repository** → Contains your code
2. **Vercel Project** → Connected to GitHub repository (Jose manages)
3. **Automatic Deployments** → Vercel automatically deploys from GitHub

### **GitHub-Driven Workflow (Only Method Used)**
```
GitHub Repo ←→ Vercel Project (Jose manages connection)
     ↓
Push to main branch → Jose reviews → Auto-deploys to Production
Create PR → Auto-creates Preview Deployment for testing
```

**Benefits:**
- Automatic deployments without team complexity
- Team collaboration through standard GitHub workflow
- Code review process through pull requests
- Clear separation of responsibilities
- Preview deployments for testing changes

---

## Setup Instructions for Jose (Project Lead)

### Initial Project Setup
```bash
# 1. Clone the repository (if not already done)
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
```

### GitHub Repository Setup
```bash
# 7. Set up branch protection rules on GitHub:
# Go to GitHub → Settings → Branches → Add rule
# - Branch name pattern: main
# - Require pull request reviews before merging
# - Require status checks to pass before merging

# 8. Invite team members as collaborators:
# GitHub → Settings → Manage access → Invite collaborators
# Add Norma and Lily with "Write" permissions
```

### Jose's Daily Development Commands
```bash
# Start development server (for infrastructure/backend work)
vercel dev

# Alternative: Standard Next.js dev server
npm run dev

# Manage environment variables
vercel env pull .env.local  # Pull latest from production
vercel env add              # Add new environment variables

# Check deployment status
vercel ls                   # List deployments
vercel logs                 # View deployment logs
```

---

## Setup Instructions for Team Members

### **For Norma & Lily (No Vercel Account Needed)**

```bash
# 1. Clone the repository
git clone https://github.com/your-team/nextjs-boilerplate.git
cd nextjs-boilerplate

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with development credentials (Jose will provide)

# 4. Start development server
npm run dev  # This is all you need!
```

**That's it!** Team members only need these 4 steps. No Vercel CLI installation, no authentication, no complex setup.

### Team Members' Daily Development Commands
```bash
# This is the only command you need for development:
npm run dev

# Standard Git workflow:
git checkout main
git pull origin main
git checkout -b feature/your-feature-name
# Make your changes...
git add .
git commit -m "Add new feature"
git push origin feature/your-feature-name
# Create PR on GitHub
```
---

## Daily Development Workflow

### **Jose's Workflow (Project Lead)**
```bash
# Morning routine:
git checkout main
git pull origin main

# Review pending PRs on GitHub
# Check Vercel dashboard for deployment status

# Start working on infrastructure/backend features:
git checkout -b feature/auth-system
vercel dev  # Start development server with Vercel features
# Make changes...
git add .
git commit -m "feat: implement NextAuth.js authentication"
git push origin feature/auth-system
# Create PR on GitHub

# Review team member PRs:
# - Test preview deployments
# - Code review on GitHub
# - Merge approved PRs (triggers production deployment)
```

### **Norma & Lily's Workflow (Team Members)**
```bash
# Morning routine:
git checkout main
git pull origin main  # Get latest changes from Jose and team

# Start working on your feature:
git checkout -b feature/dashboard-ui
npm run dev  # Start development server
# Make changes...
git add .
git commit -m "Improve dashboard layout and responsiveness"
git push origin feature/dashboard-ui
# Create PR on GitHub

# Wait for Jose's review and merge
# Check preview deployment link in PR for testing
```

### **Git Workflow for Team**
```bash
# Feature branch naming convention:
git checkout -b feature/login-ui          # Norma - Frontend work
git checkout -b feature/email-api         # Jose - Backend/infrastructure
git checkout -b feature/campaign-testing  # Lily - Feature integration

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

### **Environment Variables Management**

#### **Jose's Responsibility:**
```bash
# Manage production environment variables
vercel env add STRIPE_SECRET_KEY  # Add new variables
vercel env pull .env.local        # Download latest for local testing

# Update team template when new variables are added
cp .env.local .env.example
# Remove sensitive values, keep structure
git add .env.example
git commit -m "Update environment variables template"
git push origin main
```

#### **Team Members:**
```bash
# Use development credentials provided by Jose
cp .env.example .env.local
# Edit .env.local with development values (Jose provides these)

# Example .env.local for team members:
NEXTAUTH_SECRET=dev-secret-key
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://dev_user:dev_pass@localhost:5432/dev_db
STRIPE_PUBLISHABLE_KEY=pk_test_...  # Test keys only
```

# Install dependencies
npm install

# Install Vercel CLI
npm i -g vercel

# Set up local environment
cp .env.example .env.local
# Edit .env.local with development credentials

# Start development (RECOMMENDED)
npm run dev  # Next.js development server - perfect for most work!
```

#### **Daily Development Workflow:**
```bash
# Everyone follows the same process:
git checkout main
git pull origin main
git checkout -b feature/your-feature

# Start development server
npm run dev  # Next.js development server (recommended for most work)

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

**1. "Should I use vercel dev or npm run dev?"**
```bash
# RECOMMENDED: Use npm run dev for most development work
npm run dev

# Why npm run dev is better for team members:
# - Works immediately after npm install
# - No authentication required
# - Includes all Next.js features (API routes, hot reload, routing)
# - Officially recommended by Vercel for Next.js projects

# Only use vercel dev when:
# - You need Edge middleware testing (rare)
# - Working with Vercel-specific routing
# - Jose needs production environment for infrastructure work
```

**2. Environment variables not available:**
```bash
# Team members should set up .env.local for development
cp .env.example .env.local
# Edit with development credentials (Jose will provide these securely)

# For most development work, you don't need production environment variables
npm run dev  # Uses your local .env.local file
```

**3. Different team members seeing different behavior:**
```bash
# Ensure everyone is using the same approach
# All team members should use:
npm run dev  # Consistent Next.js development server

# Check versions if having issues
node --version
npm --version

# Update if needed
npm install -g npm@latest
```

---

## Practical Example - Combined Workflow

Let's add a contact form to demonstrate the complete workflow:

### Step 1: Local Development (For Jose - Infrastructure Lead)
```bash
# Start local dev with production environment (Jose only)
cd /home/jose/nextjs-boilerplate
vercel dev

# Open http://localhost:3000
# Jose has production environment variables available locally
# This is needed for infrastructure work and deployment testing
```

### Step 1: Local Development (For Team Members)
```bash
# Start local development (Norma & Lily)
cd /home/jose/nextjs-boilerplate
npm run dev

# Open http://localhost:3000
# Perfect for frontend/UI work and feature development
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
# Test changes with npm run dev running (for most team members)
# OR vercel dev running (for Jose's infrastructure work)
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
---

## Team Collaboration Best Practices

### **Repository Setup (Jose's Responsibility)**
```bash
# 1. Set up branch protection rules on GitHub:
# Go to GitHub → Settings → Branches → Add rule
# - Branch name pattern: main
# - Require pull request reviews before merging
# - Require status checks to pass before merging

# 2. Invite team members as collaborators:
# GitHub → Settings → Manage access → Invite collaborators
# Add Norma and Lily with "Write" permissions
```

### **Daily Team Workflow**

#### **Morning Routine (All Team Members)**
```bash
git checkout main
git pull origin main  # Get latest changes

# Check for any new environment variables
cp .env.example .env.local  # Update if Jose added new variables
```

#### **Feature Development Process**
1. **Start New Feature:** Create descriptive branch name
   ```bash
   git checkout -b feature/login-ui          # Norma - Frontend work
   git checkout -b feature/email-api         # Jose - Backend/infrastructure  
   git checkout -b feature/campaign-testing  # Lily - Feature integration
   ```

2. **Development:** Work locally with `npm run dev`
3. **Testing:** Test your changes thoroughly
4. **Commit:** Use clear, descriptive commit messages
5. **Push:** Push branch and create PR on GitHub
6. **Review:** Jose reviews and merges approved PRs

#### **Communication Setup**
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

### **Team Member Responsibilities**

#### **Jose (Project Lead)**
- **✅ Manage Vercel deployments and environment variables**
- **✅ Review and merge all pull requests**
- **✅ Handle backend/infrastructure work**
- **✅ Manage database schema and API routes**
- **✅ Setup and maintain development environment for team**

#### **Norma (Frontend/UI)**
- **✅ Create user interface components and layouts**
- **✅ Implement responsive design and styling**
- **✅ Work on landing pages and marketing site**
- **✅ Use `npm run dev` for all development work**
- **✅ Submit pull requests for all changes**

#### **Lily (Features/Integration)**
- **✅ Implement business features and user flows**
- **✅ Handle third-party integrations and APIs**
- **✅ Test features and ensure quality**
- **✅ Use `npm run dev` for all development work**
- **✅ Submit pull requests for all changes**

### **VS Code Extensions (Recommended for Team)**
```bash
# Install these extensions for better development:
# - ES7+ React/Redux/React-Native snippets
# - Tailwind CSS IntelliSense
# - Prisma
# - GitLens
# - Auto Rename Tag
# - Prettier - Code formatter
# - GitHub Pull Requests and Issues
```

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

### Vercel CLI Commands (For Jose - Project Lead)
```bash
# Development
vercel dev                     # Start development server (requires auth)
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

### NPM Commands (For All Team Members)
```bash
npm run dev                  # Start Next.js dev server (RECOMMENDED)
npm run build               # Build for production
npm run start               # Start production server locally
npm install                 # Install dependencies
npm install package-name    # Install specific package
```

---

## Troubleshooting

### Common Issues

#### 1. "npm run dev not working"
```bash
# Solution: Make sure dependencies are installed
npm install

# Check if port 3000 is available
npm run dev -- --port 3001  # Use different port if needed
```

#### 2. "Environment variables not working"
```bash
# Solution: Make sure .env.local exists and has correct values
cp .env.example .env.local
# Edit .env.local with development credentials (Jose provides these)

# Restart development server after changes
npm run dev
```

#### 3. "Git push rejected"
```bash
# Solution: Pull latest changes first
git pull origin main

# Then push again
git push origin your-branch-name
```

#### 4. "Can't create pull request"
```bash
# Make sure you're on the correct branch
git branch  # Check current branch

# Make sure you've pushed your branch
git push origin your-branch-name

# Then go to GitHub.com to create PR
```

#### 5. "Preview deployment failed" (Jose only)
```bash
# Check Vercel dashboard for build logs
# Or check logs via CLI (Jose only)
vercel logs <deployment-url>
```

#### 6. "Should I use npm run dev or vercel dev?"
**Answer:** Team members should ALWAYS use `npm run dev`

```bash
# For Norma and Lily (team members):
npm run dev  # This is all you need!

# For Jose (infrastructure work only):
vercel dev   # Only when needed for deployment testing
```

**Why `npm run dev` is better for team members:**
- ✅ No authentication required
- ✅ Works immediately after `npm install`
- ✅ Includes all Next.js features (hot reload, API routes, routing)
- ✅ Officially recommended by Vercel for Next.js projects
- ✅ Perfect for frontend/UI work and feature development

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
1. **Local testing**: Use `npm run dev` for daily development work
2. **Preview testing**: Create PR for team review and automatic preview deployment
3. **Production monitoring**: Watch for errors after deployment
4. **Infrastructure testing**: Jose uses `vercel dev` when needed for deployment preparation

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
