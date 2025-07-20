import { test, expect } from '@playwright/test';

test('Verify the following error message when clicking Register button with empty fields', async ({ page }) => {

    //Navigate to system
    await page.goto('https://parabank.parasoft.com/parabank/register.htm')

    //Click Register button
    await page.getByRole('link', { name: 'Register'}).click()

    //Click Register CTA
    await page.getByRole('button', { name: 'Register'}).click() 

    //Verify error message
    await expect(page.locator(('[id="customer.firstName.errors"]'))).toBeVisible()
    
    //id="customer.ssn.errors"
    await expect(page.locator('[id="customer.ssn.errors"]')).toContainText('Social Security Number is required.');

});

test('Verify that the user can register with valid data', async ({ page }) => {
    //Navigate to system
    await page.goto('https://parabank.parasoft.com/parabank/register.htm')

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