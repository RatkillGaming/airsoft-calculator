import { test, expect } from '@playwright/test';

test.describe('Visual Tests', () => {
  test('should have modern UI design on login page', async ({ page }) => {
    await page.goto('/');
    
    // Take screenshot
    await expect(page).toHaveScreenshot('login-page.png');
    
    // Check for modern design elements - use more specific selector
    const loginCard = page.locator('.bg-white\\/10.backdrop-blur-lg').first();
    await expect(loginCard).toBeVisible();
    
    // Check gradient background - Next.js uses CSS modules, check computed style instead
    const body = await page.locator('body').evaluate((el) => {
      return window.getComputedStyle(el).backgroundImage;
    });
    expect(body).toContain('gradient');
  });

  test('should have modern UI design on calculator page', async ({ page }) => {
    await page.goto('/');
    
    // Login
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/calculator');
    
    // Take screenshot
    await expect(page).toHaveScreenshot('calculator-page.png');
    
    // Check for modern design elements - use more specific selector
    const calculatorCard = page.locator('.bg-white\\/10.backdrop-blur-lg').first();
    await expect(calculatorCard).toBeVisible();
  });
});
