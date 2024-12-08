import {createElement, appendChild, addAsSibling, clearElement } from '../utils/helper/domHandlers.js';
import * as utils from '../utils/copyClipBoard.js';

class TableView {
    constructor(display) {
       this.display = display;
       this.table = '';

       this.objIndex = 0;
       [this.limitContainer, this.limitInfo, this.limitBtn, this.nextBtn, this.prevBtn] = 
       createElement("div","span", "button", "button", "button");
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
    initLimitation(data) {
        const dataSize = data?.length || 0;
        this.limitBtn.textContent = 'Limit to one object';
        this.nextBtn.textContent = 'Next';
        this.prevBtn.textContent = 'Previous';

        this.limitBtn.addEventListener('click', () => {
            this.display.querySelector(".table-body").innerHTML = '';
            if(this.limitBtn.textContent === 'Limit to one object') {
                this.limitInfo.textContent = `${this.objIndex+1} of ${dataSize} The data is limited to one object `;
                this.limitInfo.classList.add('key');
                this.limitBtn.textContent = 'Expand';
                this.limitContainer.prepend(this.nextBtn, this.prevBtn);
                if(dataSize) {
                    this.convertToTable(data[this.objIndex]);
                } else {
                    this.nextBtn.remove();
                    this.prevBtn.remove();
                    this.limitInfo.textContent = `Single object can't be limited`;
                    this.convertToTable(data);
                }
            } else {
                this.limitInfo.textContent = '';
                this.limitBtn.textContent = 'Limit to one object';
                this.nextBtn.remove();
                this.prevBtn.remove();
                this.convertToTable(data);
            }
        });
        this.nextBtn.addEventListener('click', () => {
            this.objIndex++;
            if(this.objIndex < dataSize) {
                this.nextBtn.disabled = true;
                this.prevBtn.disabled = false;
            }
            if(dataSize) {
                console.log(this.objIndex);
                this.display.querySelector(".table-body").innerHTML = '';
                this.limitInfo.textContent = `${this.objIndex+1} of ${dataSize} The data is limited to one object `;
                this.convertToTable(data[this.objIndex]);
            }
        })
        this.prevBtn.addEventListener('click', () => {
            this.objIndex--;
            if(this.objIndex >=0) {
                this.prevBtn.disabled = true;
                this.nextBtn.disabled = false;
            }
            if(dataSize && this.objIndex >= 0) {
                this.display.querySelector(".table-body").innerHTML = '';
                this.limitInfo.textContent = `${this.objIndex+1} of ${dataSize} The data is limited to one object `;
                this.convertToTable(data[this.objIndex]);
            }
        })
        this.limitContainer.append(this.limitInfo, this.limitBtn);
        this.limitContainer.classList.add('limit-container');
        this.display.prepend(this.limitContainer);

      
    }
    setDisplay(data) {
        clearElement(this.display);
        try {
            const parsedData = JSON.parse(data);
            this.display.innerHTML = this.initTable();
            this.initLimitation(parsedData);
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
            td_3.append(this.setCopyBtn(createElement("button")[0], "copy-btn", "⎘", newKey, value));
            tr.append(td_1,td_2,td_3);
            appendChild(this.table, tr);
            if(typeof value === 'object' && value !==null) {
                this.convertToTable(value, newKey);
            }
        }
    }
   
}
export default TableView;