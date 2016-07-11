import { HcaShellPage } from './app.po';

describe('hca-shell App', function() {
  let page: HcaShellPage;

  beforeEach(() => {
    page = new HcaShellPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
