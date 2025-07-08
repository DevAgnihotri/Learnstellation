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
DATABASE_URL=file:./dev.db
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
GOOGLE_GENERATIVE_AI_API_KEY=your_google_ai_api_key
YOUTUBE_SEARCH_API_KEY=your_youtube_api_key
NODE_ENV=production
SKIP_ENV_VALIDATION=true
```

## How to Add to Netlify

1. Go to Netlify dashboard > Site settings > Environment variables
2. For each line above, add as separate variable:
   - Variable name: everything before the `=`
   - Variable value: everything after the `=`
3. Redeploy your site after adding all variables
