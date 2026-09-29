import { expect, mergeTests } from '@playwright/test';
import { test as apiTest } from './api.fixture';
import { test as authTest } from './auth.fixture';

export const test = mergeTests(authTest, apiTest);

export { expect };
