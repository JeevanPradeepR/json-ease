import {createElement, appendChild, addAsSibling, clearElement } from '../utils/helper/domHandlers.js';
import * as utils from '../utils/copyClipBoard.js';

class TreeView {
    constructor(display) {
       this.display = display;
    }

    setDisplay(data) {
        clearElement(this.display);
        try {
            const parsedData = JSON.parse(data);
            const parentElement = createElement("div")[0];
            parentElement.classList.add("details");
            this.convertToTree(parsedData, parentElement);
            appendChild(this.display, parentElement)
            utils.copyToClipBoard(this.display, createElement("div")[0]);
        } catch(e) {
            this.display.style.color = 'orange';
            this.display.innerHTML = this.handleError(e);
            console.warn(e)
        }
    }
    handleError(error) {
        const errorInfo = `<br><br><br><span class='key error-info'>${error.message}</span>`;
        return errorInfo;
    }
    handleTreeValue(key, value) {
        if(Array.isArray(value)) {
            return [ key + `[${value.length}]`];
        }else if(typeof value === 'object' && value!==null) {
            return [ key + `{${Object.keys(value).length}}`];
        } else {
            return [null,`${key} : ${value}`];
        }
    }

    convertToTree(obj, parentElement, prefix = '') {
        for (let key in obj) {
            const value = obj[key];
            const [details, summary, content, summaryText] = createElement("details", "summary", "div", "span");
            
            // Add class names for styling
            summaryText.classList.add("tree-key");
            summaryText.classList.add("key");
            content.classList.add("tree-value");
            if(Array.isArray(value)) {
                content.classList.add("array");
            } else if (typeof value === "string") {
                content.classList.add("string");
            } else if (typeof value === "number" && !Number.isNaN(value)) {
                content.classList.add("number");
            } else if (typeof value === "boolean") {
                content.classList.add("boolean");
            } else {
                content.classList.add("null");
            }

            summaryText.classList.add("tree-non-collapse")
    
            // Optionally open the <details> tag
            details.open = true;
        
            [summaryText.textContent, content.textContent] = this.handleTreeValue(key, value);
            appendChild(summary, summaryText)
            // If there's no content (empty object or array), we just append the summary
            const newKey = prefix ? `${prefix}.${key}` : key;
           // console.log(typeof key, typeof value, key, value)
            summaryText.setAttribute("data-path", newKey);
            content.setAttribute("data-path", newKey);
            if (!content.textContent) {
                // Append the details to the parent element
                appendChild(parentElement, details);
                appendChild(details, summary);
            } else {
                addAsSibling(parentElement,content)  // Add content (value) after the summary
            }
    
            // If the value is an object (to create nested tree display), recurse
            if (typeof value === "object" && value !== null) {
                this.convertToTree(value, details, newKey);  // Recursively convert objects
            }
        }
    }
}
export default TreeView;