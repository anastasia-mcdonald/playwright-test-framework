# Playwright Test Framework

A personal project demonstrating automated testing with [Playwright](https://playwright.dev/) and TypeScript. It uses [the-internet.herokuapp.com](https://the-internet.herokuapp.com/) and [JSONPlaceholder](https://jsonplaceholder.typicode.com/) as test targets to showcase test automation patterns and best practices, starting with UI and API testing.

## Why Playwright?

Playwright was chosen because it:

- **Supports all major browsers** — Chromium, Firefox, and WebKit are all configured as test projects in this repo, so the same tests run across browser engines.
- **Auto-waits for elements** — no manual `sleep()` calls or flaky explicit waits; actions automatically wait for elements to be actionable.
- **Has modern, readable selectors** — user-facing locators like `getByRole()` encourage tests that reflect how real users interact with the UI.
- **All-in-one tooling** — built-in test runner, parallel execution, retries, trace viewer, and an HTML report, without needing to stitch together extra tools.
- **Easy to run in CI** — official GitHub Actions setup with browser caching and report artifacts.

## Implemented Features

### Test structure

- **Page Object Model** — locators and actions live in `pages/` (e.g. `AddRemoveElementsPage`, `LoginPage`), keeping test logic separated from UI details.
- **Role-based locators** — elements are found by accessible role and name (`getByRole('button', { name: 'Add Element' })`), which doubles as an accessibility check.
- **Test data module** — credentials and other test data live in `data/`, imported by specs instead of inlined literals.

### Test coverage

- **Add/Remove Elements** — verifies that a Delete button appears after adding an element on the-internet.herokuapp.com.
- **Login** — successful login with valid credentials, rejection with error messages for invalid username or password.
- **Posts API** — GET a post by id, create a post (201), and 404 handling for missing resources, using Playwright's `request` fixture against JSONPlaceholder.

### Test configuration (`playwright.config.ts`)

- Cross-browser projects: Chromium, Firefox, WebKit
- Fully parallel test execution
- Retries enabled on CI only (`retries: process.env.CI ? 2 : 0`)
- Trace collected on first retry for debugging failures
- HTML reporter for test results
- Loads a git-ignored `.env` via `dotenv` for local credentials

### Credentials & secrets

- Credentials are never hardcoded or committed — tests read `process.env` through `data/credentials.ts`
- Missing variables fail fast with a clear error at startup (`requireEnv`)
- Locally: a git-ignored `.env` is loaded via `dotenv` from the config (see Getting Started)
- In CI: passed as GitHub Actions repository secrets (`secrets.TEST_USERNAME`, `secrets.TEST_PASSWORD`) into the workflow

### Continuous integration

- **GitHub Actions workflow** (`.github/workflows/playwright.yml`)
- Runs on every push and pull request to `main`/`master`
- Caches Playwright browser binaries between runs
- Tests against Chromium in CI
- Uploads the HTML report as an artifact (retained 30 days)

## Getting Started

Credentials for the login suite are read from environment variables — create a `.env` file in the repo root with `TEST_USERNAME` and `TEST_PASSWORD` (missing variables fail fast with a clear error):

```dotenv
TEST_USERNAME=your_username
TEST_PASSWORD=your_password
```

```bash
npm install
npm init playwright@latest      # official interactive setup wizard: installs Playwright and browsers, generates config
npx playwright test             # run all tests (all 3 browsers)
npx playwright test ui          # run the UI suite only
npx playwright test api         # run the API suite only
npx playwright test --project=chromium   # single browser
npx playwright show-report      # open the HTML report
npx playwright test --ui        # open UI mode: watch and debug tests interactively
```

## Future Improvements

- Expand UI coverage with form validation scenarios
- Add reusable Playwright fixtures for test data and common setup
- Add accessibility testing
- Add visual regression testing with screenshot comparisons
