import { Locator, Page } from "@playwright/test";

export class PageUtilities {

    private page: Page

    constructor(page: Page) {
        this.page = page
    }

    async getTableAsListMap(tableLocator: Locator): Promise<Array<Record<string, string>>> {
        const headers = await tableLocator.locator('th').allInnerTexts();
        const rowLocators = await tableLocator.locator('tbody tr').all();

        return Promise.all(
            rowLocators.map(async (row) => {
                const cells = await row.locator('td').allInnerTexts();
                return Object.fromEntries(
                    headers.map((header, index) => [header.trim(), cells[index]?.trim() || ''])
                );
            })
        );
    }
}