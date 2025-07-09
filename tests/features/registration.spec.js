import { test, expect } from '@playwright/test';

test.beforeEach('test', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Admin Page' }).click();
  await page.getByRole('button', { name: 'Clean' }).click();
});

test('Verify user able to register new account', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await page.getByRole('link', { name: 'Register' }).click();
  
  //ARRANGE
  await page.locator('[id="customer.firstName"]').fill('joy');
  await page.locator('[id="customer.lastName"]').fill('plpr');
  await page.locator('[id="customer.address.street"]').fill('patani st.');
  await page.locator('[id="customer.address.city"]').fill('bahay kubo');
  await page.locator('[id="customer.address.state"]').fill('ncr');
  await page.locator('[id="customer.address.zipCode"]').fill('12345');
  await page.locator('[id="customer.phoneNumber"]').fill('12345');
  await page.locator('[id="customer.ssn"]').fill('12345');
  await page.locator('[id="customer.username"]').fill('jplpr10');
  await page.locator('[id="customer.password"]').fill('pass');
  await page.locator('#repeatedPassword').fill('pass');
  
  await page.getByRole('button', { name: 'Register' }).click();

  //ASSERT 
  await expect(page.locator('h1.title')).toBeVisible();
  await expect(page.locator('h1.title')).toContainText('Welcome');
});
