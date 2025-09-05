@echo off
REM Clean deployment script for Travel Buddy Bot

echo ========================================
echo Travel Buddy Bot - React Conflict Fixer
echo ========================================

echo.
echo 1. Cleaning npm cache...
npm cache clean --force

echo.
echo 2. Removing package-lock.json...
if exist package-lock.json del package-lock.json

echo.
echo 3. Removing node_modules directory...
if exist node_modules rmdir /s /q node_modules

echo.
echo 4. Installing dependencies with legacy peer deps...
npm install --legacy-peer-deps

echo.
echo 5. Verifying React installation...
npm list react

echo.
echo ========================================
echo Deployment preparation complete!
echo ========================================
echo.
echo Next steps:
echo 1. Commit the changes:
echo    git add package.json package-lock.json
echo    git commit -m "fix: resolve React version conflict for Vercel deployment"
echo    git push origin main
echo.
echo 2. Redeploy on Vercel
echo.
echo 3. Verify that the map and chatbot work correctly
echo.
pause