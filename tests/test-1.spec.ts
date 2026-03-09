import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Administration' }).click();
    await page.getByRole('link', { name: 'Users' }).click();
    await page.getByRole('link', { name: 'New user' }).click();
    await page.getByTestId('user_login').click();
    await page.getByTestId('user_login').fill('Jim');
    await page.getByTestId('user_login').press('Tab');
    await page.getByTestId('user_firstname').fill('Jam');
    await page.getByTestId('user_firstname').press('Tab');
    await page.getByTestId('user_lastname').press('Tab');
    await page.getByTestId('user_mail').press('Shift+Tab');
    await page.getByTestId('user_lastname').fill('JimJam');
    await page.getByTestId('user_lastname').press('Tab');
    await page.getByTestId('user_mail').fill('JimJam@gmail.com');
    await page.getByTestId('user_password').click();
    await page.getByTestId('user_password').fill('JimJam');
    await page.getByTestId('user_password').press('Tab');
    await page.getByTestId('user_password_confirmation').fill('JimJam');
    await page.getByRole('button', { name: 'Create', exact: true }).click();
    await page.getByTestId('user_password').click();
    await page.getByTestId('user_password').fill('JimJam@1062');
    await page.getByTestId('user_password').press('Tab');
    await page.getByTestId('user_password_confirmation').fill('JimJam@1062');
    await page.getByRole('button', { name: 'Create', exact: true }).click();
    await page.getByTestId('admin-menu').getByRole('link', { name: 'Users' }).click();
});