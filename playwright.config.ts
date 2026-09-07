import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

const replitChromiumPath = '/repl/tools/bin/chromium';
const chromiumPath =
  process.env.PLAYWRIGHT_EXECUTABLE_PATH ??
  (existsSync(replitChromiumPath) ? replitChromiumPath : undefined);

export default defineConfig({
  testDir: './artifacts/powerlynx/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4173',
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH ?? '/repl/tools/bin/chromium',
    },
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm --filter @workspace/powerlynx run dev',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      BASE_PATH: '/',
      PORT: '4173',
    },
  },
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:4173',
    ...(chromiumPath ? { launchOptions: { executablePath: chromiumPath } } : {}),
    trace: 'on-first-retry',
  },
});