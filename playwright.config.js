import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/results.json' }],
  ],
  use: {
    baseURL: 'http://127.0.0.1:3000',
    video: 'on',
    screenshot: 'on',
    viewport: { width: 900, height: 650 },
  },
  webServer: {
    command: 'bin/rails server -p 3000',
    url: 'http://127.0.0.1:3000/up',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
