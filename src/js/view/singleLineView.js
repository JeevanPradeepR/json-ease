import * as utils from '../utils/copyClipBoard.js';
import {createElement, appendChild, addAsSibling, clearElement } from '../utils/helper/domHandlers.js';

class SingleLineView {
    constructor(display){
        this.display = display;
    }
    setDisplay(data) {
        try {
            const parsedData = JSON.parse(data);
            this.display.innerHTML = this.singleLineData(parsedData);
            this.setCopyData(this.display.innerText);
        } catch(err) {
            this.display.style.color = 'orange';
            this.display.innerHTML = this.handleError(err);
        }
        utils.copyToClipBoard(this.display, createElement("div")[0]);
    }
    handleError(error) {
        const errorInfo = `<span class='singleline-error'>${error.message}</span>`;
        this.setCopyData(error.message);
        return errorInfo;
    }
    singleLineData(data) {
        const lineText = `<span class='singleline-info'> ${JSON.stringify(data)} </span>`;
        return lineText;
    }
    
    setCopyData(copy) {
        this.copy = copy;
    }

    getCopyData() {
        return this.copy;
    }
}
export default SingleLineView;