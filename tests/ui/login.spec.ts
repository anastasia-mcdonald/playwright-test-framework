import { test, expect } from '@playwright/test';
import { invalidUser, validUser } from '../../data/credentials';
import { LoginPage } from '../../pages/login.page';

test.describe('Login', () => {
  test('should log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);

    await expect(loginPage.flashMessage).toContainText('You logged into a secure area!');
    await expect(loginPage.logoutLink).toBeVisible();
  });

  test('should reject an invalid username', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(invalidUser.username, validUser.password);

    await expect(loginPage.flashMessage).toContainText('Your username is invalid!');
  });

  test('should reject an invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(validUser.username, invalidUser.password);

    await expect(loginPage.flashMessage).toContainText('Your password is invalid!');
  });
});
