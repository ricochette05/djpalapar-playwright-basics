import {test, expect } from "@playwright/test";

test("Should show add to cart button", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");

  // Check if the "Add to cart" button is visible for the first product
  const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  await expect(addToCartButton).toBeVisible();

  // Optionally, you can also check if the button is enabled
  await expect(addToCartButton).toBeEnabled();
});

test("Swag Labs text should be visible", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");

  // Check if the "Swag Labs" text is visible
  const swagLabsText = page.getByText("Swag Labs");
  await expect(swagLabsText).toBeVisible();
});