# DimitTech - Playwright tests

Automated end-to-end tests (TypeScript) for https://dimitarbeograd-qa.github.io/

## Getting started

    npm install
    npx playwright install chromium
    npx playwright test
    npx playwright show-report

## What is covered

Page title, main sections, contact details, internal anchors, a secondary page and JavaScript console errors. Every test runs on desktop (Desktop Chrome) and mobile (Pixel 7).

## Project structure

- `pages/` - Page Object Model classes
- `tests/` - test specs
- `playwright.config.ts` - Playwright configuration
- `.github/workflows/playwright.yml` - CI: runs on every push, pull request and weekly on Mondays
