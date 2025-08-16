// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { GitHubActionOptions } from "@estruyf/github-actions-reporter";
import dotenv from "dotenv";
import path from "path";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// Load environment variables from .env file
//dotenv.config({ path: path.resolve(__dirname, ".env") });
// Ensure that the environment variables are loaded before using them
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export const STORAGE_STATE = path.join(__dirname, "./.auth/user.json");

export default defineConfig({
  testDir: './tests',
  timeout: 60_000, // 60 seconds
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter:[
     ["html"],
     ["list"],
     [
      "@estruyf/github-actions-reporter",
       <GitHubActionOptions>{
         title: "DJPALAPAR Playwright Basics - Test Report",
        useDetails: true,
        showError: true,
       }
     ]
   ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    bypassCSP: true,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //video: 'retain-on-failure', // Record video for failed tests
    screenshot: 'only-on-failure', // Take a screenshot only on failure
  },

  /* Configure projects for major browsers */
  projects: [
    { 
      name: "setup",
      testMatch:"**/*.setup.js",
    },
    {
      name:"e2e",
      dependencies: ["setup"],
      use: {
        storageState: STORAGE_STATE,
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: ["--start-maximized"],
    },
      },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

