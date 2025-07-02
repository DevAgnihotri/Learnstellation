@echo off
echo ==========================================
echo    LEARNSTELLATION - QUICK START SCRIPT
echo ==========================================
echo.

echo [1/3] Checking if backend is running...
netstat -an | find "8001" >nul
if %errorlevel%==0 (
    echo ✓ Backend is already running on port 8001
) else (
    echo [2/3] Starting Python backend...
    start "Learnstellation Backend" cmd /c "cd src\python-backend && ..\..\..\.venv\Scripts\uvicorn.exe app:app --reload --host 0.0.0.0 --port 8001"
    timeout /t 3 >nul
    echo ✓ Backend started on http://localhost:8001
)

echo.
echo [3/3] Starting Next.js frontend...
start "Learnstellation Frontend" cmd /c "npm run dev"

echo.
echo ==========================================
echo    🚀 LEARNSTELLATION IS STARTING UP!
echo ==========================================
echo.
echo ✓ Frontend: http://localhost:3001
echo ✓ Backend:  http://localhost:8001
echo ✓ API Docs: http://localhost:8001/docs
echo.
echo Press any key to exit this script...
echo (The servers will continue running in separate windows)
pause >nul
