import {clearElement, createElement} from '../utils/helper/domHandlers.js';
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
            message.innerHTML = `<div class='validate-info'>
                <p>✅ <strong>Valid JSON</strong></p>
                <p>Click on the Format button to beautify your JSON.</p>
            </div>`;
        } catch (e) {
            const errorPosition = e.message.match(/at position (\d+)/);
            const position = errorPosition ? parseInt(errorPosition[1], 10) : null;
            if (position !== null) {
                const lines = json.slice(0, position).split('\n');
                const lineNumber = lines.length;
                const columnNumber = lines[lines.length - 1].length + 1;
                message.innerHTML = `<div class='validate-error'>
                    <p>❌ <strong>Invalid JSON</strong></p>
                    <p>Reason: <code>${e.message}</code></p>
                    <p>Line: ${lineNumber}, Column: ${columnNumber}</p>
                </div>`;
            } else {
                message.innerHTML = `
                <div class='validate-error'>
                    <p>❌ <strong>Invalid JSON</strong></p>
                    <p>Reason: <code>${e.message}</code></p>
                </div>`;
            }
        }
        utils.copyToClipBoard(this.display, createElement("div")[0]);
    }

}
export default ValidateView;