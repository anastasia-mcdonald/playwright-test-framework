import { test, expect } from '@playwright/test';
import { AddRemoveElementsPage } from '../pages/add-remove-elements.page';

test('should display Delete button after adding element', async ({ page }) => {
  const addRemovePage = new AddRemoveElementsPage(page);

  await addRemovePage.goto();
  await addRemovePage.addElement();

  await expect(addRemovePage.deleteButton).toBeVisible();
});
