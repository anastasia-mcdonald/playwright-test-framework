import { expect, test as base } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { validUser } from '../../data/credentials';

type AuthFixtures = {
  loginPage: LoginPage;
  loggedInPage: LoginPage;
};

export const test = base.extend<AuthFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validUser.username, validUser.password);
    await expect(loginPage.flashMessage).toContainText('You logged into a secure area!');
    await use(loginPage);
  },
});

export { expect };
