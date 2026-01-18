/**
 * Simple Playwright test - opens browser and tests the app
 * Make sure dev server is running: npm run dev
 * Then run: node test-simple.js
 */

const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Launching browser...');
  const browser = await chromium.launch({ 
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('📱 Navigating to http://localhost:3000');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Test 1: Check login page
    console.log('\n✅ Test 1: Login page loaded');
    const title = await page.locator('h1').textContent();
    console.log(`   Title: ${title}`);
    
    // Test 2: Invalid login
    console.log('\n🔐 Test 2: Testing invalid login');
    await page.fill('input[type="text"]', 'wrong');
    await page.fill('input[type="password"]', 'wrong');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
    const errorVisible = await page.locator('text=Invalid username or password').isVisible();
    console.log(`   Error shown: ${errorVisible ? '✅' : '❌'}`);
    
    // Test 3: Valid login
    console.log('\n🔐 Test 3: Testing valid login (admin/password)');
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/calculator', { timeout: 5000 });
    console.log('   ✅ Successfully logged in!');
    
    // Test 4: Calculator - Joules from FPS
    console.log('\n🧮 Test 4: Calculating joules from FPS');
    await page.fill('input[placeholder*="0.20"]', '0.20');
    await page.fill('input[placeholder*="Enter FPS"]', '400');
    await page.waitForTimeout(1000);
    
    const resultsVisible = await page.locator('text=Results').isVisible();
    if (resultsVisible) {
      const joules = await page.locator('text=/\\d+\\.\\d+.*J/').first().textContent();
      const fps = await page.locator('text=/\\d+\\.\\d+.*FPS/').first().textContent();
      console.log(`   ✅ Results displayed:`);
      console.log(`      ${joules}`);
      console.log(`      ${fps}`);
    } else {
      console.log('   ❌ Results not displayed');
    }
    
    // Test 5: Calculator - FPS from Joules
    console.log('\n🧮 Test 5: Calculating FPS from Joules');
    await page.fill('input[placeholder*="0.20"]', '0.25');
    await page.fill('input[placeholder*="Enter joules"]', '1.5');
    await page.waitForTimeout(1000);
    
    const fpsResult = await page.locator('text=/\\d+\\.\\d+.*FPS/').first().textContent();
    if (fpsResult) {
      console.log(`   ✅ FPS calculated: ${fpsResult}`);
    }
    
    // Test 6: Logout
    console.log('\n🔓 Test 6: Testing logout');
    await page.click('button:has-text("Logout")');
    await page.waitForURL('**/', { timeout: 5000 });
    console.log('   ✅ Successfully logged out!');
    
    console.log('\n✨ All tests completed! Browser will stay open for 15 seconds...');
    await page.waitForTimeout(15000);
    
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    await page.screenshot({ path: 'test-error.png', fullPage: true });
    console.log('   Screenshot saved to test-error.png');
  } finally {
    await browser.close();
    console.log('\n👋 Browser closed. Tests complete!');
  }
})();
