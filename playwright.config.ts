import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3005",
    trace: "on-first-retry",
    headless: true,
  },
  webServer: {
    command: "npx.cmd next dev -p 3005",
    url: "http://localhost:3005",
    reuseExistingServer: true,
    timeout: 120 * 1000,
  },
  projects: [
    {
      name: "edge",
      use: { channel: "msedge" },
    },
  ],
});
