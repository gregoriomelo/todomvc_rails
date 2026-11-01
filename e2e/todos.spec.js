import { test, expect } from '@playwright/test';
import { enableVisualInteractions } from './support/interact.js';

// Rails TodoMVC E2E verification test suite for Demonstra visual reviews (GIF + MP4 video scrubber)
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

    // 1. Type first item with realistic keystrokes and visual feedback
    await input.click();
    await page.waitForTimeout(300);
    await input.pressSequentially('Write Hotwire integration', { delay: 45 });
    await page.waitForTimeout(400);
    await input.press('Enter');
    await page.waitForTimeout(800);

    // 2. Type second item
    await input.click();
    await page.waitForTimeout(300);
    await input.pressSequentially('Record fluid demo with demonstra.me', { delay: 45 });
    await page.waitForTimeout(400);
    await input.press('Enter');
    await page.waitForTimeout(800);
    await page.screenshot({ path: 'test-results/step-2-items-created.png' });

    // 3. Toggle the first item completed with clear hover & click radar
    const firstToggle = page.locator('#active_items button').first();
    await firstToggle.hover();
    await page.waitForTimeout(400);
    await firstToggle.click();
    await page.waitForTimeout(900);
    await page.screenshot({ path: 'test-results/step-3-item-completed.png' });

    // 4. Filter: View Active
    const activeLink = page.getByRole('link', { name: 'Active' });
    await activeLink.hover();
    await page.waitForTimeout(300);
    await activeLink.click();
    await page.waitForTimeout(900);

    // 5. Filter: View Completed
    const completedLink = page.getByRole('link', { name: 'Completed' });
    await completedLink.hover();
    await page.waitForTimeout(300);
    await completedLink.click();
    await page.waitForTimeout(900);

    // 6. Filter: View All
    const allLink = page.getByRole('link', { name: 'All' });
    await allLink.hover();
    await page.waitForTimeout(300);
    await allLink.click();
    await page.waitForTimeout(1200);
  });
});
