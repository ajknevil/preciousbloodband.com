import { test } from '@playwright/test';
import fs from 'fs';

const BASE = 'http://localhost:3001';
const OUT = 'tests/playwright/screenshots';

test.beforeAll(() => {
  if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
});

test('filter screenshots', async ({ page }) => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  // wait for gallery and filters
  await page.waitForSelector('.masonry-filters');
  await page.screenshot({ path: `${OUT}/baseline.png`, fullPage: true });

  // click each filter and capture
  const buttons = await page.$$('.masonry-filters button');
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    const txt = (await btn.innerText()).replace(/\s+/g, '_');
    await btn.click();
    // wait a bit for animation and layout
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/after_${i}_${txt}.png`, fullPage: true });
  }
});
