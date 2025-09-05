@echo off
REM Clean install script for Travel Buddy Bot (Windows)

echo Cleaning node_modules and package-lock.json...
rmdir /s /q node_modules
del package-lock.json

echo Installing dependencies with React 18.3.1...
npm install

echo Build ready for Vercel deployment!