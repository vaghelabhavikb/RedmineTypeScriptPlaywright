import { chromium, FullConfig, expect } from '@playwright/test';
// import { TestDataUtil } from '../utils/TestDataUtil';
import { LoginPage } from '../pom/login-page';

async function globalSetup(config: FullConfig) {
    // const baseURLFromConfig = config.projects[0].use.baseURL;
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    var loginPage = new LoginPage(page)
    // const creds = TestDataUtil.getCredentials('validUser')

    await page.goto('http://localhost:3000')
    await loginPage.navToLoginPage()
    await loginPage.loginToApp('admin', 'localadmin')
    // await loginPage.(creds.username, creds.password)
    await expect(page).toHaveTitle(/Redmine/i)

    // Save authenticated state
    await context.storageState({ path: './auth/storageState.json' });

    await browser.close();
}

export default globalSetup;
