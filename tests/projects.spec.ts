// import { test } from '@playwright/test'
import { test } from './fixtures'
import createByNameJson from '../test-data/Projects/CreateProjectsByName.json'
import createWithOpFieldsJson from '../test-data/Projects/CreateProjectsWithOptionalFields.json'
import createIssuesInProjectJson from '../test-data/Projects/CreateIssuesInProject.json'
import { ProjectCreationFields } from '../pom/create-project-form'
import { IssueCreationFields } from '../pom/create-issue-form'

test.describe('Projects tests', () => {

    test.beforeEach(async ({ landingPage }) => {
        await landingPage.navToProjectsModule()
    })

    createByNameJson.names.forEach((name: string) => {
        test(`Create Project with name: ${name}`, async ({ projectsQueryPage, createProjectForm }) => {
            await projectsQueryPage.launchCreateProjectForm()
            await createProjectForm.createProjectWithNameOnly(name)
        })
    })

    createWithOpFieldsJson.Projects.forEach((fieldValues: ProjectCreationFields) => {
        test(`Create Project with optional fields: ${fieldValues.ProjectName}`, async ({ projectsQueryPage, createProjectForm }) => {
            await projectsQueryPage.launchCreateProjectForm()
            await createProjectForm.createProjWithOptionalFields(fieldValues)
        })
    })

    createIssuesInProjectJson.issues.forEach((fieldValues: IssueCreationFields) => {
        test(`Create Issue in Project: ${fieldValues.Subject}`, { tag: "@IP" }, async ({ projectsQueryPage, projectPage, projectIssues, createIssueForm, issueInfo }) => {
            await projectsQueryPage.launchDocIDProject()
            await projectPage.launchIssueTab()
            await projectIssues.launchCreateIssueForm()
            await createIssueForm.createIssue(fieldValues)
            await issueInfo.validateIssueInfo(fieldValues)
        })
    })
})