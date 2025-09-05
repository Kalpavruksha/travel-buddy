#!/bin/bash
# Clean install script for Travel Buddy Bot

echo "Cleaning node_modules and package-lock.json..."
rm -rf node_modules package-lock.json

echo "Installing dependencies with React 18.3.1..."
npm install

echo "Build ready for Vercel deployment!"