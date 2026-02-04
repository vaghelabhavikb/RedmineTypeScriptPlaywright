import { expect, Locator, Page } from "@playwright/test"

export class CreateProjectForm {

    public page: Page
    public nameTB: Locator
    public descTB: Locator
    public identifierTB: Locator
    public markPublicCB: Locator
    public subProjOfDD: Locator
    public createBtn: Locator
    public creationSuccessAlert: Locator

    constructor(page: Page) {
        this.page = page
        this.nameTB = page.getByRole('textbox', { name: 'Name *' })
        this.identifierTB = page.getByRole('textbox', { name: 'Identifier *' })
        this.descTB = page.getByRole('textbox', { name: 'Description' })
        this.markPublicCB = page.getByRole('checkbox', { name: 'Public' })
        this.subProjOfDD = page.getByLabel('Subproject of')
        this.createBtn = page.getByRole('button', { name: 'Create', exact: true })
        this.creationSuccessAlert = page.locator('#flash_notice')
        //   await expect(page.locator('#flash_notice')).toContainText('Successful creation.');
        //   await expect(page.getByText('Successful creation.')).toBeVisible();
    }

    async createProjectWithNameOnly(name: string) {
        await this.nameTB.pressSequentially(name, {delay:100})
        await this.createBtn.click()
        await expect(this.creationSuccessAlert).toContainText('Successful creation.')
    }

    async createProjectWithOptionalFields() {

    }

}