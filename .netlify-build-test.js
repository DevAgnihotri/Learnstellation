#!/usr/bin/env node

// Test script to verify Netlify build compatibility
console.log('🔍 Testing Netlify build configuration...');
console.log('Node version:', process.version);
console.log('Environment variables:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- DISABLE_TURBOPACK:', process.env.DISABLE_TURBOPACK);
console.log('- CSS_MINIMIZE:', process.env.CSS_MINIMIZE);

// Check if Tailwind CSS imports are working
try {
  const fs = require('fs');
  const path = require('path');
  
  const globalsCssPath = path.join(__dirname, 'src', 'styles', 'globals.css');
  const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
  
  if (globalsCss.includes('@import "tailwindcss"')) {
    console.log('✅ Tailwind CSS import found in globals.css');
  } else {
    console.log('❌ Tailwind CSS import not found in globals.css');
  }
  
  const layoutPath = path.join(__dirname, 'src', 'app', 'layout.tsx');
  const layout = fs.readFileSync(layoutPath, 'utf8');
  
  if (layout.includes('~/styles/globals.css')) {
    console.log('✅ globals.css import found in layout.tsx');
  } else {
    console.log('❌ globals.css import not found in layout.tsx');
  }
  
  console.log('🎉 Build configuration test complete!');
} catch (error) {
  console.error('❌ Test failed:', error.message);
}
