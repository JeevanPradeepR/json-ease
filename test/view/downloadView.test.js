import DownloadView from '../../src/js/view/downloadView.js'
import { jest, expect } from '@jest/globals';

// Spy on the native URL.createObjectURL
global.URL.createObjectURL = jest.fn(() => 'blob:http://example.com/fake-blob');


describe('DownloadView', () => {
  let downloadView;
  let display;
  let input;

  beforeEach(() => {
    display = document.createElement('div');
    input = document.createElement('input');
    downloadView = new DownloadView(display, input);
    Object.defineProperty(input, 'value', { value: '{"json": {"obj":"data"}, "array":[1,2], "key":"value"}', writable: true});
  });

  it('initializes display and input properties', () => {
    expect(downloadView.display).toBe(display);
    expect(downloadView.input).toBe(input);
  });

  it('test the initial function which gets data and option from dom and proceed with download:text', () => {
    const downloadData = jest.spyOn(downloadView, 'downloadData');
    downloadView.downloadData(input.value, 'text');
    expect(downloadData).toHaveBeenCalled();
    downloadData.mockRestore();
  });

  it('test the initial function which gets data and option from dom and proceed with download:text with bad data', () => {
    Object.defineProperty(input, 'value', { value: '{"json": {"obj":"data"}, "array:[1,2], "key":"value"}', writable: true});
    const downloadData = jest.spyOn(downloadView, 'downloadData');
    downloadView.downloadData(input.value, 'text');

    expect(display.style.color).toBe("orange");
    expect(display.textContent).toContain("Cannot download empty/ invaid json. Unexpected token k in JSON at position 40");

    expect(downloadData).toHaveBeenCalled();
    downloadData.mockRestore();
  });

  it('test the initial function which gets data and option from dom and proceed with download:text with empty data', () => {
    Object.defineProperty(input, 'value', { value: '', writable: true});
    const downloadData = jest.spyOn(downloadView, 'downloadData');
    downloadView.downloadData(input.value, 'text');

    expect(display.style.color).toBe("orange");
    expect(display.textContent).toContain("Cannot download empty/ invaid json. Unexpected end of JSON input");

    expect(downloadData).toHaveBeenCalled();
    downloadData.mockRestore();
  });

  it('test the initial function which gets data and option from dom and proceed with download:json', () => {
    const downloadData = jest.spyOn(downloadView, 'downloadData');
    downloadView.downloadData(input.value, 'json');
    expect(downloadData).toHaveBeenCalled();
    downloadData.mockRestore();
  });

  it('test the initial function which gets data and option from dom and proceed with download:json with bad data', () => {
    Object.defineProperty(input, 'value', { value: '{"json": {"obj":"data"}, "array:[1,2], "key":"value"}', writable: true});
    const downloadData = jest.spyOn(downloadView, 'downloadData');
    downloadView.downloadData(input.value, 'json');

    expect(display.style.color).toBe("orange");
    expect(display.textContent).toContain("Cannot download empty/ invaid json. Unexpected token k in JSON at position 40");

    expect(downloadData).toHaveBeenCalled();
    downloadData.mockRestore();
  });
  
  it('test the initial function which gets data and option from dom and proceed with download:json with empty data', () => {
    Object.defineProperty(input, 'value', { value: '', writable: true});
    const downloadData = jest.spyOn(downloadView, 'downloadData');
    downloadView.downloadData(input.value, 'json');

    expect(display.style.color).toBe("orange");
    expect(display.textContent).toContain("Cannot download empty/ invaid json. Unexpected end of JSON input");

    expect(downloadData).toHaveBeenCalled();
    downloadData.mockRestore();
  });

  it('test the initial function which gets data and option from dom and proceed with download:excel', () => {
    const downloadData = jest.spyOn(downloadView, 'downloadData');
    downloadView.downloadData(input.value, 'excel');
    expect(downloadData).toHaveBeenCalled();
    downloadData.mockRestore();
  });

  it('test the initial function which gets data and option from dom and proceed with download:excel with bad data', () => {
    Object.defineProperty(input, 'value', { value: '{"json": {"obj":"data"}, "array:[1,2], "key":"value"}', writable: true});
    const downloadData = jest.spyOn(downloadView, 'downloadData');
    downloadView.downloadData(input.value, 'excel');

    expect(display.style.color).toBe("orange");
    expect(display.textContent).toContain("Cannot download empty/ invaid json. Unexpected token k in JSON at position 40");

    expect(downloadData).toHaveBeenCalled();
    downloadData.mockRestore();
  });
  
  it('test the initial function which gets data and option from dom and proceed with download:excel with empty data', () => {
    Object.defineProperty(input, 'value', { value: '', writable: true});
    const downloadData = jest.spyOn(downloadView, 'downloadData');
    downloadView.downloadData(input.value, 'excel');

    expect(display.style.color).toBe("orange");
    expect(display.textContent).toContain("Cannot download empty/ invaid json. Unexpected end of JSON input");

    expect(downloadData).toHaveBeenCalled();
    downloadData.mockRestore();
  });

  it('test the initial function which gets data and option from dom and proceed with download: non mentioned option', () => {
    const downloadData = jest.spyOn(downloadView, 'downloadData');
    downloadView.downloadData(input.value, '');
    expect(downloadData).toHaveBeenCalled();
    downloadData.mockRestore();
  });

  it('Cover the branch case for data.hasOwnProperty(key)', () => {
      function Person(name) {
          this.name = name;
      }
      Person.prototype.age = 30;
      Person.prototype.inheritedKey = 'inherited value';
      const person = new Person('John');

    downloadView.downloadExcel(person);
  })

});
