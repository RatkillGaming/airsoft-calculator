/**
 * Interactive Playwright Test Runner
 * Run with: node run-tests-interactive.js
 * 
 * This script runs tests one by one with visible browser and pauses between tests
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Test configurations
const tests = [
  {
    name: '1. Display Login Page',
    run: async (page) => {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      // Clear any existing auth state after page loads
      await page.evaluate(() => localStorage.removeItem('authenticated'));
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForSelector('h1', { timeout: 5000 });
      const title = await page.textContent('h1');
      console.log(`   ✅ Found title: ${title}`);
      return true;
    }
  },
  {
    name: '2. Invalid Login Test',
    run: async (page) => {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      // Clear any existing auth state after page loads
      await page.evaluate(() => localStorage.removeItem('authenticated'));
      await page.reload({ waitUntil: 'networkidle' });
      
      // Wait for login form
      await page.waitForSelector('input[type="text"]', { timeout: 5000 });
      await page.fill('input[type="text"]', 'wrong');
      await page.fill('input[type="password"]', 'wrong');
      await page.click('button[type="submit"]');
      await page.waitForTimeout(500);
      const errorVisible = await page.locator('text=Invalid username or password').isVisible();
      console.log(`   ${errorVisible ? '✅' : '❌'} Error message displayed: ${errorVisible}`);
      return errorVisible;
    }
  },
  {
    name: '3. Valid Login Test',
    run: async (page) => {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      // Clear any existing auth state after page loads
      await page.evaluate(() => localStorage.removeItem('authenticated'));
      await page.reload({ waitUntil: 'networkidle' });
      
      // Wait for login form
      await page.waitForSelector('input[type="text"]', { timeout: 5000 });
      await page.fill('input[type="text"]', 'admin');
      await page.fill('input[type="password"]', 'password');
      await page.click('button[type="submit"]');
      await page.waitForURL('**/calculator', { timeout: 5000 });
      console.log('   ✅ Successfully logged in!');
      return true;
    }
  },
  {
    name: '4. Calculate Joules from FPS',
    run: async (page) => {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      // Clear any existing auth state after page loads
      await page.evaluate(() => localStorage.removeItem('authenticated'));
      await page.reload({ waitUntil: 'networkidle' });
      
      // Wait for login form
      await page.waitForSelector('input[type="text"]', { timeout: 5000 });
      await page.fill('input[type="text"]', 'admin');
      await page.fill('input[type="password"]', 'password');
      await page.click('button[type="submit"]');
      await page.waitForURL('**/calculator', { timeout: 5000 });
      
      // Wait for calculator page to load
      await page.waitForSelector('input[placeholder*="0.20"]', { timeout: 5000 });
      
      const weightInput = page.locator('input[placeholder*="0.20"]');
      await weightInput.clear();
      await weightInput.type('0.20', { delay: 100 });
      
      const fpsInput = page.locator('input[placeholder*="Enter FPS"]');
      await fpsInput.clear();
      await fpsInput.type('400', { delay: 100 });
      
      // Wait for calculation - wait for results to appear
      await page.waitForSelector('h3:has-text("Results")', { timeout: 5000 });
      
      const resultsVisible = await page.locator('h3:has-text("Results")').isVisible();
      if (resultsVisible) {
        const joulesText = await page.locator('text=/\\d+\\.\\d+.*J/').first().textContent();
        console.log(`   ✅ Results displayed: ${joulesText}`);
        return true;
      }
      return false;
    }
  },
  {
    name: '5. Calculate FPS from Joules',
    run: async (page) => {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      // Clear any existing auth state after page loads
      await page.evaluate(() => localStorage.removeItem('authenticated'));
      await page.reload({ waitUntil: 'networkidle' });
      
      // Wait for login form
      await page.waitForSelector('input[type="text"]', { timeout: 5000 });
      await page.fill('input[type="text"]', 'admin');
      await page.fill('input[type="password"]', 'password');
      await page.click('button[type="submit"]');
      await page.waitForURL('**/calculator', { timeout: 5000 });
      
      // Wait for calculator page to load
      await page.waitForSelector('input[placeholder*="0.20"]', { timeout: 5000 });
      
      const weightInput = page.locator('input[placeholder*="0.20"]');
      await weightInput.clear();
      await weightInput.type('0.25', { delay: 100 });
      
      const joulesInput = page.locator('input[placeholder*="Enter joules"]');
      await joulesInput.clear();
      await joulesInput.type('1.5', { delay: 100 });
      
      // Wait for calculation - wait for results to appear
      await page.waitForSelector('h3:has-text("Results")', { timeout: 5000 });
      
      const fpsValue = await page.locator('text=/\\d+\\.\\d+.*FPS/').first().textContent();
      if (fpsValue) {
        console.log(`   ✅ FPS calculated: ${fpsValue}`);
        return true;
      }
      return false;
    }
  },
  {
    name: '6. Logout Test',
    run: async (page) => {
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      // Clear any existing auth state after page loads
      await page.evaluate(() => localStorage.removeItem('authenticated'));
      await page.reload({ waitUntil: 'networkidle' });
      
      // Wait for login form
      await page.waitForSelector('input[type="text"]', { timeout: 5000 });
      await page.fill('input[type="text"]', 'admin');
      await page.fill('input[type="password"]', 'password');
      await page.click('button[type="submit"]');
      await page.waitForURL('**/calculator', { timeout: 5000 });
      
      // Wait for logout button
      await page.waitForSelector('button:has-text("Logout")', { timeout: 5000 });
      await page.click('button:has-text("Logout")');
      await page.waitForURL('**/', { timeout: 5000 });
      
      // Verify we're back on login page
      const isLoginPage = await page.locator('input[type="text"]').isVisible();
      if (isLoginPage) {
        console.log('   ✅ Successfully logged out!');
        return true;
      }
      return false;
    }
  },
  {
    name: '7. Protected Route Test',
    run: async (page) => {
      // Clear any existing auth state first by going to login page
      await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
      await page.evaluate(() => localStorage.removeItem('authenticated'));
      
      // Try to access protected route
      await page.goto('http://localhost:3000/calculator', { waitUntil: 'networkidle' });
      
      // Should redirect to login page
      await page.waitForURL('**/', { timeout: 5000 });
      
      // Verify we're on login page
      await page.waitForSelector('input[type="text"]', { timeout: 5000 });
      const isLoginPage = await page.locator('input[type="text"]').isVisible();
      console.log(`   ${isLoginPage ? '✅' : '❌'} Redirected to login: ${isLoginPage}`);
      return isLoginPage;
    }
  }
];

