# Deploy Python Backend to Render

## Prerequisites

- GitHub account
- Render account (free tier available)
- Your code pushed to GitHub

## Step-by-Step Deployment Instructions

### 1. Prepare Your Repository

Make sure your `src/python-backend/` directory contains:

- ✅ `app.py` (FastAPI application)
- ✅ `requirements.txt` (Python dependencies)
- ✅ `render.yaml` (Render configuration)
- ✅ All other necessary files

### 2. Push to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Add Render deployment configuration"

# Push to GitHub
git push origin main
```

### 3. Deploy on Render

1. **Go to Render Dashboard**

   - Visit: https://render.com/
   - Sign in with your GitHub account

2. **Create New Web Service**

   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select your repository from the list

3. **Configure Service Settings**

   - **Name**: `vibe-learning-backend`
   - **Environment**: `Python 3`
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `src/python-backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`

4. **Set Environment Variables**

   - Click "Advanced" → "Environment Variables"
   - Add these variables:
     ```
     PYTHON_VERSION=3.11.6
     PORT=10000
     ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - You'll get a URL like: `https://vibe-learning-backend.onrender.com`

### 4. Update Frontend Configuration

Once deployed, update your frontend to use the new backend URL:

1. **Create Environment Variables**

   - In your Next.js project root, create/update `.env.local`:

   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   ```

2. **Update API Calls**
   - Replace `http://localhost:8000` with your Render URL
   - Example: `https://vibe-learning-backend.onrender.com`

### 5. Test Your Deployment

1. **Check Backend Health**

   - Visit: `https://your-backend-url.onrender.com/health`
   - Should return: `{"status": "healthy"}`

2. **Test API Endpoints**
   - Upload endpoint: `POST /upload`
   - Content endpoint: `GET /content/{content_id}`

## Important Notes

- **Free Tier Limitations**: Render free tier sleeps after 15 minutes of inactivity
- **Cold Starts**: First request after sleep may take 30-60 seconds
- **File Storage**: Files uploaded to Render are temporary and will be deleted on restart
- **Logs**: Check Render dashboard for deployment logs and runtime logs

## Troubleshooting

### Common Issues:

1. **Build Fails**

   - Check `requirements.txt` for correct package versions
   - Verify Python version compatibility

2. **App Won't Start**

   - Check logs in Render dashboard
   - Verify `app.py` runs locally first

3. **CORS Issues**

   - Update CORS origins in `app.py` to include your Netlify URL

4. **Environment Variables**
   - Verify all required environment variables are set
   - Check variable names for typos

## Next Steps

1. Deploy backend to Render following these steps
2. Update frontend environment variables
3. Deploy frontend to Netlify
4. Test full application workflow

## Support

If you encounter issues:

- Check Render's documentation: https://render.com/docs
- Review deployment logs in Render dashboard
- Verify all file paths and configurations
