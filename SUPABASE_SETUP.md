# 🔐 Supabase Setup Guide for Learnstellation

## Step 1: Create Supabase Account

1. **Visit Supabase**: Go to https://supabase.com/
2. **Sign Up/Login**: Create a free account or sign in with GitHub
3. **Create New Project**: Click the "New Project" button

## Step 2: Project Configuration

Fill in the project details:

- **Organization**: Select your organization (or create one)
- **Project Name**: `learnstellation` (or any name you prefer)
- **Database Password**: Create a strong password (save this!)
- **Region**: Choose the region closest to you
- **Pricing Plan**: Select "Free" for development

Click "Create new project" and wait 2-3 minutes for setup.

## Step 3: Get Your API Keys

1. **Go to Project Settings**:

   - Click on the "Settings" icon (⚙️) in the left sidebar
   - Click on "API" under Project Settings

2. **Copy These Values**:
   - **Project URL**: Something like `https://your-project-id.supabase.co`
   - **anon public key**: A long JWT token starting with `eyJ...`

## Step 4: Configure Environment Variables

1. **Open your `.env` file** in the project root
2. **Replace the placeholder values** with your actual Supabase credentials:

```env
# Replace with your actual Supabase values
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Step 5: Set Up Authentication (Optional)

In your Supabase dashboard:

1. **Go to Authentication** → **Settings**
2. **Configure Site URL**:
   - Add `http://localhost:3001` to allowed redirect URLs
3. **Enable Auth Providers** (optional):
   - Email/Password (enabled by default)
   - Google, GitHub, etc. (if needed)

## Step 6: Set Up Database Schema (Optional)

The app uses Prisma with SQLite locally, but you can also use Supabase Postgres:

1. **Go to Database** → **Tables**
2. **Run SQL** to create any custom tables if needed
3. **Or keep using SQLite** for local development

## Step 7: Restart Your Application

After updating the `.env` file:

1. **Stop the Next.js server** (Ctrl+C in terminal)
2. **Restart it**:
   ```bash
   npm run dev
   ```

## 🔍 Verification

Your application should now work without the Supabase error. You can:

1. **Visit**: http://localhost:3001
2. **Check**: No more Supabase client errors
3. **Test**: Authentication features should work

## 🆘 Troubleshooting

### Common Issues:

1. **"Invalid API key"**: Double-check you copied the anon key correctly
2. **"Invalid URL"**: Ensure the URL includes `https://` and is complete
3. **Still getting errors**: Restart the development server after updating .env

### Where to Find Help:

- **Supabase Docs**: https://supabase.com/docs
- **API Settings**: https://supabase.com/dashboard/project/_/settings/api
- **Authentication Guide**: https://supabase.com/docs/guides/getting-started/quickstarts/nextjs

## 📋 Quick Reference

**Your .env file should look like this:**

```env
# Database
DATABASE_URL="file:./dev.db"

# Backend
NEXT_PUBLIC_BACKEND_URL="http://localhost:8001"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# Development
SKIP_ENV_VALIDATION=true
```

---

**Once you complete these steps, your Learnstellation app will be fully functional! 🚀**
