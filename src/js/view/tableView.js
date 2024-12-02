import {createElement, appendChild, addAsSibling, clearElement } from '../utils/helper/domHandlers.js';
import * as utils from '../utils/copyClipBoard.js';

class TableView {
    constructor(display) {
       this.display = display;
       this.table = '';
    }

    initTable() {
       return `
       <table class='table-format'>
            <thead>
                <tr>
                    <th>Field</th>
                    <th>Value</th>
                    <th>Copy</th>
                </tr>
            </thead>
            <tbody class='table-body'>
            </tbody>
        </table>`
    }
    setDisplay(data) {
        clearElement(this.display);
        try {
            const parsedData = JSON.parse(data);
            this.display.innerHTML = this.initTable();
            this.table = this.display.querySelector(".table-body");
            this.convertToTable(parsedData);
        } catch(e) {
            this.display.style.color = 'orange';
            this.display.innerHTML = this.handleError(e);
            console.warn(e);
        }
    }
    handleError(error) {
        const errorInfo = `<span class='key error-info'>${error.message}</span>`;
        return errorInfo;
    }
    setCopyBtn(button, cls, text, key, value) {
        button.classList.add(cls);
        button.textContent = text;
        button.setAttribute('key-value', `${key}:${typeof value === 'object' ? JSON.stringify(value) : value}`);
        return button;
    }
    convertToTable(data, prefix='') {
        for(const obj in data) {
            const key = obj;
            const value = data[obj];
            const newKey = prefix ? `${prefix}.${key}` : key;
            const [tr, td_1, td_2, td_3] = createElement("tr","td","td","td");
            td_1.textContent = newKey;
            td_2.textContent = typeof value!=='object'?value: `{size: ${Object.keys(value).length}}`;
            td_3.append(this.setCopyBtn(createElement("button")[0], "copy-btn", "copy", newKey, value));
            tr.append(td_1,td_2,td_3);
            appendChild(this.table, tr);
            if(typeof value === 'object' && value !==null) {
                this.convertToTable(value, newKey)
            }
        }
    }
   
}
export default TableView;