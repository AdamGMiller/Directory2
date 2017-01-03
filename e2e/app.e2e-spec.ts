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
});
