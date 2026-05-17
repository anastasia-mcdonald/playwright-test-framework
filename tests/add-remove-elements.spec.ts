import { test, expect } from '@playwright/test';

test('should display Delete button after adding element', async ({ page }) => {

  // Open page
  await page.goto('https://the-internet.herokuapp.com/add_remove_elements/');

  // Click button
  await page.getByRole('button', { name: 'Add Element' }).click();

  // Assert Delete button appears
  await expect(
    page.getByRole('button', { name: 'Delete' })
  ).toBeVisible();

});
