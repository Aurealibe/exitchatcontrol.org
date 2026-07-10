import { defineConfig, devices } from '@playwright/test'

// Two projects: a normal chromium run, and a JS-disabled run — the guide
// must be fully readable with JavaScript off (Tor Browser "safest" mode
// is part of this site's audience).
export default defineConfig({
  testDir: 'tests/e2e',
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4321',
  },
  webServer: {
    command: 'pnpm preview --host 127.0.0.1 --port 4321',
    url: 'http://127.0.0.1:4321',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'nojs',
      use: { ...devices['Desktop Chrome'], javaScriptEnabled: false },
    },
  ],
})
