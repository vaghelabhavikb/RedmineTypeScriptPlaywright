import { expect, Locator, Page, test } from "@playwright/test"

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
        await this.nameTB.pressSequentially(name, { delay: 100 })
        await this.createBtn.click()
        await expect(this.creationSuccessAlert).toContainText('Successful creation.')
    }

    async createProjWithOptionalFields(projData: ProjectCreationFields) {
        await this.nameTB.pressSequentially(projData.ProjectName, { delay: 100 })
        if (projData.Description) {
            await this.descTB.fill(projData.Description)
        }
        if (projData.MarkPublic) {
            if (projData.MarkPublic === "false") {
                await this.markPublicCB.check()
            }
        }
        if (projData.Identifier) {
            await this.identifierTB.clear()
            await this.identifierTB.fill(projData.Identifier)
        }
        if (projData.SubProjectOf) {
            switch (projData.SubProjectOf) {
                case "DocID":
                    await this.subProjOfDD.selectOption({ label: projData.SubProjectOf })
                    break;
                default:
                    test.info().annotations.push({
                        type: 'Warning',
                        description: `SubOfProject value "${projData.SubProjectOf}" is invalid. As this is an optional field, continuing with project creation.`
                    })
            }

        }
        await this.createBtn.click()
        await expect(this.creationSuccessAlert).toContainText('Successful creation.')
    }

}

export interface ProjectCreationFields {
    "ProjectName": string,
    "Description"?: string,
    "MarkPublic"?: string,
    "Identifier"?: string,
    "SubProjectOf"?: string
}












