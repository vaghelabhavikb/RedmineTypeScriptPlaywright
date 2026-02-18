import { Locator, Page } from "@playwright/test"

export class CreateIssueform {
    private page: Page
    private trackerCB: Locator
    private subjectTB: Locator
    private descTB: Locator
    private statusDD: Locator
    private priorityDD: Locator
    private startDateTB: Locator
    private estimatedTimeTB: Locator
    private createBtn: Locator
    private creationSuccessAlert: Locator

    constructor(page: Page) {
        this.page = page
        this.trackerCB = page.getByRole('combobox', { name: 'Tracker *' })
        this.subjectTB = page.getByRole('textbox', { name: 'Subject *' })
        this.descTB = page.getByRole('textbox', { name: 'Description' })
        this.statusDD = page.getByTestId('issue_status_id')
        this.priorityDD = page.getByLabel('Priority *')
        this.startDateTB = page.getByLabel('Start date')
        this.estimatedTimeTB = page.getByRole('textbox', { name: 'Estimated time' })
        this.createBtn = page.getByRole('button', { name: 'Create', exact: true })
        this.creationSuccessAlert = page.locator('#flash_notice')
    }

    async createIssue(data: IssueCreationFields) {
        await this.trackerCB.selectOption({ label: data.Tracker })
        await this.waitForAppReady()
        await this.subjectTB.fill(data.Subject)
        await this.waitForAppReady()
        if (data.Description) {
            await this.descTB.fill(data.Description)
        }
        await this.waitForAppReady()
        if (data.Status) {
            await this.statusDD.selectOption({ label: data.Status })
        }
        await this.waitForAppReady()
        if (data.Priority) {
            await this.priorityDD.selectOption({ label: data.Priority })
        }
        await this.waitForAppReady()
        if (data.StartDate) {
            // await this.startDateTB.pressSequentially(data.StartDate, {delay: 100})
            await this.startDateTB.fill(data.StartDate)
            await this.page.keyboard.press('Tab');
        }
        await this.waitForAppReady()
        if (data.EstimatedTime) {
            await this.estimatedTimeTB.fill(data.EstimatedTime)
        }
        await this.waitForAppReady()
        await this.createBtn.click()
    }

    async waitForAppReady() {
        // Wait for the loader to be hidden. 
        // We use a short timeout here in case the loader never appeared at all.
        await this.page.locator('#ajax-indicator').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {
            /* Ignore timeout if loader wasn't there */
        });
    }
}

export interface IssueCreationFields {
    "Tracker": string,
    "Subject": string,
    "Description"?: string,
    "Status": string,
    "Priority": string,
    "StartDate"?: string,
    "EstimatedTime"?: string
}