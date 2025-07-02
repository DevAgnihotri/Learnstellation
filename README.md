# Vibe Learning - AI-Powered Learning Platform 🚀

This is a modern learning platform built with the [T3 Stack](https://create.t3.gg/) featuring AI-powered content generation, PDF processing, and interactive learning experiences.

## ✨ Features

- 🤖 **AI-Powered Learning**: Generate learning content with Google AI
- 📄 **PDF Processing**: Upload and extract content from PDF files
- 🎥 **YouTube Integration**: Extract transcripts from YouTube videos
- 🗺️ **Learning Roadmaps**: Interactive learning paths
- 👤 **User Authentication**: Secure login/signup with Supabase
- 🎨 **Modern UI**: Beautiful interface with Tailwind CSS and Radix UI
- 📱 **Responsive Design**: Works on all devices
- 🌙 **Dark/Light Mode**: Theme switching support

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Backend**: Python FastAPI, Prisma ORM
- **Database**: SQLite (local) / Supabase Postgres (production)
- **Authentication**: Supabase Auth
- **AI**: Google Generative AI
- **Styling**: Tailwind CSS, Radix UI
- **State Management**: tRPC, TanStack Query

## 🚀 Quick Setup Guide

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **Git**

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd vibe-learning-main

# Install Node.js dependencies
npm install

# Install Python dependencies (virtual environment will be created automatically)
# The setup script will handle Python environment setup
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Backend
NEXT_PUBLIC_BACKEND_URL="http://localhost:8001"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"

# Google AI Configuration
GOOGLE_GENERATIVE_AI_API_KEY="your-google-ai-api-key"

# YouTube Data API Configuration (Optional)
YOUTUBE_SEARCH_API_KEY="your-youtube-api-key"

# Development
SKIP_ENV_VALIDATION=true
```

### 3. Get Required API Keys

#### Supabase Setup:

1. Go to [Supabase](https://supabase.com/)
2. Create a new project
3. Get your Project URL and anon key from Settings → API
4. Add them to your `.env` file

#### Google AI Setup:

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an API key
3. Add it to your `.env` file

#### YouTube Data API Setup:

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing one
3. Enable the "YouTube Data API v3"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key and add it to your `.env` file

**Note**: YouTube API is optional - transcript extraction works without it, but you'll miss video search features.

### 4. Database Setup

```bash
# Set up the database schema
npx prisma db push

# Generate Prisma client
npx prisma generate
```

### 5. Start the Applications

#### ⚡ Quick Start (Recommended)

**Start everything with one command:**

```bash
.\start-all.bat
```

This will automatically start both frontend and backend servers!

#### Option A: Use individual startup scripts

**Frontend:**

```bash
npm run dev
```

**Backend:**

```bash
.\start-backend.bat
```

#### Option B: Manual startup

**Frontend:**

```bash
npm run dev
```

**Backend:**

```bash
cd src\python-backend
uvicorn app:app --reload --host 0.0.0.0 --port 8001
```

## 🌐 Access Your Application

Once both servers are running:

- **Main Application**: http://localhost:3001
- **API Documentation**: http://localhost:8001/docs
- **Database Studio**: Run `npx prisma studio`

## 📁 Project Structure

```
vibe-learning-main/
├── src/
│   ├── app/                 # Next.js pages and layouts
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utility functions and configurations
│   ├── server/              # tRPC API routes
│   ├── python-backend/      # Python FastAPI backend
│   └── utils/               # Helper utilities
├── prisma/                  # Database schema and migrations
├── public/                  # Static assets
└── docs/                    # Documentation files
```

## 🔧 Development Commands

```bash
# Start development servers
npm run dev                  # Start Next.js frontend
.\start-backend.bat         # Start Python backend

# Database commands
npx prisma db push          # Apply database changes
npx prisma studio           # Open database browser
npx prisma generate         # Generate Prisma client

# Code quality
npm run lint                # Run ESLint
npm run typecheck           # Run TypeScript checks
npm run format:write        # Format code with Prettier

# Build for production
npm run build               # Build the application
npm start                   # Start production server
```

## 🐛 Troubleshooting

### Common Issues:

1. **Port already in use**: The app will automatically use the next available port (3001, 3002, etc.)

2. **Missing environment variables**: Ensure all required environment variables are set in `.env`

3. **Python backend not starting**: Make sure Python dependencies are installed:

   ```bash
   cd src\python-backend
   pip install -r requirements.txt
   ```

4. **Database errors**: Reset and recreate the database:

   ```bash
   npx prisma db push --force-reset
   ```

5. **Supabase errors**: Verify your Supabase URL and API key are correct

### Getting Help:

- Check the console for error messages
- Ensure all services are running on correct ports
- Verify environment variables are properly set
- Restart both frontend and backend servers

## 📚 API Documentation

The Python backend provides a comprehensive API for:

- PDF file processing
- YouTube transcript extraction
- Content analysis and generation
- File upload and management

Access the interactive API documentation at: http://localhost:8001/docs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

Built with:

- [T3 Stack](https://create.t3.gg/)
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Prisma](https://prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Happy Learning! 🎓✨**

## 📋 Quick Reference & Summary

### 🔑 Required API Keys:

1. **Supabase** (Required):

   - URL: `NEXT_PUBLIC_SUPABASE_URL`
   - Key: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Get from: https://supabase.com/

2. **Google AI** (Required):

   - Key: `GOOGLE_GENERATIVE_AI_API_KEY`
   - Get from: https://makersuite.google.com/app/apikey

3. **YouTube API** (Optional):
   - Key: `YOUTUBE_SEARCH_API_KEY`
   - Get from: https://console.developers.google.com/
   - See: [`YOUTUBE_API_SETUP.md`](YOUTUBE_API_SETUP.md) for detailed setup

### 🚀 Quick Start Commands:

```bash
# Install dependencies
npm install

# Setup database
npx prisma db push

# Start everything at once (EASIEST)
.\start-all.bat

# OR start individually:
npm run dev              # Frontend
.\start-backend.bat     # Backend
```

### 🌐 Your URLs:

- **Main App**: http://localhost:3001
- **API Docs**: http://localhost:8001/docs
- **Database**: `npx prisma studio`

### 📁 Key Files:

- `.env` - Environment variables
- `start-all.bat` - One-command startup
- `SUPABASE_SETUP.md` - Supabase setup guide
- `YOUTUBE_API_SETUP.md` - YouTube API setup guide
