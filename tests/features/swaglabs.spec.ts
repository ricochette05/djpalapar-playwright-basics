import { test, expect } from '@playwright/test';

test('Verify login with valid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Verify the heading is visible
  await expect(page.getByRole('heading', { name: 'Accepted usernames are:' })).toBeVisible();

  // Fill in valid credentials and login
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Assert that the login was successful
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  await expect(page.getByText('Swag Labs')).toBeVisible();

  // Take a full-page screenshot after successful login
  await page.screenshot({ path: 'test-screenshots/successful-login.png', fullPage: true });
});

test('Verify login fails with invalid credentials', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Fill in invalid credentials and attempt to login
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('wrong_password');
  await page.locator('[data-test="login-button"]').click();

  // Verify error message is displayed
  await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
});
