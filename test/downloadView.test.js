import DownloadView from '../src/js/view/downloadView.js'
describe('DownloadView', () => {
  let downloadView;
  let display;
  let input;

    it('initializes display and input properties', () => {
      display = document.createElement('div');
      input = document.createElement('input');
      downloadView = new DownloadView(display, input);
      expect(downloadView.display).toBe(display);
      expect(downloadView.input).toBe(input);
    });
 
});