import { Locator, Page } from "@playwright/test";

export class ProjectsQueryPage {
    public page: Page
    public newProjectLK: Locator
    public docIDProjLK: Locator

    constructor(page: Page) {
        this.page = page
        this.newProjectLK = page.getByRole('link', { name: 'New project' })
        this.docIDProjLK = page.getByRole('link', { name: 'DocID' })
    }

    async launchCreateProjectForm() {
        await this.newProjectLK.click()
    }

    async launchDocIDProject() {
        await this.docIDProjLK.click()
    }
}
