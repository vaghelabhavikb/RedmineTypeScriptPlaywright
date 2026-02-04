import { Locator, Page } from "@playwright/test"

export class LoginPage {

    public page: Page
    public signinLK: Locator
    public usernameTB: Locator
    public passwordTB: Locator
    public loginBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.signinLK = page.getByRole('link', { name: 'Sign in' })
        this.usernameTB = page.getByRole('textbox', { name: 'Login' });
        this.passwordTB = page.getByRole('textbox', { name: 'Password Lost password' });
        this.loginBtn = page.getByRole('button', { name: 'Login' });
    }

    async navToLoginPage() {
        await this.signinLK.click()
    }

    async loginToApp(username: string, password: string) {
        await this.usernameTB.fill(username)
        await this.passwordTB.fill(password)
        await this.loginBtn.click()
    }
}