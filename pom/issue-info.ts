import { Page, Locator, expect, test } from "@playwright/test";
import { IssueCreationFields } from "./create-issue-form";
import { isEqual, parse } from 'date-fns'

export class IssueInfo {
    public page: Page
    public subjectLbl: Locator
    public descTB: Locator
    public identifierLbl: Locator
    public statusLbl: Locator
    public priorityLbl: Locator
    public startDateLbl: Locator
    public estimatedTimeLbl: Locator

    constructor(page: Page) {
        this.page = page
        this.subjectLbl = page.locator('.subject h3')
        this.identifierLbl = page.getByRole('heading', { name: 'Story #' })
        this.descTB = page.getByTestId('issue_description_wiki')
        this.statusLbl = page.locator('//div[text()="Status:"]//following-sibling::div')
        this.priorityLbl = page.locator('//div[text()="Priority:"]//following-sibling::div')
        this.startDateLbl = page.locator("//div[text()='Start date:']//following-sibling::div")
        this.estimatedTimeLbl = page.locator("//div[text()='Estimated time:']//following-sibling::div")
    }
    async validateIssueInfo(expdata: IssueCreationFields) {
        for (const [key, value] of Object.entries(expdata)) {
            switch (key) {
                case 'Subject':
                    await expect.soft(this.subjectLbl).toHaveText(value)
                    break;
                case 'Description':
                    await expect.soft(this.descTB).toHaveText(value)
                    break;
                case 'Tracker':
                    await expect.soft(this.identifierLbl).toContainText(value)
                    break;
                case 'Status':
                    await expect.soft(this.statusLbl).toHaveText(value)
                    break;
                case 'Priority':
                    await expect.soft(this.priorityLbl).toHaveText(value)
                    break;
                case 'StartDate':
                    const act = (await this.startDateLbl.textContent()) ?? "";

                    // Step 1: Parse (The third argument is a reference date, usually 'new Date()')
                    const expDate = parse(value, 'yyyy-MM-dd', new Date());
                    const actDate = parse(act, 'MM/dd/yyyy', new Date());

                    expect.soft(actDate.getTime()).toBe(expDate.getTime())
                    break;
                case 'EstimatedTime':
                    await expect.soft(this.estimatedTimeLbl).toContainText(value)
                    break;
                default:
                    test.info().annotations.push({
                        type: 'Warning',
                        description: `IssueInfo field "${key}" is invalid. `
                    })
            }

        }
    }
}