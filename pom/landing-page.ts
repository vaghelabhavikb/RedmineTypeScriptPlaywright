import { Locator, Page } from "@playwright/test";

export class LandingPage {
    public projectsLK: Locator
    public page: Page

    constructor(page: Page){
        this.page = page
        this.projectsLK = page.getByRole('link', { name: 'Projects' })
    }

    async navToProjectsModule(){
        await this.projectsLK.click()
    }

}