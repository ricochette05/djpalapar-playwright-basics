import { test, expect } from '@playwright/test';

// test.beforeEach('test', async ({ page }) => {
//   await page.goto('https://parabank.parasoft.com/parabank/index.htm');
//   await page.getByRole('link', { name: 'Admin Page' }).click();
//   await page.getByRole('button', { name: 'Clean' }).click();
// });

test('Verify user able to register new account', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();
  
  //Define unique username
  const uniqueUsername = `joy${Date.now()}`;

    //Fill in the registration form with valid data
    await page.locator('[id="customer.firstName"]').fill('Joy')
    await page.locator('[id="customer.lastName"]').fill('Doe')
    await page.locator('[id="customer.address.street"]').fill('123 Main St')
    await page.locator('[id="customer.address.city"]').fill('Springfield')
    await page.locator('[id="customer.address.state"]').fill('IL')
    await page.locator('[id="customer.address.zipCode"]').fill('62701')
    await page.locator('[id="customer.phoneNumber"]').fill('555-1234')
    await page.locator('[id="customer.ssn"]').fill('123-45-6789')
    await page.locator('[id="customer.username"]').fill(uniqueUsername)
    await page.locator('[id="customer.password"]').fill('password123')
    await page.locator('[id="repeatedPassword"]').fill('password123')

    //Click Register button
    await page.getByRole('button', { name: 'Register' }).click()

    //Verify successful registration message
    await expect(page.locator('.title')).toHaveText(/Welcome/)
});
