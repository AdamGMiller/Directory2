import { Directory2Page } from './app.po';

describe('directory2 App', function() {
  let page: Directory2Page;

  beforeEach(() => {
    page = new Directory2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
