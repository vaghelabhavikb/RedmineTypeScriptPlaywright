import { Locator, Page } from "@playwright/test";

export class ProjectsQueryPage {
    public page: Page
    public newProjectLK: Locator

    constructor(page: Page) {
        this.page = page
        this.newProjectLK = page.getByRole('link', { name: 'New project' })
    }

    async launchCreateProjectForm() {
        await this.newProjectLK.click()
    }
}
