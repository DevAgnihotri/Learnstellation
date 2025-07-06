# Learnstellation - Setup Complete! 🎉

Your Learnstellation application has been successfully set up on your PC! Here's everything you need to know:

## 🚀 What's Running

### Frontend (Next.js)

- **URL**: http://localhost:3001
- **Port**: 3001 (automatically switched from 3000 which was in use)
- **Status**: ✅ Running

### Backend (Python FastAPI)

- **URL**: http://localhost:8001
- **API Documentation**: http://localhost:8001/docs
- **Port**: 8001
- **Status**: ✅ Running

### Database

- **Type**: SQLite (for easy local development)
- **File**: `./dev.db`
- **Status**: ✅ Set up and ready

## 🎯 How to Use

1. **Open your browser** and go to: http://localhost:3001
2. **Explore the app** - this is your learning platform!
3. **API Documentation** is available at: http://localhost:8001/docs

## 🔧 Development Commands

### To start the applications:

**Frontend (Next.js):**

```bash
cd "d:\PROJECTS\Hackathon\Student\learnstellation"
npm run dev
```

**Backend (Python):**

```bash
cd "d:\PROJECTS\Hackathon\Student\learnstellation"
.\start-backend.bat
```

Or manually:

```bash
cd "d:\PROJECTS\Hackathon\Student\learnstellation\src\python-backend"
D:\PROJECTS\Hackathon\Student\learnstellation\.venv\Scripts\uvicorn.exe app:app --reload --host 0.0.0.0 --port 8001
```

### Other useful commands:

**View database:**

```bash
npx prisma studio
```

**Reset database:**

```bash
npx prisma db push --force-reset
```

## 📁 Project Structure

- `src/app/` - Next.js pages and components
- `src/components/` - Reusable UI components
- `src/python-backend/` - Python FastAPI backend
- `prisma/` - Database schema
- `.env` - Environment variables

## 🔧 Environment Configuration

The following environment variables are configured:

- `DATABASE_URL`: SQLite database connection
- `NEXT_PUBLIC_BACKEND_URL`: Python backend URL (http://localhost:8001)
- `SKIP_ENV_VALIDATION`: Set to true for development

## 🎉 Features Available

Your Learnstellation app includes:

- **Modern UI** with Tailwind CSS and Radix UI components
- **Database integration** with Prisma ORM
- **File upload capabilities** (PDF processing)
- **YouTube transcript extraction**
- **AI-powered learning features**
- **Responsive design**
- **Dark/Light theme support**

## 🛠️ Troubleshooting

If something stops working:

1. **Check if both servers are running**
2. **Restart the services**:
   - Frontend: Ctrl+C in the Next.js terminal, then `npm run dev`
   - Backend: Ctrl+C in the Python terminal, then `.\start-backend.bat`

## 🎯 Next Steps

1. **Customize** the application to your needs
2. **Add content** to your learning platform
3. **Explore** the API endpoints at http://localhost:8001/docs
4. **Develop** new features using the existing structure

## 📞 Support

If you need help:

1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify the correct ports are being used

**Happy Learning! 🚀📚**

---

_Setup completed on: ${new Date().toLocaleDateString()}_
