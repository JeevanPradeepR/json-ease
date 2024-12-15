import {createElement, appendChild, addAsSibling, clearElement } from '../utils/helper/domHandlers.js';
import * as utils from '../utils/copyClipBoard.js';
import SearchWidget from '../widget/search_widget/search.js';

class TreeView {
    constructor(display) {
       this.display = display;
       this.space = 2;
       this.searchView = SearchWidget;
    }

    setDisplay(data, space) {
        clearElement(this.display);
        try {
            const parsedData = JSON.parse(data);
            const parentElement = createElement("div")[0];
            parentElement.classList.add("details");
            parentElement.classList.add("search-widget-container");
            this.convertToTree(parsedData, parentElement);
            appendChild(this.display, parentElement)
            this.space = space;
            const classesToRemove = ['space-value-2', 'space-value-4', 'space-value-8'];
            if (classesToRemove.some(cls => parentElement.classList.contains(cls))) {
                classesToRemove.forEach(cls => parentElement.classList.remove(cls));
            }
            parentElement.classList.add(`space-value-${this.space}`)
            this.searchView.view.attachElement({parentElement: this.display});
            utils.copyToClipBoard(this.display, createElement("div")[0]);
        } catch(e) {
            this.display.innerHTML = this.handleError(e);
            console.warn(e)
        }
    }
    handleError(error) {
        const errorInfo = `<span class='tree-error'>${error.message}</span>`;
        return errorInfo;
    }
    handleTreeValue(key, value) {
        if(Array.isArray(value)) {
            return [ key + `[${value.length}]`, false];
        }else if(typeof value === 'object' && value!==null) {
            return [ key + `{${Object.keys(value).length}}`, false];
        } else {
            return [null, true];
        }
    }

    convertToTree(obj, parentElement, prefix = '') {
        for (let key in obj) {
            const value = obj[key];
            const [details, summary, content, summaryText] = createElement("details", "summary", "div", "span");
            
            // Add class names for styling
            summaryText.classList.add("tree-key");
            content.classList.add("tree-value");

            summaryText.classList.add("tree-non-collapse")

    
            // Optionally open the <details> tag
            details.open = true;
            let isKeyValue = false;
            [summaryText.textContent, isKeyValue] = this.handleTreeValue(key, value);
            appendChild(summary, summaryText)
            // If there's no content (empty object or array), we just append the summary
            const newKey = prefix ? `${prefix}.${key}` : key;
           // console.log(typeof key, typeof value, key, value)
            summaryText.setAttribute("data-path", newKey);
            content.setAttribute("data-path", newKey);
            
            if (isKeyValue) {
                // Add content (value) after the summary
                content.innerHTML = `<span class='line-tree-key' data-path='${newKey}'>${key}</span> : <span class= 'line-tree-value' data-path='${newKey}'>${value}</span><div>`
                addAsSibling(parentElement,content);  
            } else {
                // Append the details to the parent element
                appendChild(parentElement, details);
                appendChild(details, summary);
            }
            // If the value is an object (to create nested tree display), recurse
            if (typeof value === "object" && value !== null) {
                this.convertToTree(value, details, newKey);  // Recursively convert objects
            }
        }
    }
}
export default TreeView;