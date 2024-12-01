import {clearElement, createElement, addAsSibling} from '../utils/helper/domHandlers.js';
import * as utils from '../utils/copyClipBoard.js';
class ValidateView {
    constructor(display){
       this.display = display;
    }

    setDisplay(data) {
        clearElement(this.display);
        this.validateJson(data);
    }

    getCopyData() {
        return this.display.textContent.replace("⎘",'').replace(/\d+/, '');
    }

    validateJson(json) {
        const message = this.display;
        try {
            JSON.parse(json);
            message.style.color = "green";
            message.innerHTML = `
                <p>✅ <strong>Valid JSON</strong></p>
                <p>Click on the format button to beautify your JSON.</p>
            `;
        } catch (e) {
            message.style.color = "red";
            const errorPosition = e.message.match(/at position (\d+)/);
            const position = errorPosition ? parseInt(errorPosition[1], 10) : null;
            if (position !== null) {
                const lines = json.slice(0, position).split('\n');
                const lineNumber = lines.length;
                const columnNumber = lines[lines.length - 1].length + 1;
                message.innerHTML = `
                    <p>❌ <strong>Invalid JSON</strong></p>
                    <p>Reason: <code>${e.message}</code></p>
                    <p>Line: ${lineNumber}, Column: ${columnNumber}</p>
                `;
            } else {
                message.innerHTML = `
                    <p>❌ <strong>Invalid JSON</strong></p>
                    <p>Reason: <code>${e.message}</code></p>
                `;
            }
        }
        utils.copyToClipBoard(this.display, createElement("div")[0]);
    }

}
export default ValidateView;