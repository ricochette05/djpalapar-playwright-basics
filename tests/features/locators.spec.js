import { test, expect } from '@playwright/test';


test('Verify locators available in Swag labs dashboard', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');


    //Act login in the dashboard
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();   

    //Assert different locators available in the dashboard
    await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Sauce Labs Backpack' })).toBeVisible();
    await page.getByText('carry.allTheThings() with the').click();
    

});