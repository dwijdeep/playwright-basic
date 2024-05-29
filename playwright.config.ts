import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
    use: {
        browserName: 'chromium',
        channel: 'chrome', // Use Chrome browser
        launchOptions: {
            headless: false, // Run in non-headless mode
            args: ['--start-maximized'], // Launch Chrome in incognito mode
        }
    },
    projects: [
        {
            name: 'chrome',
        },
    ],
};

export default config;
