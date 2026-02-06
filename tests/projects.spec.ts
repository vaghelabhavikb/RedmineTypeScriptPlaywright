import { test } from '@playwright/test'
import createByNameJson from '../test-data/Projects/CreateProjectsByName.json'
import createWithOpFieldsJson from '../test-data/Projects/CreateProjectsWithOptionalFields.json'
import { LandingPage } from '../pom/landing-page'
import { ProjectsQueryPage } from '../pom/projects-query-page'
import { CreateProjectForm } from '../pom/create-project-form'
import { ProjectCreationFields } from '../pom/create-project-form'

test.describe('Projects tests', () => {

    let landingPage: LandingPage
    let projectsQueryPage: ProjectsQueryPage
    let createProjectForm: CreateProjectForm

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page)
        projectsQueryPage = new ProjectsQueryPage(page)
        createProjectForm = new CreateProjectForm(page)

        await page.goto('')
    })

    createByNameJson.names.forEach((name: string) => {
        test(`Create Project with name: ${name}`, async () => {
            await landingPage.navToProjectsModule()
            await projectsQueryPage.launchCreateProjectForm()
            await createProjectForm.createProjectWithNameOnly(name)
        })
    })

    createWithOpFieldsJson.Projects.forEach((fieldValues: ProjectCreationFields) => {
        test(`Create Project with optional fields: ${fieldValues.ProjectName}`, { tag: "@IP" }, async () => {
            await landingPage.navToProjectsModule()
            await projectsQueryPage.launchCreateProjectForm()
            await createProjectForm.createProjWithOptionalFields(fieldValues)
        })
    })
})