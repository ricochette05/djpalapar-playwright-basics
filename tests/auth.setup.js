import { expect, test as setup } from '@playwright/test';
import { STORAGE_STATE } from '../playwright.config';

setup('Do login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

    // Fill in the login form with environment variables
    await page.locator('[data-test="username"]').fill(process.env.SAUCE_USERNAME);
    await page.locator('[data-test="password"]').fill(process.env.SAUCE_PASSWORD);
    // Click the login button
    await page.locator('[data-test="login-button"]').click();
    //login succesfully
    await expect(page.getByText('Swag Labs')).toBeVisible();

  //Code Snippet to save the storage state
  // This will save the authentication state to the specified file
  await page.context().storageState({ path: STORAGE_STATE });
});