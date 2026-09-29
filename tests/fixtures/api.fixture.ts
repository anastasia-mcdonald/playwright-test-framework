import { expect, test as base, type APIRequestContext } from '@playwright/test';

type ApiFixtures = {
  api: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  api: async ({ playwright }, use) => {
    const api = await playwright.request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
    await use(api);
    await api.dispose();
  },
});

export { expect };
