function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Set it in .env locally or as a repository secret in CI.`
    );
  }
  return value;
}

export const validUser = {
  username: requireEnv('TEST_USERNAME'),
  password: requireEnv('TEST_PASSWORD'),
};

export const invalidUser = {
  username: 'wrong-user',
  password: 'wrong-password',
};
