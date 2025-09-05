#!/usr/bin/env node

// Script to fix React version conflict for Vercel deployment
const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔧 Fixing React Version Conflict for Vercel Deployment...\n');

try {
  // Check if package.json exists
  if (!fs.existsSync('package.json')) {
    console.error('❌ package.json not found!');
    process.exit(1);
  }

  // Read package.json
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  // Verify React versions in package.json
  const reactVersion = packageJson.dependencies?.react;
  const reactDomVersion = packageJson.dependencies?.['react-dom'];
  
  console.log(`📄 Current React versions in package.json:`);
  console.log(`   react: ${reactVersion}`);
  console.log(`   react-dom: ${reactDomVersion}\n`);
  
  // Check if React versions are already set to 18.3.1
  if (reactVersion === '18.3.1' && reactDomVersion === '18.3.1') {
    console.log('✅ React versions are already set to 18.3.1\n');
  } else {
    console.log('⚠️  Updating React versions to 18.3.1...\n');
    
    // Update React versions
    packageJson.dependencies = packageJson.dependencies || {};
    packageJson.dependencies.react = '18.3.1';
    packageJson.dependencies['react-dom'] = '18.3.1';
    
    // Update devDependencies React types
    if (packageJson.devDependencies) {
      packageJson.devDependencies['@types/react'] = '^18';
      packageJson.devDependencies['@types/react-dom'] = '^18';
    }
    
    // Write updated package.json
    fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json with React 18.3.1\n');
  }
  
  // Clean npm cache
  console.log('🧹 Cleaning npm cache...');
  execSync('npm cache clean --force', { stdio: 'inherit' });
  console.log('✅ npm cache cleaned\n');
  
  // Remove package-lock.json and node_modules if they exist
  console.log('🗑️  Removing package-lock.json and node_modules...');
  
  if (fs.existsSync('package-lock.json')) {
    fs.unlinkSync('package-lock.json');
    console.log('   Removed package-lock.json');
  }
  
  if (fs.existsSync('node_modules')) {
    execSync('rm -rf node_modules', { stdio: 'inherit' });
    console.log('   Removed node_modules');
  }
  
  console.log('✅ Cleaned dependencies\n');
  
  // Install dependencies with legacy peer deps to avoid conflicts
  console.log('📦 Installing dependencies with --legacy-peer-deps...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  console.log('✅ Dependencies installed\n');
  
  // Verify React version
  console.log('🔍 Verifying React installation...');
  const reactList = execSync('npm list react', { encoding: 'utf8' });
  console.log(reactList);
  
  console.log('✅ React version verification complete\n');
  
  // Commit changes
  console.log('📝 Committing changes...');
  try {
    execSync('git add package.json package-lock.json', { stdio: 'inherit' });
    execSync('git commit -m "fix: resolve React version conflict for Vercel deployment"', { stdio: 'inherit' });
    console.log('✅ Changes committed\n');
  } catch (commitError) {
    console.log('⚠️  No changes to commit or git error (this is OK)\n');
  }
  
  console.log('🎉 React version conflict fix complete!');
  console.log('📌 Next steps:');
  console.log('   1. Push changes to your repository');
  console.log('   2. Redeploy on Vercel');
  console.log('   3. Verify that the map and chatbot work correctly\n');
  
} catch (error) {
  console.error('❌ Error fixing React version conflict:', error.message);
  process.exit(1);
}