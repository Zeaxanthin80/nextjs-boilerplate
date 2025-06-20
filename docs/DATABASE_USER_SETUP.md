# Database Setup Instructions for Team

## Overview
- **Same database** for all team members: `nextjs_boilerplate_dev`
- **Individual user credentials** for security and audit trails
- **Two environment templates**: One for Jose (project lead), one for team members

## Setup Steps

### 1. Run the Database Setup Script (Jose only)
```bash
# Connect to PostgreSQL as admin user
psql -U postgres

# Run the setup script
\i setup_database_users.sql
```

### 2. Environment Setup

#### For Jose (Project Lead):
```bash
cp .env.jose.example .env.local
# Credentials are already configured with admin access
```

#### For Team Members (Norma & Lily):
```bash
cp .env.example .env.local
# Replace YOUR_USERNAME and YOUR_PASSWORD with credentials Jose sends via email
```

### 3. Credential Distribution (Jose)
1. Check `TEAM_CREDENTIALS.md` for team member credentials
2. Send credentials via secure email using the templates provided
3. **Never commit TEAM_CREDENTIALS.md to GitHub** (it's in .gitignore)

### 4. Team Member Setup
1. Receive credentials via email from Jose
2. Copy `.env.example` to `.env.local`
3. Replace placeholders with your credentials:
   ```bash
   # Change this:
   DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/nextjs_boilerplate_dev"
   
   # To this (example for Norma):
   DATABASE_URL="postgresql://norma_dev:norma_secure_pass_456@localhost:5432/nextjs_boilerplate_dev"
   ```

## File Structure
```
├── .env.example          # Template for team members (Norma & Lily)
├── .env.jose.example     # Template for Jose (project lead)
├── TEAM_CREDENTIALS.md   # Credentials file (NOT committed to Git)
├── setup_database_users.sql  # Database setup script
└── .env.local           # Your personal environment file (NOT committed)
```

## Security Benefits
- ✅ **Individual accountability**: Each user has unique credentials
- ✅ **Shared database**: All work on same data, no sync issues
- ✅ **Secure distribution**: Credentials sent via email, not stored in Git
- ✅ **Access control**: Different permission levels possible
- ✅ **Audit trails**: Database logs show which user made changes

## Troubleshooting
- Make sure PostgreSQL is running
- Verify your credentials are correct
- Check that the database `nextjs_boilerplate_dev` exists
- Ensure your user has proper permissions
