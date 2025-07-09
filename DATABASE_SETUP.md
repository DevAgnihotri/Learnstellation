# Database Configuration for Netlify

## Issue
The roadmap save/load functionality fails on Netlify because:
1. SQLite requires local file system access
2. Netlify is serverless and doesn't persist files between builds
3. No DATABASE_URL environment variable is properly configured

## Current Solution (Demo Mode)
- Added demo mode detection using `NEXT_PUBLIC_DEMO_MODE="true"`
- When in demo mode, database operations return mock data instead of failing
- Roadmap generation still works, but save/load is simulated

## Production Solutions

### Option 1: Use Vercel Postgres (Recommended)
```bash
# 1. Deploy to Vercel instead of Netlify
# 2. Add Vercel Postgres database
# 3. Update environment variables:
DATABASE_URL="postgres://..."
```

### Option 2: Use PlanetScale MySQL
```bash
# 1. Create PlanetScale database
# 2. Update prisma/schema.prisma:
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
# 3. Set environment variable:
DATABASE_URL="mysql://..."
```

### Option 3: Use Supabase PostgreSQL
```bash
# 1. Create Supabase project
# 2. Update prisma/schema.prisma:
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
# 3. Set environment variable:
DATABASE_URL="postgresql://..."
```

### Option 4: Use Netlify Edge Functions + External DB
```bash
# 1. Move database operations to edge functions
# 2. Use external database service
# 3. Configure environment variables in Netlify dashboard
```

## Files Modified for Demo Mode
- `src/server/api/routers/roadmap.ts` - Added demo mode checks
- `src/server/db.ts` - Added error handling for database connection
- `netlify.toml` - Added basic DATABASE_URL

## Environment Variables Needed
```env
DATABASE_URL="your-database-connection-string"
NEXT_PUBLIC_DEMO_MODE="false"  # Set to false when using real database
```
