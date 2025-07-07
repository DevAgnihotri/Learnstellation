# Backend Deployment Guide for Netlify

## Problem

Netlify only supports frontend deployments and serverless functions. Python FastAPI backends cannot run directly on Netlify.

## Solution: Deploy Backend Separately

### Option 1: Deploy to Heroku (Recommended)

1. **Create Heroku App:**

   ```bash
   heroku create your-app-name-backend
   ```

2. **Create Procfile in root directory:**

   ```
   web: uvicorn src.python-backend.app:app --host 0.0.0.0 --port $PORT
   ```

3. **Create requirements.txt in root directory:**

   ```
   fastapi==0.104.1
   uvicorn==0.24.0
   python-multipart==0.0.6
   PyPDF2==3.0.1
   youtube-transcript-api==0.6.1
   requests==2.31.0
   python-dotenv==1.0.0
   ```

4. **Deploy to Heroku:**

   ```bash
   git add .
   git commit -m "Add backend deployment config"
   heroku git:remote -a your-app-name-backend
   git push heroku main
   ```

5. **Update netlify.toml:**
   Replace `https://your-backend-service.herokuapp.com` with your actual Heroku app URL.

### Option 2: Deploy to Railway

1. **Create Railway Project:**

   - Go to railway.app and create new project
   - Connect your GitHub repository
   - Set start command: `uvicorn src.python-backend.app:app --host 0.0.0.0 --port $PORT`

2. **Set Environment Variables:**

   ```
   PORT=8000
   PYTHONPATH=/app
   ```

3. **Update netlify.toml:**
   Replace `https://your-backend-service.herokuapp.com` with your Railway app URL.

### Option 3: Deploy to Render

1. **Create Render Web Service:**

   - Connect GitHub repository
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `uvicorn src.python-backend.app:app --host 0.0.0.0 --port $PORT`

2. **Update netlify.toml:**
   Replace `https://your-backend-service.herokuapp.com` with your Render app URL.

## Environment Variables

Make sure to set these environment variables in your backend deployment:

```bash
PORT=8000
PYTHONPATH=/app
CORS_ORIGINS=https://your-netlify-app.netlify.app
```

## Frontend Configuration

1. **Update .env.local:**

   ```bash
   NEXT_PUBLIC_BACKEND_URL=https://your-backend-service.herokuapp.com
   ```

2. **Update netlify.toml:**
   - Already configured with backend URL
   - Includes redirects for API calls

## Testing

1. **Test Backend:**

   ```bash
   curl https://your-backend-service.herokuapp.com/
   ```

2. **Test Frontend:**
   - Deploy to Netlify
   - Test PDF upload functionality
   - Verify API calls are working

## Quick Setup Commands

```bash
# 1. Create Procfile
echo "web: uvicorn src.python-backend.app:app --host 0.0.0.0 --port \$PORT" > Procfile

# 2. Create requirements.txt
cat > requirements.txt << EOF
fastapi==0.104.1
uvicorn==0.24.0
python-multipart==0.0.6
PyPDF2==3.0.1
youtube-transcript-api==0.6.1
requests==2.31.0
python-dotenv==1.0.0
EOF

# 3. Create .env.local
echo "NEXT_PUBLIC_BACKEND_URL=https://your-backend-service.herokuapp.com" > .env.local

# 4. Deploy to Heroku
heroku create your-app-name-backend
git add .
git commit -m "Add backend deployment config"
heroku git:remote -a your-app-name-backend
git push heroku main
```

## Important Notes

1. **CORS Configuration:** Make sure your backend allows requests from your Netlify domain
2. **Environment Variables:** Set `NEXT_PUBLIC_BACKEND_URL` in both local and production environments
3. **API Endpoints:** All API calls will be redirected to your backend service
4. **File Uploads:** Ensure your backend service has sufficient storage or use cloud storage

## Troubleshooting

1. **CORS Errors:** Add your Netlify domain to CORS_ORIGINS in backend
2. **502 Bad Gateway:** Check if backend service is running
3. **File Upload Issues:** Verify backend has write permissions and sufficient storage
4. **API Timeout:** Increase timeout settings in fetch calls

## Alternative: Mock Backend Mode

If you want to deploy without backend temporarily, you can create a mock mode:

```typescript
// In your API calls
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "mock";

if (BACKEND_URL === "mock") {
  // Return mock data instead of making API calls
  return mockData;
}
```

This allows the frontend to work without backend for demonstration purposes.
