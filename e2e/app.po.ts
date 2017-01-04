import { browser, element, by } from 'protractor';

export class Directory2Page {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.id('applicationTitle')).getText();
  }

  getSearch() {
    return element(by.id('search'));
  }

  getCardCount() {
    return element.all(by.css('.card')).count();
  }

  getCardTitle() {
    return element(by.css('.card'));
  }
}
