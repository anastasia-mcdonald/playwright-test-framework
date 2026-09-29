import { test, expect } from '../fixtures';
import { invalidUser, validUser } from '../../data/credentials';

test.describe('Login', () => {
  test('should log in with valid credentials', async ({ loginPage }) => {
    await loginPage.login(validUser.username, validUser.password);

    await expect(loginPage.flashMessage).toContainText('You logged into a secure area!');
    await expect(loginPage.logoutLink).toBeVisible();
  });

  test('should reject an invalid username', async ({ loginPage }) => {
    await loginPage.login(invalidUser.username, validUser.password);

    await expect(loginPage.flashMessage).toContainText('Your username is invalid!');
  });

  test('should reject an invalid password', async ({ loginPage }) => {
    await loginPage.login(validUser.username, invalidUser.password);

    await expect(loginPage.flashMessage).toContainText('Your password is invalid!');
  });
});
