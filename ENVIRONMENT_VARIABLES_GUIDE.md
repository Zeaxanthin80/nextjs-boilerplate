# Environment Variables - Team Reference Guide

*A simple guide for understanding and working with environment variables in our Marketing SaaS project*

## 🤔 What Are Environment Variables?

Think of environment variables as **settings** for your app that change depending on where it's running:

- 🏠 **Development** (your laptop): Uses test database, fake payments
- 🏢 **Production** (live website): Uses real database, real payments

**Same code, different settings!**

## 📝 Simple Example

Instead of writing this in your code:
```javascript
// ❌ Bad - hardcoded
const databaseUrl = "postgresql://localhost:5432/myapp";
```

You write this:
```javascript
// ✅ Good - flexible
const databaseUrl = process.env.DATABASE_URL;
```

Now your app can connect to different databases without changing code!

## 🔧 How We Use Them in Our Project

### **In Your Code:**
```javascript
// Get values from environment
const stripeKey = process.env.STRIPE_SECRET_KEY;
const databaseUrl = process.env.DATABASE_URL;
const appName = process.env.NEXT_PUBLIC_APP_NAME;
```

### **In Your .env.local File:**
```bash
# Your local development settings
DATABASE_URL=postgresql://localhost:5432/marketing_saas_dev
STRIPE_SECRET_KEY=sk_test_123abc
NEXT_PUBLIC_APP_NAME=Marketing SaaS
DEBUG=true
```

## 📂 File Structure in Our Project

```
nextjs-boilerplate/
├── .env.local          # Your personal settings (not in Git)
├── .env.example        # Template from Jose (in Git)
└── .gitignore          # Keeps .env.local private
```

## 🚀 Quick Setup for Team Members

### **Step 1: Get the Template**
```bash
# Copy Jose's template
cp .env.example .env.local
```

### **Step 2: Fill in Your Values**
```bash
# Edit .env.local with your development values
DATABASE_URL=postgresql://localhost:5432/your_local_db
STRIPE_SECRET_KEY=sk_test_your_test_key
```

### **Step 3: Start Development**
```bash
# Your app now uses your local settings
npm run dev
# or
vercel dev
```

## 📋 Common Variables in Our Project

### **🔐 Authentication:**
```bash
NEXTAUTH_SECRET=your-secret-here
GOOGLE_CLIENT_ID=your-google-oauth-id
```

### **💾 Database:**
```bash
DATABASE_URL=postgresql://localhost:5432/marketing_saas_dev
```

### **💳 Payments:**
```bash
STRIPE_SECRET_KEY=sk_test_123abc
STRIPE_PUBLISHABLE_KEY=pk_test_456def
```

### **📧 Email:**
```bash
SENDGRID_API_KEY=SG.your_test_key
```

### **🌐 Public Settings:**
```bash
NEXT_PUBLIC_APP_NAME=Marketing SaaS
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## ✅ Naming Rules (Keep It Simple!)

### **✅ Good Names:**
```bash
DATABASE_URL=value
STRIPE_SECRET_KEY=value  
MAX_USERS=100
ENABLE_FEATURES=true
```

### **❌ Avoid These:**
```bash
database url=value        # No spaces
DatabaseUrl=value         # Use UPPERCASE
my-var=value             # No hyphens
```

**Remember: UPPERCASE with UNDERSCORES**

## 🔒 Security Rules

### **✅ Safe to Share:**
```bash
APP_NAME=Marketing SaaS
MAX_UPLOAD_SIZE=10MB
DEBUG=true
```

### **❌ Never Share:**
```bash
DATABASE_PASSWORD=secret123
STRIPE_SECRET_KEY=sk_live_real_money
JWT_SECRET=super-secret
```

## 🛠️ Common Commands

### **View Your Variables:**
```bash
# See what's in your .env.local
cat .env.local

# Check if a variable is loaded
echo $DATABASE_URL
```

### **Add New Variables:**
```bash
# Add to your .env.local file
echo "NEW_FEATURE=enabled" >> .env.local
```

### **Restart After Changes:**
```bash
# Stop your dev server (Ctrl+C) and restart
npm run dev
# Variables are only loaded when the server starts
```

## 🐛 Troubleshooting

### **Problem: "undefined" in console**
```javascript
console.log(process.env.MY_VAR); // Shows "undefined"
```

**Solutions:**
1. Check spelling in `.env.local`
2. Restart your dev server
3. Make sure no spaces around the `=` sign

### **Problem: Can't find .env.local**
```bash
# Check if file exists
ls -la .env.local

# If missing, copy from template
cp .env.example .env.local
```

### **Problem: Changes not working**
```bash
# Always restart after .env changes
# Stop server: Ctrl+C
# Start again: npm run dev
```

## 💡 Pro Tips for Our Team

### **For Norma (Frontend/UI):**
- Focus on `NEXT_PUBLIC_*` variables (these work in components)
- Use for API URLs, app names, feature flags
- These are safe to use in client-side code

### **For Lily (Features/Integration):**
- Focus on API keys and service URLs
- Test with development/sandbox API keys
- Never use production API keys locally

### **When You Need Help:**
1. Check this guide first
2. Ask Jose (he has access to production settings)
3. Check the main `VERCEL_WORKFLOW_GUIDE.md`

## 📚 Quick Reference

| What You Want | How To Do It |
|---------------|--------------|
| Add new variable | Edit `.env.local`, restart server |
| Use in component | `process.env.VARIABLE_NAME` |
| Make public | Prefix with `NEXT_PUBLIC_` |
| Hide from Git | Already in `.gitignore` |
| Get team template | `cp .env.example .env.local` |

---

## 🎯 Remember

- **Environment variables = settings for your app**
- **UPPERCASE_WITH_UNDERSCORES for names**
- **Restart server after changes**
- **Never commit .env.local to Git**
- **Ask Jose for production secrets**

*Happy coding! 🚀*
