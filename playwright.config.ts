import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'node:fs';

const replitChromiumPath = '/repl/tools/bin/chromium';
const chromiumPath =
  process.env.PLAYWRIGHT_EXECUTABLE_PATH ??
  (existsSync(replitChromiumPath) ? replitChromiumPath : undefined);
const testPort = process.env.PLAYWRIGHT_TEST_PORT ?? '4173';
const testBaseURL = `http://127.0.0.1:${testPort}`;

export default defineConfig({
  testDir: './artifacts/powerlynx/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  use: {
    baseURL: testBaseURL,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH ?? '/repl/tools/bin/chromium',
    },
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm --filter @workspace/powerlynx run dev',
    url: testBaseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      BASE_PATH: '/',
      PORT: testPort,
    },
  },
  use: {
    ...devices['Desktop Chrome'],
    baseURL: testBaseURL,
    ...(chromiumPath ? { launchOptions: { executablePath: chromiumPath } } : {}),
    trace: 'on-first-retry',
  },
});