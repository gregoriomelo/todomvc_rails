import { test, expect } from '@playwright/test';
import { enableVisualInteractions } from './support/interact.js';

test.describe('Rails TodoMVC Feature Verification', () => {
  test.beforeEach(async ({ page }) => {
    await enableVisualInteractions(page);
  });

  test('create items, toggle completion, and filter', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(600);
    await expect(page.locator('h1')).toHaveText('todos (rails)');

    const input = page.locator('input[name="item[body]"]');
    await expect(input).toHaveAttribute('placeholder', 'What needs to be done today?');
    await page.screenshot({ path: 'test-results/step-1-initial.png' });

    // Type first item with realistic keystrokes
    await input.click();
    await input.pressSequentially('Write Hotwire integration', { delay: 40 });
    await page.waitForTimeout(300);
    await input.press('Enter');
    await page.waitForTimeout(600);

    // Type second item
    await input.click();
    await input.pressSequentially('Record fluid demo with demonstra.me', { delay: 40 });
    await page.waitForTimeout(300);
    await input.press('Enter');
    await page.waitForTimeout(600);
    await page.screenshot({ path: 'test-results/step-2-items-created.png' });

    // Toggle the first item completed with clear hover & click
    const firstToggle = page.locator('#active_items button').first();
    await firstToggle.hover();
    await page.waitForTimeout(400);
    await firstToggle.click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'test-results/step-3-item-completed.png' });

    // View Active
    await page.getByRole('link', { name: 'Active' }).click();
    await page.waitForTimeout(800);

    // View Completed
    await page.getByRole('link', { name: 'Completed' }).click();
    await page.waitForTimeout(800);

    // View All
    await page.getByRole('link', { name: 'All' }).click();
    await page.waitForTimeout(1000);
  });
});
