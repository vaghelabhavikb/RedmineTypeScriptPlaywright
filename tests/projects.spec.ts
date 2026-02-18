import { test } from '@playwright/test'
import createByNameJson from '../test-data/Projects/CreateProjectsByName.json'
import createWithOpFieldsJson from '../test-data/Projects/CreateProjectsWithOptionalFields.json'
import createIssuesInProjectJson from '../test-data/Projects/CreateIssuesInProject.json'
import { LandingPage } from '../pom/landing-page'
import { ProjectsQueryPage } from '../pom/projects-query-page'
import { CreateProjectForm } from '../pom/create-project-form'
import { ProjectCreationFields } from '../pom/create-project-form'
import { IssueCreationFields } from '../pom/create-issue-form'
import { ProjectPage } from '../pom/project-page'
import { CreateIssueform } from '../pom/create-issue-form'
import { IssueInfo } from '../pom/issue-info'
import { ProjectIssues } from '../pom/project-issues'

test.describe('Projects tests', () => {

    let landingPage: LandingPage
    let projectsQueryPage: ProjectsQueryPage
    let createProjectForm: CreateProjectForm
    let projectPage: ProjectPage
    let createIssueForm: CreateIssueform
    let issueInfo: IssueInfo
    let projectIssues: ProjectIssues

    test.beforeEach(async ({ page }) => {
        landingPage = new LandingPage(page)
        projectsQueryPage = new ProjectsQueryPage(page)
        createProjectForm = new CreateProjectForm(page)
        projectPage = new ProjectPage(page)
        createIssueForm = new CreateIssueform(page)
        issueInfo = new IssueInfo(page)
        projectIssues = new ProjectIssues(page)

        await page.goto('')
        await landingPage.navToProjectsModule()
    })

    createByNameJson.names.forEach((name: string) => {
        test(`Create Project with name: ${name}`, async () => {
            await projectsQueryPage.launchCreateProjectForm()
            await createProjectForm.createProjectWithNameOnly(name)
        })
    })

    createWithOpFieldsJson.Projects.forEach((fieldValues: ProjectCreationFields) => {
        test(`Create Project with optional fields: ${fieldValues.ProjectName}`, async () => {
            await projectsQueryPage.launchCreateProjectForm()
            await createProjectForm.createProjWithOptionalFields(fieldValues)
        })
    })

    createIssuesInProjectJson.issues.forEach((fieldValues: IssueCreationFields) => {
        test(`Create Issue in Project: ${fieldValues.Subject}`, { tag: "@IP" }, async () => {
            await projectsQueryPage.launchDocIDProject()
            await projectPage.launchIssueTab()
            await projectIssues.launchCreateIssueForm()
            await createIssueForm.createIssue(fieldValues)
            await issueInfo.validateIssueInfo(fieldValues)
        })
    })
})