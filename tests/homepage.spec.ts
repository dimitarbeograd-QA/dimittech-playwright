import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const SECTIONS = ['services', 'process', 'tech', 'security', 'qa', 'remote', 'contact'];

test.describe('DimitTech home page', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.open();
  });

  test('has the correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/DimitTech/);
  });

  for (const id of SECTIONS) {
    test(`section #${id} is present`, async () => {
      await expect(home.section(id)).toHaveCount(1);
    });
  }

  test('contact details include email and phone', async () => {
    await expect(home.emailLink).toBeAttached();
    await expect(home.phoneLink).toBeAttached();
  });

  test('has no broken internal anchors', async () => {
    await home.expectAllAnchorsResolve();
  });

  test('digital competence test page loads', async ({ request }) => {
    const res = await request.get('/test-digitalni-kompetentnosti.html');
    expect(res.status()).toBe(200);
  });

  test('has no JavaScript errors in the console', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.reload();
    expect(errors).toEqual([]);
  });
});
