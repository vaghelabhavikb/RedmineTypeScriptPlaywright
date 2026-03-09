import { Locator, Page } from "@playwright/test";

export class LandingPage {
    public page: Page
    public projectsLK: Locator
    public adminLK: Locator


    constructor(page: Page) {
        this.page = page
        this.projectsLK = page.getByRole('link', { name: 'Projects' })
        this.adminLK = page.getByRole('link', { name: 'Administration' })
    }

    async navToProjectsModule() {
        await this.projectsLK.click()
    }

    async navToAdminModule() {
        await this.adminLK.click()
    }

}