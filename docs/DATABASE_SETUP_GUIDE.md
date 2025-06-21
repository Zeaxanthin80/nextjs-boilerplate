# Database Setup Guide - Cloud Database (Prisma Postgres)

> **⚠️ Important:** This guide is for setting up a **cloud-hosted database** on Vercel. If your team wants individual local PostgreSQL setups instead, use the [Database User Setup Guide](./DATABASE_USER_SETUP.md) instead.

## Overview
This guide walks you through setting up **Prisma Postgres** (cloud database) for your Marketing SaaS application. This approach provides:
- ☁️ **Shared cloud database** - all team members connect to the same database
- 🚀 **No local PostgreSQL required** - database runs on Vercel's infrastructure  
- 🔄 **Real-time collaboration** - all team members see the same data
- 🔗 **Integrated with Vercel** - seamless deployment and environment management

**Prerequisites:** Complete the [Project Lead Guide](./PROJECT_LEAD_GUIDE.md) first for Vercel account setup.

## Table of Contents
1. [Create Database in Vercel](#1-create-database-in-vercel)
2. [Install Prisma](#2-install-prisma)
3. [Initialize Prisma](#3-initialize-prisma)
4. [Configure Database Connection](#4-configure-database-connection)
5. [Create Marketing SaaS Schema](#5-create-marketing-saas-schema)
6. [Generate Prisma Client](#6-generate-prisma-client)
7. [Run First Migration](#7-run-first-migration)
8. [Verify Setup](#8-verify-setup)
9. [Team Sync Instructions](#9-team-sync-instructions)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Create Database in Vercel

### Step 1.1: Navigate to Database Creation
1. In your Vercel dashboard, click **"Prisma Postgres"**
2. Choose a database name: `marketing-saas-db` (or similar)
3. Select region: **US East 1** (or closest to your team)
4. Click **"Create Database"**

### Step 1.2: Get Connection Details
After creation, Vercel will show you:
- Database URL
- Direct connection URL
- Connection pooling URL

**⚠️ Important:** Copy these URLs - you'll need them for environment variables. See the [Environment Variables Guide](./ENVIRONMENT_VARIABLES_GUIDE.md) for details on how to use these URLs.

---

## 2. Install Prisma

### Step 2.1: Install Prisma Packages
```bash
# Install Prisma CLI and Client
npm install prisma @prisma/client

# Install Prisma CLI globally (optional but recommended)
npm install -g prisma
```

### Step 2.2: Verify Installation
```bash
npx prisma --version
```
You should see Prisma version information.

---

## 3. Initialize Prisma

### Step 3.1: Initialize Prisma in Your Project
```bash
npx prisma init
```

This creates:
- `prisma/schema.prisma` - Database schema file
- `.env` file (if it doesn't exist) - Environment variables

### Step 3.2: Verify Prisma Files
Check that these files were created:
```
prisma/
  schema.prisma
.env (or .env.local)
```

---

## 4. Configure Database Connection

### Step 4.1: Update Environment Variables
Open your `.env.local` file and add your database connection:

```env
# Database
DATABASE_URL="your-prisma-postgres-connection-url"
DIRECT_URL="your-direct-connection-url"
```

**💡 Tip:** If you already ran `vercel env pull .env.local`, these might already be there!

### Step 4.2: Update Prisma Schema
Edit `prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

---

## 5. Create Marketing SaaS Schema

### Step 5.1: Define Your Data Models
Replace the content in `prisma/schema.prisma` with your marketing SaaS schema:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// User Management
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      UserRole @default(USER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  accounts    Account[]
  campaigns   Campaign[]
  
  @@map("users")
}

model Account {
  id        String   @id @default(cuid())
  name      String
  plan      PlanType @default(FREE)
  ownerId   String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  owner     User       @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  campaigns Campaign[]
  
  @@map("accounts")
}

// Campaign Management
model Campaign {
  id          String        @id @default(cuid())
  name        String
  description String?
  status      CampaignStatus @default(DRAFT)
  budget      Float?
  startDate   DateTime?
  endDate     DateTime?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  // Relations
  accountId   String
  creatorId   String
  account     Account @relation(fields: [accountId], references: [id], onDelete: Cascade)
  creator     User    @relation(fields: [creatorId], references: [id])
  analytics   Analytics[]
  
  @@map("campaigns")
}

// Analytics
model Analytics {
  id         String   @id @default(cuid())
  campaignId String
  date       DateTime @default(now())
  
  // Metrics
  impressions Int @default(0)
  clicks      Int @default(0)
  conversions Int @default(0)
  cost        Float @default(0)
  
  // Relations
  campaign Campaign @relation(fields: [campaignId], references: [id], onDelete: Cascade)
  
  @@map("analytics")
}

// Enums
enum UserRole {
  USER
  ADMIN
  SUPER_ADMIN
}

enum PlanType {
  FREE
  STARTER
  PRO
  ENTERPRISE
}

enum CampaignStatus {
  DRAFT
  ACTIVE
  PAUSED
  COMPLETED
  ARCHIVED
}
```

---

## 6. Generate Prisma Client

### Step 6.1: Generate the Client
```bash
npx prisma generate
```

This creates the Prisma Client based on your schema.

### Step 6.2: Add Generation Script
Update your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio"
  }
}
```

---

## 7. Run First Migration

### Step 7.1: Create and Apply Migration
```bash
npx prisma migrate dev --name init
```

This will:
1. Create a migration file
2. Apply it to your database
3. Generate Prisma Client

### Step 7.2: Verify Migration
Check that the migration was created:
```
prisma/
  migrations/
    20240605123456_init/
      migration.sql
```

---

## 8. Verify Setup

### Step 8.1: Open Prisma Studio
```bash
npx prisma studio
```

This opens a visual database browser at `http://localhost:5555`

### Step 8.2: Test Database Connection
Create a simple test file `test-db.js`:

```javascript
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Testing database connection...')
  
  // Test connection
  await prisma.$connect()
  console.log('✅ Database connected successfully!')
  
  // Test query
  const userCount = await prisma.user.count()
  console.log(`📊 Current users in database: ${userCount}`)
}

main()
  .catch((e) => {
    console.error('❌ Database connection failed:', e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

Run the test:
```bash
node test-db.js
```

---

## 9. Team Sync Instructions

### For Jose (Project Lead):
✅ **You're all set!** Database is configured and ready.

### For Norma (Frontend/UI):
1. **Pull latest code:** `git pull origin main`
2. **Install dependencies:** `npm install`
3. **Pull environment variables:** `vercel env pull .env.local`
4. **Generate Prisma Client:** `npm run db:generate`

### For Lily (Features/Integration):
1. **Pull latest code:** `git pull origin main`
2. **Install dependencies:** `npm install`
3. **Pull environment variables:** `vercel env pull .env.local`
4. **Generate Prisma Client:** `npm run db:generate`

### Shared Team Commands:
```bash
# Start development with database
npm run dev

# View database visually
npm run db:studio

# Apply schema changes
npm run db:push

# Create new migration
npm run db:migrate
```

---

## 10. Troubleshooting

### Common Issues:

#### Issue: "Environment variable not found: DATABASE_URL"
**Solution:**
```bash
vercel env pull .env.local
```

#### Issue: "Client not generated"
**Solution:**
```bash
npx prisma generate
```

#### Issue: "Migration failed"
**Solution:**
```bash
npx prisma migrate reset
npx prisma migrate dev --name init
```

#### Issue: "Can't reach database server"
**Solutions:**
1. Check your DATABASE_URL in `.env.local`
2. Verify database is running in Vercel dashboard
3. Check network connection

### Getting Help:
- **Prisma Docs:** https://www.prisma.io/docs
- **Prisma Discord:** https://pris.ly/discord
- **Team Channel:** Ask Jose, Norma, or Lily for help!

---

## Next Steps After Setup

1. **Create your first API route** using Prisma Client
2. **Set up authentication** (NextAuth.js recommended)
3. **Build user registration/login flows**
4. **Create campaign management features**
5. **Add analytics dashboard**

---

## ✅ SETUP COMPLETE STATUS 

**Database Status:** ✅ **READY FOR DEVELOPMENT**

**What's Working:**
- ✅ Prisma Postgres database connected (`marketing-saas-db`)
- ✅ Marketing SaaS schema deployed (Users, Accounts, Campaigns, Analytics)
- ✅ Prisma Client generated and working
- ✅ Test data created successfully
- ✅ Prisma Studio running at http://localhost:5555

**Test Results:** All database operations tested and working:
- User creation ✅
- Account management ✅  
- Campaign creation ✅
- Analytics tracking ✅

**Next Steps for Team:**
1. **Jose:** Share this guide with Norma and Lily
2. **All Team Members:** Run `npm install` and `npm run db:generate`
3. **Start Development:** Begin building API routes and UI components

---

**🎉 Congratulations!** Your database is now set up and ready for your marketing SaaS application development!
