import { test, expect } from '@playwright/test';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

test.describe('Posts API', () => {
  test('should return a post by id', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/1`);

    expect(response.status()).toBe(200);
    const post = await response.json();
    expect(post.id).toBe(1);
    expect(post.userId).toBe(1);
    expect(post.title).toBeTruthy();
    expect(post.body).toBeTruthy();
  });

  test('should create a new post', async ({ request }) => {
    const newPost = {
      title: 'First API test',
      body: 'Created with the Playwright request fixture',
      userId: 1,
    };

    const response = await request.post(`${BASE_URL}/posts`, { data: newPost });

    expect(response.status()).toBe(201);
    const created = await response.json();
    expect(created).toMatchObject(newPost);
    expect(created.id).toBe(101);
  });

  test('should return 404 for a non-existent post', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts/999`);

    expect(response.status()).toBe(404);
  });
});
