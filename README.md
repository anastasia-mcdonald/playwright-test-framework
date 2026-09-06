# Playwright Test Framework

A personal project demonstrating automated testing with [Playwright](https://playwright.dev/) and TypeScript. It uses [the-internet.herokuapp.com](https://the-internet.herokuapp.com/) as a test target to showcase test automation patterns and best practices, starting with UI testing like dynamically added and removed elements.

## Why Playwright?

Playwright was chosen because it:

- **Supports all major browsers** — Chromium, Firefox, and WebKit are all configured as test projects in this repo, so the same tests run across browser engines.
- **Auto-waits for elements** — no manual `sleep()` calls or flaky explicit waits; actions automatically wait for elements to be actionable.
- **Has modern, readable selectors** — user-facing locators like `getByRole()` encourage tests that reflect how real users interact with the UI.
- **All-in-one tooling** — built-in test runner, parallel execution, retries, trace viewer, and an HTML report, without needing to stitch together extra tools.
- **Easy to run in CI** — official GitHub Actions setup with browser caching and report artifacts.

## Implemented Features

### Test structure

- **Page Object Model** — locators and actions live in `pages/` (e.g. `AddRemoveElementsPage`), keeping test logic separated from UI details.
- **Role-based locators** — elements are found by accessible role and name (`getByRole('button', { name: 'Add Element' })`), which doubles as an accessibility check.

### Test coverage

- **Add/Remove Elements** — verifies that a Delete button appears after adding an element on the-internet.herokuapp.com.

### Test configuration (`playwright.config.ts`)

- Cross-browser projects: Chromium, Firefox, WebKit
- Fully parallel test execution
- Retries enabled on CI only (`retries: process.env.CI ? 2 : 0`)
- Trace collected on first retry for debugging failures
- HTML reporter for test results

### Continuous integration

- **GitHub Actions workflow** (`.github/workflows/playwright.yml`)
- Runs on every push and pull request to `main`/`master`
- Caches Playwright browser binaries between runs
- Tests against Chromium in CI
- Uploads the HTML report as an artifact (retained 30 days)

## Getting Started

```bash
npm install
npm init playwright@latest      # official interactive setup wizard: installs Playwright and browsers, generates config
npx playwright test             # run all tests (all 3 browsers)
npx playwright test --project=chromium   # single browser
npx playwright show-report      # open the HTML report
npx playwright test --ui        # open UI mode: watch and debug tests interactively
```

## Future Improvements

- [ ] Add more tests for the-internet.herokuapp.com (form authentication, key presses, drag & drop, dynamic loading)
- [x] API testing with Playwright's `request` fixture to complement UI tests
- [ ] Visual regression testing with screenshot comparisons
