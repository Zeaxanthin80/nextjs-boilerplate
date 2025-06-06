# Project Lead Guide - Jose (Backend/Infrastructure)

This guide contains detailed administrator instructions for setting up and managing the Vercel + GitHub workflow for your 3-person capstone team.

## Table of Contents
1. [Initial Project Setup](#initial-project-setup)
2. [Understanding `vercel link`](#understanding-vercel-link)
3. [Environment Variables Management](#environment-variables-management)
4. [Team Member Onboarding](#team-member-onboarding)
5. [GitHub Repository Configuration](#github-repository-configuration)
6. [Deployment Management](#deployment-management)
7. [Troubleshooting & Team Support](#troubleshooting--team-support)
8. [Security Best Practices](#security-best-practices)

---

## Initial Project Setup

### Step 1: Verify Your Current Setup
```bash
# Check your current project status
pwd  # Should show: /home/jose/nextjs-boilerplate
git remote -v  # Verify GitHub connection
ls -la  # Check project files
```

### Step 2: Install and Configure Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Verify installation
vercel --version

# Login to your Vercel account
vercel login
# This opens a browser window for authentication
# Use the same account that created the Vercel project
```

### Step 3: Initial Vercel Project Linking
```bash
# Navigate to your project directory
cd /home/jose/nextjs-boilerplate

# Link to your existing Vercel project
vercel link
```

**What happens during `vercel link`:**
1. CLI scans for existing Vercel projects in your account
2. You select the correct project (nextjs-boilerplate)
3. Creates a `.vercel` folder with project configuration
4. Establishes connection between local code and Vercel deployment

---

## Understanding `vercel link`

### What is `vercel link`?
The `vercel link` command connects your local project directory to a specific Vercel project in the cloud. It's essentially "pairing" your local development environment with your deployed application.

### Detailed Process:
```bash
# Option 1: Direct linking (recommended)
vercel link --yes

# Option 2: Interactive linking
vercel link
# Then answer "yes" when asked "Link to existing project?"
```

**What happens with `vercel link --yes`:**
- Skips the initial "Set up and deploy?" question
- Automatically links to existing project in your account
- Finds and connects to your `nextjs-boilerplate` project

**If using interactive `vercel link`, you'll see:**
1. **"Set up and deploy?"** → Choose **No** (since project already exists)
2. **"Link to existing project?"** → Choose **Yes**
3. **"What's your project name?"** → Select `nextjs-boilerplate` from the list
4. **"In which directory is your code located?"** → Press Enter (current directory)

### What Gets Created:
```bash
# After successful linking, you'll see:
.vercel/
├── project.json    # Contains project ID and org ID
└── README.txt      # Explanation of the folder

# Check the project.json contents:
cat .vercel/project.json
```

**Example project.json:**
```json
{
  "orgId": "team_abc123...",
  "projectId": "prj_def456..."
}
```

### Why Linking is Important:
✅ **Environment Variables**: Access production env vars with `vercel env pull`  
✅ **Manual Deployments**: Deploy directly from CLI with `vercel --prod=false`  
✅ **Project Management**: View logs, manage settings via CLI  
✅ **Team Coordination**: Ensure all commands target the correct project  

### Who Needs to Link:
- **Jose (You)**: ✅ **Required** - Full project administration
- **Norma**: ❌ **Optional** - Only if using Full Team Access approach
- **Lily**: ❌ **Optional** - Only if using Full Team Access approach

### Troubleshooting `vercel link`:

**Problem: Command cancels after selecting "No" to setup**
```bash
# Solution: Use the --yes flag to skip setup question
vercel link --yes

# This directly links to existing project without asking about setup
```

**Problem: "No projects found"**
```bash
# Solution: Verify you're logged into the correct account
vercel whoami
# If wrong account, logout and login again
vercel logout
vercel login
```

**Problem: "Permission denied"**
```bash
# Solution: Check if you have access to the project
vercel ls
# Should list your projects
```

**Problem: "Project not found"**
```bash
# Solution: Check project name in Vercel dashboard
# Go to vercel.com → Your projects → Copy exact name
```

---

## Environment Variables Management

### Understanding Environment Variables in SaaS Projects

Environment variables store sensitive configuration data like:
- Database connection strings
- API keys (Stripe, SendGrid, Google OAuth)
- Authentication secrets
- Third-party service URLs

### Step 1: Pull Production Environment Variables
```bash
# After vercel link, pull production env vars
vercel env pull .env.local

# This downloads all production environment variables
# and saves them to .env.local (already in .gitignore)
```

**What gets downloaded:**
```bash
# Example .env.local contents after pull:
NEXTAUTH_SECRET=super-secret-production-key-abc123
NEXTAUTH_URL=https://your-app.vercel.app
DATABASE_URL=postgresql://user:pass@db.host:5432/proddb
STRIPE_SECRET_KEY=sk_live_actual_production_key
STRIPE_PUBLISHABLE_KEY=pk_live_actual_production_key
GOOGLE_CLIENT_ID=actual-google-oauth-client-id
GOOGLE_CLIENT_SECRET=actual-google-oauth-secret
SENDGRID_API_KEY=SG.actual-sendgrid-api-key
```

### Step 2: Create Team Environment Template
```bash
# Create a safe template for your team
cp .env.local .env.example

# Edit .env.example to remove sensitive values
nano .env.example
```

**Transform production values to safe templates:**
```bash
# .env.example (safe for Git)
NEXTAUTH_SECRET=your-secret-here-generate-with-openssl-rand-base64-32
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
STRIPE_SECRET_KEY=sk_test_your_test_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_your_test_key_here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
SENDGRID_API_KEY=SG.your-sendgrid-api-key
```

### Step 3: Commit Template to Repository
```bash
# Add the template to Git (safe to commit)
git add .env.example
git commit -m "Add environment variables template for team setup"
git push origin main
```

### Step 4: Set Up Development Environment Variables

Create development/test credentials for local development:

**Database Setup:**
```bash
# Option 1: Local PostgreSQL
# Install PostgreSQL locally or use Docker
docker run --name postgres-dev -e POSTGRES_PASSWORD=devpass -d -p 5432:5432 postgres

# Option 2: Use Vercel Postgres (recommended)
# Go to Vercel Dashboard → Storage → Create Database
# Copy development database URL
```

**API Keys Setup:**
```bash
# Stripe Test Keys:
# Go to stripe.com → Developers → API Keys → Test Data
# Use test keys (sk_test_... and pk_test_...)

# Google OAuth (Development):
# Go to console.cloud.google.com → Create new project
# Enable Google+ API → Create OAuth credentials
# Add http://localhost:3000 to authorized origins

# SendGrid API Key:
# Go to sendgrid.com → Settings → API Keys
# Create new API key with Mail Send permissions
```

### Step 5: Provide Development Credentials to Team

**Create a secure .env.local template for team:**
```bash
# Save this as team-env-template.txt (don't commit to Git)
# Share via secure channel (Signal, encrypted email, etc.)

NEXTAUTH_SECRET=dev-secret-for-local-development
NEXTAUTH_URL=http://localhost:3000
DATABASE_URL=postgresql://devuser:devpass@localhost:5432/marketing_saas_dev
STRIPE_SECRET_KEY=sk_test_51ABC123_development_key
STRIPE_PUBLISHABLE_KEY=pk_test_development_key
GOOGLE_CLIENT_ID=dev-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=dev-google-client-secret
SENDGRID_API_KEY=SG.development-api-key
```

### Environment Variables Security Checklist:

✅ **Production secrets**: Only in Vercel dashboard and your .env.local  
✅ **Development secrets**: Separate test/dev keys for team  
✅ **Template file**: Safe placeholders committed to Git  
✅ **Team sharing**: Use secure channels, not Slack/Discord  
✅ **Documentation**: Clear instructions for team setup  

---

## Team Member Onboarding

### Norma (Frontend/UI) Setup Instructions

**Send Norma this setup guide:**

```markdown
## Norma's Setup Guide

### 1. Clone Repository
```bash
git clone https://github.com/your-team/nextjs-boilerplate.git
cd nextjs-boilerplate
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Install Vercel CLI (for enhanced development)
```bash
npm i -g vercel
```

### 4. Set Up Environment Variables
```bash
# Copy the template
cp .env.example .env.local

# Edit .env.local with development credentials
nano .env.local
# [Paste the development credentials I'll provide separately]
```

### 5. Start Development
```bash
# Option 1: Enhanced development server (recommended)
vercel dev

# Option 2: Basic Next.js server
npm run dev
```

### 6. Verify Setup
- Open http://localhost:3000
- Check that the app loads without errors
- Test any authentication flows
```

### Lily (Features/Integration) Setup Instructions

**Send Lily the same setup guide as Norma, plus:**

```markdown
### Additional Setup for Features/Integration

### Testing Framework Setup
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom

# Create jest.config.js
echo 'module.exports = { testEnvironment: "jsdom" }' > jest.config.js
```

### API Testing Tools
```bash
# Install for API testing
npm install --save-dev supertest

# For email testing
npm install --save-dev nodemailer-mock
```
```

### Team Invitation Process

**GitHub Repository Access:**
1. Go to GitHub.com → Your repository
2. Click **Settings** → **Manage access** → **Invite a collaborator**
3. Add Norma and Lily's GitHub usernames
4. Set permission level to **Write**

**Vercel Project Access (if using Full Team Access):**
1. Go to Vercel Dashboard → Your project
2. Click **Settings** → **Members**
3. Click **Invite Member**
4. Add team members' email addresses
5. Set role to **Developer** (can deploy, view logs)

### Communication Setup

**Create team communication channels:**
```bash
# Recommended tools:
# - Discord server (free, good for development teams)
# - Slack workspace (if school provides)
# - GitHub Discussions (built into your repo)

# Set up daily standup format:
# 1. What did you work on yesterday?
# 2. What will you work on today?
# 3. Any blockers or questions?

# Weekly demo schedule:
# - Every Friday at 4 PM
# - Show progress on preview deployment
# - Plan next week's work
```

---

## GitHub Repository Configuration

### Branch Protection Rules Setup

**Navigate to branch protection:**
1. GitHub.com → Your repository → **Settings** → **Branches**
2. Click **Add rule**
3. Configure as follows:

```bash
Branch name pattern: main

✅ Require a pull request before merging
  ✅ Require approvals: 1
  ✅ Dismiss stale PR approvals when new commits are pushed
  ✅ Require review from code owners

✅ Require status checks to pass before merging
  ✅ Require branches to be up to date before merging

✅ Require conversation resolution before merging

✅ Restrict pushes that create files larger than 100 MB

✅ Include administrators (applies to you too)
```

### Repository Settings Checklist

**General Settings:**
- ✅ Repository visibility: Private (for capstone work)
- ✅ Allow merge commits: Enabled
- ✅ Allow squash merging: Enabled
- ✅ Allow rebase merging: Disabled
- ✅ Automatically delete head branches: Enabled

**Issues and Projects:**
- ✅ Issues: Enabled (for task management)
- ✅ Projects: Enabled (for Kanban board)

**Pages:**
- ❌ Disabled (using Vercel for deployment)

### Create Project Board for Task Management

**Set up GitHub Projects:**
1. Go to your repository → **Projects** → **New project**
2. Choose **Board** template
3. Create columns:
   - **📋 Backlog** (To Do)
   - **🔄 In Progress** (Doing)
   - **👀 Review** (PR Review)
   - **🧪 Testing** (Preview Testing)
   - **✅ Done** (Completed)

**Create initial issues:**
```bash
# Example issues for Week 1:
- [ ] Set up NextAuth.js authentication system
- [ ] Create basic dashboard layout
- [ ] Design landing page wireframes
- [ ] Set up database schema with Prisma
- [ ] Configure Stripe integration
- [ ] Create email template system
```

---

## Deployment Management

### Understanding Deployment Flows

**Automatic Deployments (Primary):**
```bash
# Production deployment
git push origin main → Vercel auto-deploys to production URL

# Preview deployment
Create PR → Vercel auto-creates preview URL
```

**Manual Deployments (Backup/Testing):**
```bash
# Preview deployment (testing)
vercel --prod=false

# Production deployment (emergency)
vercel --prod
```

### Production Deployment Process

**Weekly Production Deployment Schedule:**
```bash
# Recommended: Every Friday after team demo
# 1. Merge approved PRs to main branch
# 2. Vercel automatically deploys to production
# 3. Monitor deployment in Vercel dashboard
# 4. Test production site functionality
# 5. Notify team of successful deployment
```

### Preview Deployment Management

**For each team member's PR:**
```bash
# When team member creates PR:
# 1. Vercel automatically creates preview deployment
# 2. Preview URL appears as comment in PR
# 3. You review both code and live preview
# 4. Test functionality on preview URL
# 5. Approve or request changes
# 6. Merge when ready → Auto-deploys to production
```

### Monitoring and Rollback

**Monitor deployments:**
```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs <deployment-url>

# Check function logs (for API routes)
vercel logs --follow
```

**Emergency rollback:**
```bash
# List recent deployments
vercel ls

# Promote previous deployment to production
vercel promote <previous-deployment-url>
```

### Domain and SSL Management

**Custom Domain Setup (Optional):**
```bash
# In Vercel Dashboard:
# 1. Go to Project → Settings → Domains
# 2. Add custom domain (if you have one)
# 3. Configure DNS settings as shown
# 4. SSL certificate is automatically generated
```

**For Capstone Demo:**
```bash
# Use default Vercel URL: https://nextjs-boilerplate-abc123.vercel.app
# Benefits:
# - HTTPS automatically enabled
# - Global CDN
# - Professional-looking URL for demo
```

---

## Troubleshooting & Team Support

### Common Issues and Solutions

#### 1. Team Member Can't Access Repository
```bash
# Check GitHub permissions
# GitHub → Repository → Settings → Manage access
# Ensure team member is added with "Write" access

# If still having issues:
# Team member should check their GitHub email for invitation
# They need to accept the invitation
```

#### 2. Environment Variables Not Working for Team
```bash
# Verify .env.local setup
ls -la .env.local  # File should exist
cat .env.local     # Check contents (be careful with sensitive data)

# Common fixes:
# 1. Restart development server after changing .env.local
# 2. Check for typos in variable names
# 3. Ensure no spaces around = in KEY=value
# 4. Verify variables are prefixed with NEXT_PUBLIC_ if needed in browser
```

#### 3. Vercel Dev Not Working for Team Members
```bash
# Team members without vercel link can still use vercel dev
# If it doesn't work:

# Option 1: Use basic Next.js dev server
npm run dev

# Option 2: Install Vercel runtime dependencies
npm install @vercel/node

# Option 3: Use npx instead of global install
npx vercel dev
```

#### 4. Git Conflicts and Merge Issues
```bash
# Prevention strategy:
# 1. Always pull latest main before creating feature branch
git checkout main
git pull origin main
git checkout -b feature/new-feature

# 2. Regular commits with clear messages
git add .
git commit -m "Add user authentication form validation"

# 3. Push frequently to backup work
git push origin feature/new-feature
```

#### 5. Preview Deployments Failing
```bash
# Check build logs in Vercel dashboard
# Common issues:
# 1. TypeScript errors
# 2. Missing environment variables
# 3. Import path issues
# 4. Build command failures

# Debug locally:
npm run build  # Test build process locally
```

### Team Support Workflows

#### Daily Support Routine
```bash
# Morning checklist (5 minutes):
# 1. Check for new PRs to review
# 2. Check Vercel dashboard for failed deployments
# 3. Review any GitHub issues or discussions
# 4. Check team communication channels for blockers
```

#### Weekly Team Sync
```bash
# Friday demo preparation:
# 1. Merge approved PRs to main
# 2. Test production deployment
# 3. Prepare demo environment
# 4. Review next week's priorities
# 5. Address any technical debt
```

#### Emergency Support
```bash
# If production is broken:
# 1. Immediately rollback to previous deployment
vercel promote <previous-working-deployment>

# 2. Investigate issue
vercel logs <failed-deployment-url>

# 3. Fix on new branch, test with preview deployment
git checkout -b hotfix/production-issue
# Make fixes...
vercel --prod=false  # Test fix

# 4. Merge fix and redeploy
```

---

## Security Best Practices

### Environment Variables Security

**Production Secrets:**
```bash
# These should ONLY be in Vercel dashboard and your .env.local:
# - Database production URLs
# - Live Stripe keys
# - Production OAuth secrets
# - SendGrid production API key

# Never share production secrets with team members
# Never commit production secrets to Git
# Never post production secrets in team chat
```

**Development Secrets:**
```bash
# Safe to share with team (through secure channels):
# - Test database URLs
# - Stripe test keys
# - Development OAuth credentials
# - SendGrid test API key

# Sharing method:
# 1. Create secure document (Google Doc with restricted access)
# 2. Use encrypted messaging (Signal)
# 3. In-person transfer of credentials
```

### Access Control

**GitHub Repository:**
```bash
# Team member permissions:
# - Norma: Write access (can push, create PRs)
# - Lily: Write access (can push, create PRs)
# - External reviewers: Read access (view only)

# Branch protection ensures:
# - No direct pushes to main
# - All changes go through PR review
# - You maintain control over production
```

**Vercel Project:**
```bash
# Recommended permissions:
# - Jose (You): Owner (full control)
# - Norma: Developer (if using Full Team Access)
# - Lily: Developer (if using Full Team Access)

# For Hybrid approach:
# - Only you have Vercel access
# - Team uses GitHub workflow only
```

### Code Security

**Dependency Management:**
```bash
# Regular security updates
npm audit                    # Check for vulnerabilities
npm audit fix               # Auto-fix issues
npm update                  # Update dependencies

# Monthly security checklist:
# 1. Run npm audit
# 2. Update dependencies
# 3. Review Vercel security settings
# 4. Check for new Next.js security updates
```

**API Security:**
```bash
# API routes security:
# 1. Always validate input data
# 2. Use proper authentication middleware
# 3. Implement rate limiting
# 4. Sanitize database queries
# 5. Use HTTPS only (Vercel enforces this)
```

### Backup and Recovery

**Code Backup:**
```bash
# Automatic backups through Git:
# - GitHub maintains full version history
# - Vercel maintains deployment history
# - Each team member has local clone

# Manual backup (weekly):
git clone --mirror https://github.com/your-team/nextjs-boilerplate.git backup-repo
```

**Database Backup:**
```bash
# For Vercel Postgres:
# - Automatic daily backups (check Vercel dashboard)
# - Point-in-time recovery available

# For external database:
# Set up automated backup scripts
```

**Environment Recovery:**
```bash
# If .env.local is lost:
vercel env pull .env.local  # Restore from Vercel

# If Vercel project connection is lost:
vercel link  # Re-link to project

# If GitHub access is lost:
# Contact GitHub support with repository URL
```

---

## Final Checklist

### Project Lead Responsibilities

**Daily Tasks:**
- [ ] Review and merge team PRs
- [ ] Monitor deployment status
- [ ] Respond to team technical questions
- [ ] Check Vercel dashboard for errors

**Weekly Tasks:**
- [ ] Deploy approved features to production
- [ ] Update project board with new tasks
- [ ] Review team progress and blockers
- [ ] Backup critical data

**Project Milestones:**
- [ ] Week 1: Authentication and basic UI complete
- [ ] Week 3: Core SaaS features functional
- [ ] Week 5: Payment integration working
- [ ] Week 7: Demo-ready application deployed

### Team Success Metrics

**Technical Quality:**
- [ ] All team members can develop locally
- [ ] PRs are reviewed within 24 hours
- [ ] Production deployments are successful
- [ ] No sensitive data in Git history

**Collaboration Effectiveness:**
- [ ] Daily communication established
- [ ] Clear task assignment and tracking
- [ ] Regular demo and feedback sessions
- [ ] Documentation kept up to date

**Capstone Requirements:**
- [ ] Working application with live URL
- [ ] Individual contribution tracking
- [ ] Professional development workflow
- [ ] Comprehensive documentation

---

*This guide is for Jose's administrative reference and contains sensitive setup information. Keep secure and do not commit to Git.*
