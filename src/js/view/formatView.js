import {createElement, appendChild, addAsSibling, clearElement } from '../utils/helper/domHandlers.js';
import * as utils from '../utils/copyClipBoard.js';

class FormatView {
    constructor(display){
       this.display = display;
       this.copy = '';
       this.space = 2;//default space
    }

    setDisplay(data, space) {
        clearElement(this.display);
        const modifiedJson = this.fixJSON(data);
           if(modifiedJson.result) {
                const formattedData = this.jsonConvert(modifiedJson.data, space);
                this.display.innerHTML = formattedData;
           } else {
               const error = this.handleError(modifiedJson.data);
               this.display.innerHTML = error;
           }
           utils.copyToClipBoard(this.display, createElement("div")[0]);
    }

    setCopyData(copy) {
        this.copy = copy;
    }

    getCopyData() {
        return this.copy;
    }

    handleError(error) {
        const errorInfo = `<span class='error-info'>${error.message}</span>`;
        this.setCopyData(error.message);
        return errorInfo;
    }
    fixJSON(jsonString) {
        // Remove trailing commas
        jsonString = jsonString.replace(/,\s*([}\]])/g, '$1');
        
        // Replace single quotes with double quotes
        jsonString = jsonString.replace(/'/g, '"');
        
        // Add missing double quotes around keys
        jsonString = jsonString.replace(/([{,])\s*(\w+)\s*:/g, '$1"$2":');
        
        try {
            // Parse the fixed JSON string
            let obj = JSON.parse(jsonString);
            return {result:true, data: jsonString, json: obj};
        } catch (error) {
            console.warn('Error parsing JSON:', error);
            return {result:false, data: error};
        }
    }
    jsonConvert(jsonString, spaces = 2) {
        let obj;
        try {
            obj = JSON.parse(jsonString);
        } catch (e) {
            console.error('Invalid JSON:', e);
            return null;
        }
    
        const jsonStringified = JSON.stringify(obj, null, spaces*1);
        this.setCopyData(jsonStringified);

        const jsonHighlighted = this.syntaxHighlight(jsonStringified);
    
        return `<pre>${jsonHighlighted}</pre>`;
    }
    
    syntaxHighlight(json) {   
        json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|\b-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?|[{}\[\],])/g, this.matchColor);
    }
    
    matchColor(match) {
        let cls = 'number'; 
    
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';

            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        } else {
            if(/[0-9]/.test(match)){
                cls = 'number'
            }else{
            cls= 'braces'
            }
        }
    
        return `<span class="${cls}">${match}</span>`;
    }
}
export default FormatView;