# 🔥 Firebase Setup Guide for Learnstellation

## Step 1: Create Firebase Project

1. **Visit Firebase Console**: Go to https://console.firebase.google.com/
2. **Create New Project**: Click "Create a project"
3. **Project Name**: Enter "Learnstellation" (or any name you prefer)
4. **Google Analytics**: Enable or disable as needed
5. **Create Project**: Wait for setup to complete

## Step 2: Set Up Authentication

1. **Go to Authentication** in the left sidebar
2. **Get Started** → **Sign-in method**
3. **Enable Email/Password**:
   - Click on "Email/Password"
   - Enable the first option (Email/Password)
   - Save

## Step 3: Set Up Firestore Database

1. **Go to Firestore Database** in the left sidebar
2. **Create database**
3. **Start in production mode** (recommended)
4. **Choose location** closest to you
5. **Done**

## Step 4: Get Your Firebase Config

1. **Go to Project Settings** (gear icon) → **General**
2. **Scroll down** to "Your apps"
3. **Add web app** (</> icon):
   - App nickname: "Learnstellation Web"
   - Don't check "Firebase Hosting"
   - Register app
4. **Copy the config object** (looks like this):

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef...",
};
```

## Step 5: Update Environment Variables

Replace the Firebase values in your `.env` file:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef..."
```

## Step 6: Set Up Firestore Security Rules (IMPORTANT)

**⚠️ This step is crucial to avoid "missing data" errors during signup!**

1. **Go to Firestore Database** → **Rules**
2. **Replace the default rules** with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can create and read their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Allow all authenticated users to read and write to other collections
    // You can customize these rules based on your specific needs
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. **Publish** the rules by clicking "Publish"

**📝 Note**: The default Firestore rules deny all access, which causes signup failures. These rules allow authenticated users to create their own user documents.

## Step 7: Restart Your Application

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

## 🔍 Verification

1. **Visit**: http://localhost:3001
2. **Try signing up**: Create a new account
3. **Check Firebase Console**:
   - Go to Authentication → Users (should see your new user)
   - Go to Firestore Database → Data (should see user document)

## 🆘 Troubleshooting

### Common Issues:

1. **"Missing data" error during signup**:

   - This usually means Firestore security rules are blocking the write operation
   - Make sure you've completed Step 6 (Firestore Security Rules)
   - Check that the rules allow authenticated users to write to the `users` collection

2. **"Firebase app not initialized"**:

   - Check that all environment variables are set correctly in `.env`
   - Restart your development server after changing environment variables

3. **"Auth domain not authorized"**:

   - Go to Authentication → Settings → Authorized domains
   - Add `localhost` for local development
   - Add your production domain when deploying

4. **"Permission denied"**:

   - Check Firestore security rules in the Firebase Console
   - Make sure rules allow the specific operation you're trying to perform

5. **Google Sign-In not working**:
   - Enable Google provider in Authentication → Sign-in method
   - Add authorized domains for your environment

### Firebase Console Links:

- **Authentication**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/users
- **Firestore**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/data
- **Project Settings**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/settings/general

---

**Once you complete these steps, your Learnstellation app will use Firebase for authentication! 🚀**
