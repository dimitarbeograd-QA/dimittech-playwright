import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

const SECTIONS = ['services', 'process', 'tech', 'security', 'qa', 'remote', 'contact'];

test.describe('DimitTech начална страница', () => {
  let home: HomePage;

  test.beforeEach(async ({ page }) => {
    home = new HomePage(page);
    await home.open();
  });

  test('има правилно заглавие', async ({ page }) => {
    await expect(page).toHaveTitle(/DimitTech/);
  });

  for (const id of SECTIONS) {
    test(`секция #${id} е налична`, async () => {
      await expect(home.section(id)).toHaveCount(1);
    });
  }

  test('контактите съдържат имейл и телефон', async () => {
    await expect(home.emailLink).toBeAttached();
    await expect(home.phoneLink).toBeAttached();
  });

  test('няма счупени вътрешни котви', async () => {
    await home.expectAllAnchorsResolve();
  });

  test('страницата за тест на дигитални компетентности се зарежда', async ({ request }) => {
    const res = await request.get('/test-digitalni-kompetentnosti.html');
    expect(res.status()).toBe(200);
  });

  test('няма грешки в конзолата', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.reload();
    expect(errors).toEqual([]);
  });
});
import { test, expect } from '@playwright/test';

test.describe('DimitTech начална страница', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('има правилно заглавие', async ({ page }) => {
    await expect(page).toHaveTitle(/DimitTech/);
  });

  test('основните секции са налични в страницата', async ({ page }) => {
    for (const id of ['services', 'process', 'tech', 'security', 'qa', 'remote', 'contact']) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }
  });

  test('контактите съдържат имейл и телефон', async ({ page }) => {
    await expect(page.locator('a[href="mailto:dimitar_beograd@abv.bg"]').first()).toBeAttached();
    await expect(page.locator('a[href="tel:+359876667577"]').first()).toBeAttached();
  });

  test('няма счупени вътрешни котви', async ({ page }) => {
    const hrefs = await page.$$eval('a[href^="#"]', as => as.map(a => a.getAttribute('href')!).filter(h => h.length > 1));
    for (const h of new Set(hrefs)) {
      await expect(page.locator(h), `котва ${h}`).toHaveCount(1);
    }
  });

  test('страницата за тест на дигитални компетентности се зарежда', async ({ page, request }) => {
    const res = await request.get('/test-digitalni-kompetentnosti.html');
    expect(res.status()).toBe(200);
  });

  test('няма грешки в конзолата', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.reload();
    expect(errors).toEqual([]);
  });
});
