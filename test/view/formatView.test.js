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

    it('setting up data to display in outpur area', () => {
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
})