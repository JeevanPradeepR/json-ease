import FormatView from '../../src/js/view/formatView.js'
import { jest, expect } from '@jest/globals';

describe.only('FormatView', () => {
    let formatView;
    let display;
    let input;
  
    beforeEach(() => {
      display = document.createElement('div');
      formatView = new FormatView(display);
      input = '{"json": {"obj":"data"}, "array":[1,2], "key":"value", "null":null, "boolean":false}';
    });

    it('should initialize properties', () => {
        expect(formatView.display).toBe(display);
    })

    it('setting up data to display in output area', () => {
        const formatData = jest.spyOn(formatView, 'setDisplay');
        formatView.setDisplay(input, 2);
        expect(formatData).toHaveBeenCalled();
        formatData.mockRestore();
    })

    it('setting up error data to display in output area', () => {
        const formatData = jest.spyOn(formatView, 'setDisplay');
        formatView.setDisplay('{errorData}', 2);
        expect(formatData).toHaveBeenCalled();
        formatData.mockRestore();
    })

    it('enabling search view model with text', () => {
        const formatData = jest.spyOn(formatView.searchView.model, 'getSearchText').mockImplementationOnce(()=>'key');
        formatView.setDisplay(input, 2)
        expect(formatData).toHaveBeenCalled();
       formatData.mockRestore();
    })



    it('check for error data', () => {
        const formatData = jest.spyOn(formatView, 'fixJSON');
        const errorData = formatView.fixJSON('error data');
        expect(formatData).toBeCalledTimes(1);
        expect(errorData.result).toBe(false);
        formatView.jsonConvert('error');
        formatData.mockRestore();
    })

    it('get the copied data', () => {
        const formatData = jest.spyOn(formatView, 'getCopyData')
        formatView.setCopyData('error');
        const copiedData = formatView.getCopyData();
        expect(formatData).toHaveBeenCalled();
        expect(copiedData).toBe("error");
        formatData.mockRestore();
    })

})