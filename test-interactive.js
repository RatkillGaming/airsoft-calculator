/**
 * Interactive Playwright test script
 * Run with: node test-interactive.js
 */

const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting Playwright browser...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    console.log('📱 Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000');
    
    console.log('✅ Checking login page...');
    await page.waitForSelector('h1');
    const title = await page.textContent('h1');
    console.log(`   Found title: ${title}`);
    
    console.log('🔐 Testing login with admin/password...');
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    
    console.log('⏳ Waiting for redirect...');
    await page.waitForURL('**/calculator', { timeout: 5000 });
    console.log('✅ Successfully logged in!');
    
    console.log('🧮 Testing calculator...');
    await page.fill('input[placeholder*="0.20"]', '0.20');
    await page.fill('input[placeholder*="Enter FPS"]', '400');
    
    console.log('⏳ Waiting for calculation...');
    await page.waitForTimeout(1000);
    
    const resultsSection = await page.locator('text=Results').isVisible();
    if (resultsSection) {
      console.log('✅ Calculator results displayed!');
      
      const joules = await page.locator('text=/\\d+\\.\\d+.*J/').first().textContent();
      const fps = await page.locator('text=/\\d+\\.\\d+.*FPS/').first().textContent();
      
      console.log(`   Joules: ${joules}`);
      console.log(`   FPS: ${fps}`);
    }
    
    console.log('🔓 Testing logout...');
    await page.click('button:has-text("Logout")');
    await page.waitForURL('**/', { timeout: 5000 });
    console.log('✅ Successfully logged out!');
    
    console.log('\n✨ All tests passed! Keeping browser open for 10 seconds...');
    await page.waitForTimeout(10000);
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    await page.screenshot({ path: 'test-error.png' });
  } finally {
    await browser.close();
    console.log('👋 Browser closed.');
  }
})();
