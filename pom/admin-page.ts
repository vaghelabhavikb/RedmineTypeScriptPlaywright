import { Locator, Page } from "@playwright/test";

export class AdminPage {

    private page: Page
    private usersLK: Locator

    constructor(page: Page) {
        this.page = page
        this.usersLK = page.getByRole('link', { name: 'Users' })
    }

    async openUsersPage() {
        await this.usersLK.click()
    }

}