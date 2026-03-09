import { test } from "./fixtures"
import createUsersDataJson from '../test-data/Users/CreateUsers.json'
import { UserCreationFields } from "../pom/create-user-form"

test.describe('User Tests', () => {

    test.beforeEach(async ({ landingPage, adminPage }) => {
        await landingPage.navToAdminModule()
        await adminPage.openUsersPage()
    })

    createUsersDataJson.users.forEach((userCreationFields: UserCreationFields) => {
        test(`Create User: ${userCreationFields.Login}`, async ({ usersQueryPage, createUserForm }) => {
            await usersQueryPage.launchUserCreationForm()
            await createUserForm.createUser(userCreationFields)
            await createUserForm.navToUsersQueryPage()
            await usersQueryPage.validateCreatedUser(userCreationFields)
        })
    })

})