import { Locator, Page, expect } from "@playwright/test";
import { PageUtilities } from "../utils/page-utilities";
import { UserCreationFields } from "./create-user-form";

export class UsersQueryPage {
    private page: Page
    private newUserLK: Locator
    private usersTbl: Locator

    constructor(page: Page) {
        this.page = page
        this.newUserLK = page.getByRole('link', { name: 'New user' })
        this.usersTbl = page.locator('//table/thead//ancestor::table')
    }

    async launchUserCreationForm() {
        await this.newUserLK.click()
    }

    async validateCreatedUser(expUserData: UserCreationFields) {
        const users = await new PageUtilities(this.page).getTableAsListMap(this.usersTbl)
        const act = users.find(user => user['Login'] === expUserData.Login)

        for (const [key, value] of Object.entries(expUserData)) {
            if (key !== 'Password') {
                expect.soft(act?.[key]).toBe(value)
            }
        }
    }
}