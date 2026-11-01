import { test, expect } from '@playwright/test';

test.describe('Rails TodoMVC Feature Verification', () => {
  test('create items, toggle completion, and filter', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await expect(page.locator('h1')).toHaveText('todos (rails)');

    const input = page.locator('input[name="item[body]"]');
    await expect(input).toHaveAttribute('placeholder', 'What needs to be done today?');
    await page.screenshot({ path: 'test-results/step-1-initial.png' });
    await input.fill('Write Hotwire integration');
    await input.press('Enter');
    await page.waitForTimeout(500);

    await input.fill('Record with demonstra.me');
    await input.press('Enter');
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/step-2-items-created.png' });

    // Toggle the first item completed
    const firstToggle = page.locator('#active_items button').first();
    await firstToggle.click();
    await page.waitForTimeout(500);
    await page.screenshot({ path: 'test-results/step-3-item-completed.png' });

    // View Active
    await page.getByRole('link', { name: 'Active' }).click();
    await page.waitForTimeout(500);

    // View Completed
    await page.getByRole('link', { name: 'Completed' }).click();
    await page.waitForTimeout(500);
  });
});
