import { Locator, Page } from "@playwright/test";

export class ProjectPage {

    private page: Page
    private issueTab: Locator

    constructor(page: Page) {
        this.page = page
        this.issueTab = page.getByRole('link', { name: 'Issues', exact: true })
    }
    async launchIssueTab() {
        await this.issueTab.click()
    }
}