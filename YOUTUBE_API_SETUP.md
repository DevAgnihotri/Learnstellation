# 🎥 YouTube Data API v3 Setup Guide

## Overview

Your Vibe Learning app can search YouTube for educational videos to enhance learning roadmaps. This requires the YouTube Data API v3.

## 🚀 Quick Setup Steps

### Step 1: Go to Google Cloud Console

1. Visit: https://console.developers.google.com/
2. Sign in with your Google account

### Step 2: Create or Select a Project

**Option A: Create New Project**

1. Click "Create Project"
2. Enter project name: `vibe-learning-youtube` (or any name)
3. Click "Create"

**Option B: Use Existing Project**

1. Select your existing project from the dropdown

### Step 3: Enable YouTube Data API v3

1. In the left sidebar, click "Library"
2. Search for "YouTube Data API v3"
3. Click on "YouTube Data API v3"
4. Click the "Enable" button
5. Wait for activation (takes 1-2 minutes)

### Step 4: Create API Credentials

1. Go to "Credentials" in the left sidebar
2. Click "+ Create Credentials"
3. Select "API Key"
4. Your API key will be generated automatically
5. Copy the API key (starts with `AIza...`)

### Step 5: Secure Your API Key (Recommended)

1. Click on your newly created API key
2. Under "API restrictions":
   - Select "Restrict key"
   - Check "YouTube Data API v3"
3. Under "Application restrictions":
- For web apps, choose **"HTTP referrers"**
    - Add: `http://localhost:3001/*` (for local development)
    - Add your production domain, e.g., `https://yourdomain.com/*`
    - Avoid using wildcards like `*` alone, as Google may reject them
- For server apps, choose **"IP addresses"** and add your server's IP
- For mobile apps, choose **"Android apps"** or **"iOS apps"** as appropriate
4. Click "Save"

### Step 6: Add to Environment Variables

Add your YouTube API key to your `.env` file:

```env
# YouTube Data API v3 Configuration
YOUTUBE_SEARCH_API_KEY="AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz"
```

### Step 7: Restart Your App

```bash
# Stop your development server (Ctrl+C)
# Then restart using:
.\start-all.bat
```

## 🔍 Verification

Test if YouTube integration works:

1. Open your app: http://localhost:3001
2. Go to the learning roadmap feature
3. Create a new roadmap
4. Check if YouTube videos appear in resources

## 📊 API Quotas & Limits

**Free Tier:**

- **10,000 quota units per day**
- Search costs: 100 units per request
- **~100 searches per day for free**

**Usage Tips:**

- YouTube API is optional - transcript extraction still works without it
- The app will gracefully handle missing API key
- Consider upgrading if you need more searches

## 🛠️ Troubleshooting

### Common Issues:

1. **"YouTube API key not found"**

   - Ensure `YOUTUBE_SEARCH_API_KEY` is in your `.env` file
   - Restart your development server

2. **"API key not valid"**

   - Check if YouTube Data API v3 is enabled
   - Verify API key is copied correctly

3. **"Quota exceeded"**

   - You've reached the daily limit (10,000 units)
   - Wait until tomorrow or upgrade to paid plan

4. **"Access restricted"**
   - Check API key restrictions in Google Cloud Console
   - Ensure `localhost` is allowed in HTTP referrers

### Testing Your API Key:

Test your API key directly:

```bash
curl "https://www.googleapis.com/youtube/v3/search?part=snippet&q=javascript+tutorial&type=video&key=YOUR_API_KEY"
```

## 💰 Pricing Information

- **Free**: 10,000 quota units/day
- **Paid**: $0.20 per 10,000 additional units
- Most educational apps stay within free limits

## 🔗 Useful Links

- **Google Cloud Console**: https://console.developers.google.com/
- **YouTube API Documentation**: https://developers.google.com/youtube/v3
- **API Explorer**: https://developers.google.com/youtube/v3/docs/search/list
- **Pricing Details**: https://developers.google.com/youtube/v3/determine_quota_cost

---

**Note**: YouTube transcript extraction works without this API - this is only for video search functionality!
