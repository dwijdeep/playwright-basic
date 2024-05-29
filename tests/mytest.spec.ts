import { test, expect } from '@playwright/test';
import exp = require('constants');

test('Applied material test', async ({ page }) => {

    await page.goto('https://www.appliedmaterials.com/');

    await page.locator(`xpath = //div[@class='cmp-tabs__list  hover']/div/a[contains(text(),'Careers')]`).click();

    const [newPage] = await Promise.all([
        page.waitForEvent('popup'),
        page.click(`xpath = //span[text()='Search Jobs']`)
    ])

    await newPage.waitForLoadState();

    await expect(newPage.locator(`xpath = //h1[text()='What Will You Make Possible?']`)).toHaveText('What Will You Make Possible?');

    const fileChooserPromise = newPage.waitForEvent('filechooser');

    await newPage.locator(`xpath = //a[text()='Select file']`).click();

    const fileChooser = await fileChooserPromise;

    await fileChooser.setFiles('./resources/upload.txt');

    await newPage.locator(`xpath = //button[@data-test-id='confirm-upload-resume']`).click();

    newPage.waitForLoadState();

    await expect(newPage.locator(`xpath = //h3[@class='drop-resume-text']`)).toHaveText('upload.txt');

    await newPage.locator(`xpath = //input[@id='main-search-box']`).fill('Automation');

    await newPage.locator(`xpath = //div[@class='Select-option']/span[text()='Test Automation']`).click();

    newPage.waitForLoadState();

    try {
        await expect(newPage.locator(`xpath = //p[@class='faded position-id-text']`)).toHaveText('ID: R2413936');
    }catch(error)   {
        console.log(`Given job id is not present: ${error.message}`);
        
        await newPage.locator(`xpath = //div[@class='card position-card pointer ']`)[0].click();

        newPage.waitForLoadState();

        await expect(newPage.locator(`xpath = //p[@class='faded position-id-text']`)).toHaveText('ID: R2414311');
    }

    await newPage.locator(`xpath = //button[@data-test-id='apply-button']`).click();

    newPage.waitForLoadState();

    await newPage.locator(`xpath = //button[@data-test-id='position-apply-button']`).click();

    await expect(newPage.locator(`xpath = //p[@class='toast-message']`)).toHaveText('Please fill all required fields (marked with *)');

    await newPage.screenshot({ path: './resources/screenshots/screenshot.png' });
})