async function runTests() {
  console.log('🚀 Starting Interactive Playwright Tests\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('📱 Make sure your dev server is running: npm run dev\n');
  console.log('⏸️  Browser will stay open between tests so you can observe\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  // Check if server is running (simple check - will fail gracefully if not)
  console.log('💡 Note: Make sure dev server is running on http://localhost:3000\n');
  console.log('   If tests fail to connect, start server with: npm run dev\n');

  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 500, // Slow down actions by 500ms so you can see them
    args: ['--start-maximized']
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();

  let passed = 0;
  let failed = 0;

  for (let i = 0; i < tests.length; i++) {
    const test = tests[i];
    console.log(`\n🧪 Running: ${test.name}`);
    console.log('   ⏳ Executing...');
    
    try {
      const result = await test.run(page);
      if (result) {
        passed++;
        console.log(`   ✅ PASSED`);
      } else {
        failed++;
        console.log(`   ❌ FAILED`);
      }
    } catch (error) {
      failed++;
      console.log(`   ❌ FAILED: ${error.message}`);
      await page.screenshot({ path: `test-error-${i + 1}.png`, fullPage: true });
    }

    // Pause between tests (except last one)
    if (i < tests.length - 1) {
      console.log('   ⏸️  Pausing 3 seconds before next test...');
      await page.waitForTimeout(3000);
    }
  }

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`\n📊 Test Results:`);
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📈 Total:  ${tests.length}`);
  console.log('\n⏸️  Browser will stay open for 10 seconds...');
  await page.waitForTimeout(10000);

  await browser.close();
  console.log('👋 Browser closed. Tests complete!\n');
}

// Handle fetch for Node.js < 18
if (typeof fetch === 'undefined') {
  const { default: fetch } = require('node-fetch');
  global.fetch = fetch;
}

runTests().catch(console.error);
