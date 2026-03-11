import { chromium, FullConfig, expect } from '@playwright/test';
// import { TestDataUtil } from '../utils/TestDataUtil';
import { LoginPage } from '../pom/login-page';

async function globalSetup(config: FullConfig) {
    const chromeSetup = async () => {
        const browser = await chromium.launch({ channel: 'chrome', headless: false });
        const context = await browser.newContext();
        const page = await context.newPage();
        var loginPage = new LoginPage(page)
        await page.goto('http://localhost:3000')
        await loginPage.navToLoginPage()
        await loginPage.loginToApp('admin', 'localadmin')
        await expect(page).toHaveTitle(/Redmine/i)
        await context.storageState({ path: './auth/storageState.json' });
        await browser.close();
    }

    const edgeSetup = async () => {
        const edgeBrowser = await chromium.launch({ channel: 'msedge', headless: false });
        const edgeContext = await edgeBrowser.newContext();
        const edgePage = await edgeContext.newPage();
        var loginPage = new LoginPage(edgePage)
        await edgePage.goto('http://localhost:3001')
        await loginPage.navToLoginPage()
        await loginPage.loginToApp('admin', 'localadmin')
        await expect(edgePage).toHaveTitle(/Redmine/i)
        await edgeContext.storageState({ path: './auth/edge-storageState.json' });
        await edgeBrowser.close();
    }
    await Promise.all([chromeSetup(), edgeSetup()]);
    // await Promise.all([chromeSetup()]);
}

export default globalSetup;
