import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    reporter: [
        process.env.CI ? ['dot'] : ['list'],
        ['@argos-ci/playwright/reporter', { uploadToArgos: !!process.env.CI }],
    ],
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        contextOptions: {
            reducedMotion: 'reduce',
        },
    },
});
