# Environment Variables for Netlify Deployment

## Complete List - Copy and Paste These

```
NEXT_PUBLIC_BACKEND_URL=https://learnstellation.onrender.com
NEXT_PUBLIC_DEMO_MODE=true
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCgQZXDs5vtyVsJwpI_z6J32KcTPt2Gqp4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=guideancey.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=guideancey
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=guideancey.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1019356921556
NEXT_PUBLIC_FIREBASE_APP_ID=1:1019356921556:web:801ad6d597c56ec7ce4541
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-NLGC044CWZ
DATABASE_URL=postgres://dummy:dummy@localhost:5432/dummy
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSyBdgraS7QQbGeHkr0hiJGjirDJS28XEiHk
YOUTUBE_SEARCH_API_KEY=AIzaSyCiYq_M2TqMPsquoAhO7ezV3TrSU907W7Y
NODE_ENV=production
SKIP_ENV_VALIDATION=true
```

## How to Add to Netlify

1. Go to Netlify dashboard > Site settings > Environment variables
2. For each line above, add as separate variable:
   - Variable name: everything before the `=`
   - Variable value: everything after the `=`
3. Redeploy your site after adding all variables

## ⚠️ Important Database Note

**SQLite doesn't work on Netlify!** The `DATABASE_URL=file:./dev.db` will cause errors in production.

**Quick Fix:** Update your Netlify `DATABASE_URL` to:
```
DATABASE_URL=postgres://dummy:dummy@localhost:5432/dummy
```

**Better Solution:** Set up a free cloud database:
- **Supabase**: https://supabase.com (free tier)
- **PlanetScale**: https://planetscale.com (free tier)
- **Neon**: https://neon.tech (free tier)

Then update your DATABASE_URL with the real connection string.
