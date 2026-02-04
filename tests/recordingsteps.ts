import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Login' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password Lost password' }).click();
  await page.getByRole('textbox', { name: 'Password Lost password' }).fill('localadmin');
  await page.getByRole('textbox', { name: 'Password Lost password' }).press('Tab');
  await page.getByRole('button', { name: 'Login' }).press('Enter');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Projects' }).click();
  await page.getByRole('link', { name: 'New project' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).click();
  await page.getByRole('textbox', { name: 'Name *' }).fill('testproject');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('this is test description');
  await page.getByRole('checkbox', { name: 'Public' }).uncheck();
  await page.getByRole('checkbox', { name: 'Public' }).check();
  await page.getByLabel('Subproject of').selectOption('1');
  await page.getByRole('button', { name: 'Create', exact: true }).click();
  await expect(page.locator('#flash_notice')).toContainText('Successful creation.');
  await expect(page.getByText('Successful creation.')).toBeVisible();
});