import { test, expect } from '@playwright/test';

test.describe('Airsoft Calculator Application', () => {
  test('should display login page initially', async ({ page }) => {
    await page.goto('/');
    
    // Check for login form elements
    await expect(page.locator('h1')).toContainText('Airsoft Calculator');
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show error on invalid login', async ({ page }) => {
    await page.goto('/');
    
    // Try invalid credentials
    await page.fill('input[type="text"]', 'wrong');
    await page.fill('input[type="password"]', 'wrong');
    await page.click('button[type="submit"]');
    
    // Should show error message
    await expect(page.locator('text=Invalid username or password')).toBeVisible();
  });

  test('should login successfully with admin/password', async ({ page }) => {
    await page.goto('/');
    
    // Login with correct credentials
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    
    // Should redirect to calculator page
    await expect(page).toHaveURL('/calculator');
    await expect(page.locator('h1')).toContainText('Airsoft Calculator');
  });

  test('should calculate joules from FPS and BB weight', async ({ page }) => {
    await page.goto('/');
    
    // Login first
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    
    // Wait for calculator page
    await expect(page).toHaveURL('/calculator');
    
    // Enter BB weight (0.20g) first - clear and type to trigger onChange
    const weightInput = page.locator('input[placeholder*="0.20"]');
    await weightInput.clear();
    await weightInput.type('0.20', { delay: 50 });
    
    // Enter FPS (400) - this should trigger calculation
    const fpsInput = page.locator('input[placeholder*="Enter FPS"]');
    await fpsInput.clear();
    await fpsInput.type('400', { delay: 50 });
    
    // Wait for calculation to complete - wait for results section
    await expect(page.locator('h3:has-text("Results")')).toBeVisible({ timeout: 5000 });
    
    // Verify joules calculation (should be approximately 1.48J for 0.20g @ 400fps)
    // Look for the Energy section within Results
    const resultsSection = page.locator('h3:has-text("Results")').locator('..');
    await expect(resultsSection.locator('text=Energy')).toBeVisible();
    await expect(resultsSection.locator('text=Velocity')).toBeVisible();
    
    // Check that joules value is displayed (number with J)
    const joulesValue = resultsSection.locator('text=/\\d+\\.\\d+.*J/').first();
    await expect(joulesValue).toBeVisible();
    
    // Check that FPS value is displayed
    const fpsValue = resultsSection.locator('text=/\\d+\\.\\d+.*FPS/').first();
    await expect(fpsValue).toBeVisible();
  });

  test('should calculate FPS from joules and BB weight', async ({ page }) => {
    await page.goto('/');
    
    // Login first
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    
    // Wait for calculator page
    await expect(page).toHaveURL('/calculator');
    
    // Enter BB weight and joules
    await page.fill('input[placeholder*="0.20"]', '0.25');
    await page.fill('input[placeholder*="Enter joules"]', '1.5');
    
    // Wait for calculation
    await page.waitForTimeout(500);
    
    // Check that FPS is calculated
    await expect(page.locator('text=Results')).toBeVisible();
    const fpsText = await page.locator('text=/\\d+\\.\\d+.*FPS/').first().textContent();
    expect(fpsText).toBeTruthy();
  });

  test('should logout successfully', async ({ page }) => {
    await page.goto('/');
    
    // Login first
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    
    // Wait for calculator page
    await expect(page).toHaveURL('/calculator');
    
    // Click logout
    await page.click('button:has-text("Logout")');
    
    // Should redirect back to login
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Airsoft Calculator');
  });

  test('should prevent access to calculator without login', async ({ page }) => {
    // Try to access calculator directly without login
    await page.goto('/calculator');
    
    // Should redirect to login page
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Airsoft Calculator');
  });
});
