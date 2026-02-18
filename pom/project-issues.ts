import { Locator, Page } from "@playwright/test"

export class ProjectIssues {
    public page: Page
    public newIssueLnk: Locator

    constructor(page: Page) {
        this.page = page
        this.newIssueLnk = page.getByRole('link', { name: 'New issue' })
    }

    async launchCreateIssueForm() {
        await this.newIssueLnk.click()
    }

}