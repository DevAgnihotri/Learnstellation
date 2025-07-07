@echo off
echo ==========================================
echo    LEARNSTELLATION - QUICK START SCRIPT
echo ==========================================
echo.

echo [1/7] Stopping any existing processes...
echo Killing existing Next.js processes...
taskkill /f /im node.exe >nul 2>&1
taskkill /f /im "next-server" >nul 2>&1

echo Killing existing Python/Uvicorn processes...
taskkill /f /im python.exe >nul 2>&1
taskkill /f /im uvicorn.exe >nul 2>&1

echo Killing processes on ports 3000 and 8001...
for /f "tokens=5" %%a in ('netstat -aon ^| find ":3000"') do taskkill /f /pid %%a >nul 2>&1
for /f "tokens=5" %%a in ('netstat -aon ^| find ":8001"') do taskkill /f /pid %%a >nul 2>&1

timeout /t 2 >nul
echo ✓ Cleaned up existing processes

echo.
echo [2/7] Checking dependencies...
if not exist "node_modules\" (
    echo Installing Node.js dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install Node.js dependencies
        pause
        exit /b 1
    )
) else (
    echo ✓ Node.js dependencies are installed
)

if not exist ".venv\Scripts\uvicorn.exe" (
    echo ❌ Python virtual environment not found or uvicorn not installed
    echo Please run: python -m venv .venv && .venv\Scripts\activate && pip install -r src\python-backend\requirements.txt
    pause
    exit /b 1
) else (
    echo ✓ Python virtual environment is ready
)

echo.
echo [3/7] Checking if backend is running...
netstat -an | find "8001" >nul
if %errorlevel%==0 (
    echo ✓ Backend is already running on port 8001
) else (
    echo [4/7] Starting Python backend...
    start "Learnstellation Backend" cmd /c "cd /d "%~dp0src\python-backend" && ..\..\..\.venv\Scripts\activate && ..\..\..\.venv\Scripts\uvicorn.exe app:app --reload --host 0.0.0.0 --port 8001"
    timeout /t 5 >nul
    echo ✓ Backend started on http://localhost:8001
)

echo.
echo [5/7] Checking if frontend is running...
netstat -an | find "3000" >nul
if %errorlevel%==0 (
    echo ✓ Frontend is already running on port 3000
) else (
    echo [6/7] Starting Next.js frontend...
    start "Learnstellation Frontend" cmd /c "cd /d "%~dp0" && npm run dev"
    timeout /t 3 >nul
    echo ✓ Frontend started on http://localhost:3000
)

echo.
echo ==========================================
echo    🚀 LEARNSTELLATION IS STARTING UP!
echo ==========================================
echo.
echo [7/7] Final verification...
timeout /t 3 >nul

echo Checking backend health...
curl -s http://localhost:8001/docs >nul 2>&1
if %errorlevel%==0 (
    echo ✓ Backend is responding at http://localhost:8001
) else (
    echo ⚠ Backend may still be starting up...
)

echo Checking frontend health...
curl -s http://localhost:3000 >nul 2>&1
if %errorlevel%==0 (
    echo ✓ Frontend is responding at http://localhost:3000
) else (
    echo ⚠ Frontend may still be starting up...
)

echo.
echo ==========================================
echo    🎉 LEARNSTELLATION IS READY!
echo ==========================================
echo.
echo ✓ Frontend: http://localhost:3000
echo ✓ Backend:  http://localhost:8001
echo ✓ API Docs: http://localhost:8001/docs
echo.
echo Both services are running in separate windows.
echo You can close this window - the servers will keep running.
echo.
echo Press any key to exit this script...
echo (The servers will continue running in separate windows)
pause >nul
