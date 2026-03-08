import { CreateIssueForm } from '../pom/create-issue-form';
import { CreateProjectForm } from '../pom/create-project-form';
import { IssueInfo } from '../pom/issue-info';
import { LandingPage } from '../pom/landing-page';
import { LoginPage } from '../pom/login-page';
import { ProjectIssues } from '../pom/project-issues';
import { ProjectPage } from '../pom/project-page';
import { ProjectsQueryPage } from '../pom/projects-query-page';

import { test as base } from '@playwright/test';

type AllFixtures = {
    loginPage: LoginPage,
    projectPage: ProjectPage,
    issueInfo: IssueInfo,
    createIssueForm: CreateIssueForm,
    createProjectForm: CreateProjectForm,
    projectIssues: ProjectIssues,
    landingPage: LandingPage,
    projectsQueryPage: ProjectsQueryPage,
}

export const test = base.extend<AllFixtures>({
    loginPage: async ({ page }, use) => { await use(new LoginPage(page)) },
    projectPage: async ({ page }, use) => { await use(new ProjectPage(page)) },
    issueInfo: async ({ page }, use) => { await use(new IssueInfo(page)) },
    createIssueForm: async ({ page }, use) => { await use(new CreateIssueForm(page)) },
    createProjectForm: async ({ page }, use) => { await use(new CreateProjectForm(page)) },
    projectIssues: async ({ page }, use) => { await use(new ProjectIssues(page)) },
    landingPage: async ({ page }, use) => {
        await page.goto('')
        await use(new LandingPage(page))
    },
    projectsQueryPage: async ({ page }, use) => { await use(new ProjectsQueryPage(page)) },
})