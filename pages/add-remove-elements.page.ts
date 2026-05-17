import { type Locator, type Page } from '@playwright/test';

export class AddRemoveElementsPage {
  readonly page: Page;
  readonly addElementButton: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addElementButton = page.getByRole('button', { name: 'Add Element' });
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
  }

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/add_remove_elements/');
  }

  async addElement() {
    await this.addElementButton.click();
  }
}
