import { expect, type Locator, type Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly emailLink: Locator;
  readonly phoneLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailLink = page.locator('a[href="mailto:dimitar_beograd@abv.bg"]').first();
    this.phoneLink = page.locator('a[href="tel:+359876667577"]').first();
  }

  async open() {
    await this.page.goto('/');
  }

  section(id: string): Locator {
    return this.page.locator(`#${id}`);
  }

  async internalAnchors(): Promise<string[]> {
    const hrefs = await this.page.$$eval('a[href^="#"]', as =>
      as.map(a => a.getAttribute('href')!).filter(h => h.length > 1));
    return [...new Set(hrefs)];
  }

  async expectAllAnchorsResolve() {
    for (const h of await this.internalAnchors()) {
      await expect(this.page.locator(h), `anchor ${h}`).toHaveCount(1);
    }
  }
}
