/**
 * Playwright Test Runner - Visible Mode
 * Run with: node run-tests-visible.js
 * 
 * This script runs all tests with visible browser so you can watch them execute
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting Playwright tests in visible mode...\n');
console.log('📱 Browser windows will open so you can watch the tests execute\n');
console.log('⏸️  Tests will run slower so you can see what\'s happening\n');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

// Run Playwright with headed mode and slower execution
const playwrightTest = spawn('npx', [
  'playwright',
  'test',
  '--project=chromium',
  '--headed',           // Show browser
  '--workers=1',        // Run one test at a time
  '--timeout=30000',    // Longer timeout
], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true
});

playwrightTest.on('close', (code) => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  if (code === 0) {
    console.log('✅ All tests completed successfully!');
  } else {
    console.log(`❌ Tests completed with exit code ${code}`);
  }
  console.log('\n💡 Tip: Check test-results/ folder for screenshots and details');
  process.exit(code);
});

playwrightTest.on('error', (error) => {
  console.error('❌ Error running tests:', error);
  process.exit(1);
});
