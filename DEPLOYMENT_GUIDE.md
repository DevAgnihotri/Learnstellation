# 🚀 Deployment Guide

This project has two parts that need to be deployed separately:

## 📱 Frontend (Next.js) - Deploy to Netlify

### Step 1: Deploy to Netlify

1. Push your code to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will automatically detect this is a Next.js app
4. Deploy settings are already configured in `netlify.toml`

### Step 2: Environment Variables on Netlify

Set these environment variables in your Netlify dashboard:

```
NEXT_PUBLIC_BACKEND_URL=https://your-python-backend.herokuapp.com
NEXT_PUBLIC_DEMO_MODE=true
SKIP_ENV_VALIDATION=false
```

## 🐍 Backend (Python FastAPI) - Deploy to Heroku

### Step 1: Deploy Python Backend to Heroku

1. Create a new Heroku app: `heroku create your-app-name`
2. Add the backend files to a separate Git repository OR use git subtree:

```bash
# Method 1: Create separate repo for backend
cd src/python-backend
git init
git add .
git commit -m "Initial backend commit"
heroku git:remote -a your-app-name
git push heroku master
```

```bash
# Method 2: Deploy subfolder (recommended)
git subtree push --prefix=src/python-backend heroku master
```

### Step 2: Backend Environment Variables on Heroku

Set these on your Heroku app:

```
CORS_ORIGINS=https://your-netlify-app.netlify.app
UPLOAD_FOLDER=/tmp/uploads
```

### Step 3: Update Frontend URL

After backend deployment, update the `NEXT_PUBLIC_BACKEND_URL` in Netlify to point to your Heroku app:

```
NEXT_PUBLIC_BACKEND_URL=https://your-backend-app.herokuapp.com
```

## 🔄 Alternative: Deploy Backend to Railway/Render

### Railway (Recommended for Python):

1. Connect your GitHub repo to Railway
2. Select the `src/python-backend` folder as the root
3. Railway will auto-detect it's a Python app
4. Set environment variables in Railway dashboard

### Render:

1. Create a new Web Service on Render
2. Connect your GitHub repo
3. Set root directory to `src/python-backend`
4. Build command: `pip install -r requirements.txt`
5. Start command: `python app.py`

## 🎯 Final Steps

1. **Test the deployment**: Visit your Netlify app URL
2. **Check backend connectivity**: Try uploading a PDF
3. **Enable demo mode**: If backend is down, the app will work in demo mode
4. **Update documentation**: Update README with live URLs

## 🛠️ Troubleshooting

- **Netlify build fails**: Check that Python files are ignored in `.netlifyignore`
- **Backend not responding**: Ensure CORS is properly configured
- **File uploads failing**: Check Heroku ephemeral storage limitations

## 📝 Live URLs (Update these after deployment)

- **Frontend**: https://your-app.netlify.app
- **Backend**: https://your-backend.herokuapp.com
- **Health Check**: https://your-backend.herokuapp.com/health
