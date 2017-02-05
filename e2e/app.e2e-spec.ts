import { Directory2Page } from './app.po';

describe('directory2 App', function () {
  let page: Directory2Page;

  beforeEach(() => {
    page = new Directory2Page();
  });

  it('should display message saying Directory Search', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Directory Search');
  });

  it('should display 10 people by default', () => {
    page.navigateTo();
    expect(page.getCardCount()).toEqual(10);
  });

  it('should enter search', () => {
    page.navigateTo();
    const el = page.getSearch();
    el.click();
    el.sendKeys('Adam\n');
    expect(el.getAttribute('value')).toEqual('Adam');
  });

  it('should find Adam Miller', () => {
    page.navigateTo();
    const el = page.getSearch();
    el.click();
    el.sendKeys('Adam Miller\n');
    expect(page.getCardCount()).toBeGreaterThan(0);
  });
});
