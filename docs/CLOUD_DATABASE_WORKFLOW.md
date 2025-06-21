# Cloud Database Development Workflow

**🌐 How Team Members Interact with the Shared Cloud Database**

This guide explains how Norma, Lily, and Jose collaborate using the shared Prisma Postgres database during development.

## 🎯 **Overview**

When using the **Cloud Database Setup** (Prisma Postgres on Vercel), all team members connect to the **same shared database** while developing on their local machines. This creates a collaborative environment where everyone works with the same data in real-time.

**Prerequisites:** Complete the [Cloud Database Setup Guide](./DATABASE_SETUP_GUIDE.md) first.

---

## 🔄 **How Team Members Connect**

### **Shared Database, Individual Access**

- **Same Database:** Everyone connects to the **same Prisma Postgres database** on Vercel
- **Individual Environment Variables:** Each team member has their **own `.env.local` file** (pulled from Vercel)
- **Real-time Collaboration:** Everyone sees the same data instantly
- **No Local Database:** No PostgreSQL installation required on local machines

### **Initial Environment Setup**

Each team member runs these commands **once** after the database is set up:

```bash
# Get latest code with database schema
git pull origin main

# Install dependencies (includes Prisma Client)
npm install

# Pull database credentials from Vercel
vercel env pull .env.local

# Generate Prisma Client based on current schema
npm run db:generate

# Start development server
npm run dev
```

---

## 💻 **Daily Development Workflow**

### **🌅 Morning Startup**
```bash
# Start your development environment
npm run dev                    # Next.js app (connects to cloud DB)
npm run db:studio             # Optional: Visual database browser
```

### **⚡ During Development**
- **Local Next.js app** runs on your machine (`http://localhost:3000`)
- **API routes and components** connect directly to the **cloud database**
- **Prisma Client** handles all database interactions
- **Real-time data sharing** - see changes made by teammates instantly

### **📊 Visual Database Management**
```bash
npm run db:studio    # Opens Prisma Studio at http://localhost:5555
```

**Prisma Studio allows each team member to:**
- Browse all database tables and records
- Add, edit, or delete test data
- Debug database queries visually
- See real-time changes made by other team members

---

## 👥 **Team Collaboration Examples**

### **Example 1: Norma (Frontend) + Lily (Features)**

**Scenario:** Norma is building the user interface, Lily is working on campaign features.

1. **Norma** creates test users through the registration UI she's building
2. **Lily** immediately sees those users when testing campaign assignment features
3. **Both** can use Prisma Studio to inspect the User and Campaign tables
4. **Jose** can monitor database performance through Vercel dashboard

### **Example 2: Schema Changes**

**When Jose updates the database schema:**

1. **Jose** modifies `prisma/schema.prisma`
2. **Jose** runs migration: `npx prisma migrate dev --name "add-email-templates"`
3. **Jose** commits and pushes changes to Git
4. **Norma & Lily** sync the changes:
   ```bash
   git pull origin main       # Get schema changes
   npm run db:generate       # Update Prisma Client
   # Database is automatically updated (migration already applied)
   ```

---

## 🛠️ **Development vs Production**

| Environment | Database | Purpose | Access |
|-------------|----------|---------|--------|
| **Development** | Shared cloud database | Team collaboration & testing | All team members |
| **Production** | Separate production database | Live application | Automatic via Vercel |

---

## 📝 **Typical API Development**

### **Creating API Routes with Shared Database**

```javascript
// pages/api/users/index.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Create user - all team members will see this data
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
      },
    });
    res.json(user);
  }
  
  if (req.method === 'GET') {
    // Get users - shows data created by all team members
    const users = await prisma.user.findMany();
    res.json(users);
  }
}
```

---

## ⚠️ **Best Practices for Team Collaboration**

### **✅ Do:**
- **Communicate** when creating/deleting important test data
- **Use descriptive names** for test data (e.g., "norma-test-user", "lily-campaign-test")
- **Check Prisma Studio** before deleting data others might be using
- **Pull latest changes** regularly: `git pull origin main`
- **Regenerate Prisma Client** after schema changes: `npm run db:generate`

### **⚠️ Don't:**
- **Don't delete** data without checking with teammates
- **Don't run migrations** (only Jose should do this to avoid conflicts)
- **Don't commit** your `.env.local` file (it contains personal credentials)
- **Don't reset** the database without team agreement

---

## 🎯 **Environment Variables Setup**

Each team member needs their own `.env.local` file:

```bash
# Database connection (pulled from Vercel)
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_TEAM_KEY"

# Other environment variables as needed
NEXTAUTH_SECRET="your-auth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

**Getting your environment variables:**
```bash
vercel env pull .env.local    # Pulls from Vercel project
```

---

## 🚨 **Troubleshooting Common Issues**

### **Issue: "Database connection failed"**
**Solution:**
```bash
vercel env pull .env.local    # Refresh database credentials
npm run db:generate          # Regenerate Prisma Client
```

### **Issue: "Prisma Client out of sync"**
**Solution:**
```bash
git pull origin main         # Get latest schema
npm run db:generate         # Regenerate client
```

### **Issue: "Migration error"**
**Solution:** Ask Jose to handle migrations - team members should not run migrations directly.

---

## 🔄 **Daily Team Sync Process**

### **Morning Checklist:**
1. ✅ `git pull origin main` - Get latest code
2. ✅ `npm run db:generate` - Update Prisma Client if schema changed
3. ✅ `npm run dev` - Start development
4. ✅ `npm run db:studio` - Open database browser (optional)

### **End of Day:**
1. ✅ Commit your code changes
2. ✅ Push to your feature branch
3. ✅ Update team on any test data you've created

---

## 💡 **Key Benefits of This Workflow**

### **🚀 For Development Speed:**
- **No database setup** required for team members
- **Consistent data** across all team members
- **Real-time collaboration** and testing
- **Production-like environment** during development

### **🤝 For Team Collaboration:**
- **Shared test scenarios** - everyone can test with the same data
- **Cross-feature testing** - see how different features interact
- **Easy debugging** - teammates can inspect each other's data
- **Simplified onboarding** - new team members just need to pull environment variables

### **🔧 For Project Management:**
- **Centralized data management** - Jose can monitor and manage from Vercel
- **Automatic backups** and scaling through Vercel
- **Performance monitoring** built into Vercel dashboard
- **Easy deployment** - same database credentials work in production

---

## 📚 **Related Documentation**

- **[Cloud Database Setup Guide](./DATABASE_SETUP_GUIDE.md)** - Initial database setup (Jose only)
- **[Environment Variables Guide](./ENVIRONMENT_VARIABLES_GUIDE.md)** - Managing team environment variables
- **[Project Lead Guide](./PROJECT_LEAD_GUIDE.md)** - Administrative tasks and team management
- **[Vercel Workflow Guide](./VERCEL_WORKFLOW_GUIDE.md)** - Deployment and collaboration workflow

---

**Last Updated:** June 20, 2025 | **Strategy:** ☁️ Cloud Database Development Workflow
