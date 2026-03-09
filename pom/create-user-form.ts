import { Locator, Page } from "@playwright/test";

export class CreateUserForm {

    private page: Page
    private loginTB: Locator
    private firstNameTB: Locator
    private lastNameTB: Locator
    private emailTB: Locator
    private isAdminCB: Locator
    private passwordTB: Locator
    private confirmPasswordTB: Locator

    private submitBTN: Locator

    private usersLK: Locator

    constructor(page: Page) {
        this.page = page
        this.loginTB = page.getByTestId('user_login')
        this.firstNameTB = page.getByTestId('user_firstname')
        this.lastNameTB = page.getByTestId('user_lastname')
        this.emailTB = page.getByTestId('user_mail')
        this.isAdminCB = page.getByRole('checkbox', { name: 'Administrator' })
        this.passwordTB = page.getByTestId('user_password')
        this.confirmPasswordTB = page.getByTestId('user_password_confirmation')

        this.submitBTN = page.getByRole('button', { name: 'Create', exact: true })

        this.usersLK = page.getByTestId('admin-menu').getByRole('link', { name: 'Users' })
    }

    async createUser(data: UserCreationFields) {
        await this.loginTB.fill(data.Login)
        await this.firstNameTB.fill(data["First name"])
        await this.lastNameTB.fill(data["Last name"])
        await this.emailTB.fill(data.Email)
        if (data.Administrator?.toLowerCase() === "yes") {
            await this.isAdminCB.check()
        }
        await this.passwordTB.fill(data.Password)
        await this.confirmPasswordTB.fill(data.Password)

        await this.submitBTN.click()
    }

    async navToUsersQueryPage() {
        await this.usersLK.click()
    }
}

export interface UserCreationFields {
    "Login": string,
    "First name": string,
    "Last name": string,
    "Email": string,
    "Administrator"?: string,
    "Password": string
}
