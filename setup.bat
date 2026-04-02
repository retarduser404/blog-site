@echo off
REM CyberLog - Project Setup Script for Windows
REM This script automates the installation and setup process

echo ╔════════════════════════════════════════╗
echo ║      CyberLog - Setup Script           ║
echo ║  Initializing Blog Application...      ║
echo ╚════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    echo    Download from: https://nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i

echo ✅ Node.js found: %NODE_VERSION%
echo ✅ NPM found: %NPM_VERSION%
echo.

REM Setup Backend
echo 📦 Setting up Backend...
cd server
echo    Installing server dependencies...
call npm install >nul 2>&1

if exist ".env" (
    echo    ✅ .env file already exists
) else (
    echo    📝 Creating .env file...
    (
        echo MONGO_URI=mongodb://localhost:27017/blog-app
        echo JWT_SECRET=your_jwt_secret_key_change_this_in_production
        echo PORT=5000
        echo NODE_ENV=development
    ) > .env
    echo    ✅ .env created (update MONGO_URI if needed^)
)

cd ..
echo ✅ Backend setup complete!
echo.

REM Setup Frontend
echo 📦 Setting up Frontend...
cd client
echo    Installing client dependencies...
call npm install >nul 2>&1

if exist ".env" (
    echo    ✅ .env file already exists
) else (
    echo    📝 Creating .env file...
    (
        echo REACT_APP_API_URL=http://localhost:5000/api
    ) > .env
    echo    ✅ .env created
)

cd ..
echo ✅ Frontend setup complete!
echo.

echo ╔════════════════════════════════════════╗
echo ║      Setup Complete! ✅                 ║
echo ╚════════════════════════════════════════╝
echo.
echo 🚀 Next Steps:
echo.
echo 1. Start MongoDB:
echo    - Ensure MongoDB is running on localhost:27017
echo    - Or update MONGO_URI in server\.env
echo.
echo 2. Open PowerShell/CMD windows:
echo.
echo    Window 1 - Start Backend:
echo    ^> cd server
echo    ^> npm run dev
echo.
echo    Window 2 - Start Frontend:
echo    ^> cd client
echo    ^> npm start
echo.
echo 📖 Documentation:
echo    - README.md for full documentation
echo    - QUICKSTART.md for quick setup guide
echo.
echo 🎨 Default Theme: Olive Cybersecurity Terminal
echo 📊 Admin Panel: Available after login as admin
echo.
pause
