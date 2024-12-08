import {createElement, appendChild, addAsSibling, clearElement } from '../utils/helper/domHandlers.js';
import * as utils from '../utils/copyClipBoard.js';

class FormatView {
    constructor(display){
       this.display = display;
       this.copy = '';
       this.input = createElement("input")[0];
       this.searchBtn = createElement("button")[0];
       this.searchContainer = createElement("div")[0];
       [this.next, this.prev, this.count] = createElement("button", "button", "p");
       this.index = -1;
    }

    setDisplay(data, space) {
        clearElement(this.display);
        const modifiedJson = this.fixJSON(data);
           if(modifiedJson.result) {
                const formattedData = this.jsonConvert(modifiedJson.data, space);
                this.display.innerHTML = formattedData;
                this.initializeSearchEvent();
           } else {
               const error = this.handleError(modifiedJson.data);
               this.display.innerHTML = error;
           }
           utils.copyToClipBoard(this.display, createElement("div")[0]);
    }

    initializeSearchEvent() {
        this.searchContainer.innerHTML = '';
        this.input.value = '';
        this.searchContainer.classList.add('search-container');
        this.searchBtn.classList.add('search-btn');
        this.input.classList.add('search-input');
        this.input.type = 'search';
        this.searchContainer.append(this.input, this.searchBtn);
        this.display.prepend(this.searchContainer);
        this.searchBtn.textContent = 'Search';
        this.searchBtn.addEventListener('click', () => {
            const searchValue = this.input.value;
            this.search(searchValue);
        })
        this.next.textContent = '↓';
        this.prev.textContent = '↑';

        this.input.addEventListener('search', () => {
            if (this.input.value === '') {
              console.log('Search input was cleared (cancelled)');
              this.removePreviousHighlights();
            } else {
              console.log('Search initiated with:', this.input.value);
            }
          });
        this.next.addEventListener('click', () => {
            const highlightedElement = document.querySelector('.highlighted');
            this.removeActiveHighlight();
            if(highlightedElement) {
                const highlightedElements = document.querySelectorAll('.highlighted');
              //  const currentIndex = Array.from(highlightedElements).indexOf(highlightedElement);
                const currentIndex = this.index++;
                const nextIndex = (currentIndex + 1) % highlightedElements.length;
                this.count.textContent = `${nextIndex+1} of ${highlightedElements.length}`;
                const nextMatch = highlightedElements[nextIndex];
                nextMatch.classList.add("active");
                // Scroll to the next match
                nextMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });                             
            }

        })
        this.prev.addEventListener('click', () => {
            const highlightedElement = document.querySelector('.format-json').querySelector('.highlighted');
            this.removeActiveHighlight();
    
            if (highlightedElement) {
                const highlightedElements = document.querySelectorAll('.highlighted');
                let currentIndex = this.index--;
                console.log(currentIndex);
                if(currentIndex < 0) {
                    this.index = highlightedElements.length; 
                    currentIndex=this.index;
                    this.index--;
                }
                const prevIndex = (currentIndex - 1 + highlightedElements.length) % highlightedElements.length;
                this.count.textContent = `${prevIndex+1} of ${highlightedElements.length}`;
                // Wrap around if it's the last match
                const prevMatch = highlightedElements[prevIndex];
                prevMatch.classList.add("active");
                // Scroll to the next match
                prevMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        })
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                this.next.click();
            } else if (event.key === 'ArrowLeft') {
                this.prev.click();
            }
        })

    }
    removePreviousHighlights() {
        const highlightedElements = document.querySelectorAll('.highlighted');
        highlightedElements.forEach((element) => {
            const parentElement = element.parentElement;
            const parentElementText = parentElement.textContent;
            element.remove();
            parentElement.textContent = parentElementText;
        });
        this.count.textContent = '';
        this.index = -1;
    }
    removeActiveHighlight() {
        const highlightedElements = document.querySelectorAll('.highlighted');
        highlightedElements.forEach((element) => {
            element.classList.remove('active');
        });
    }
    search(value) {
        // Ensure the search value is valid
        if (!value.length) {
            console.log("Please provide a valid search value.");
            this.count.textContent = '0 matches';
            return;
        }
        // Remove previously highlighted searches
        this.removePreviousHighlights();
        // Use a regular expression that matches the text, excluding HTML tags
        let regex = new RegExp(`(?![^<]*>)(?<=^|>)([^<]*?)(${value})([^<]*?)(?=<|$)`, 'gi');

        // Perform the search
        let content = document.querySelector('.format-json').innerHTML;

      //  content = content.replace(new RegExp(value, 'gi'), `<span class='highlighted' style='background-color: yellow'>${value}</span>`);
        let matchCount = 0;
        // Replace each match and count occurrences using a callback
        // Replace matched text with highlighted span and avoid modifying HTML tags
        content = content.replace(regex, (match, p1, p2, p3) => {
            matchCount++; 
            return `${p1}<span class='highlighted' style='background-color: yellow'>${p2}</span>${p3}`;
          });
                  
        if(matchCount) {
            this.searchContainer.append(this.prev, this.next, this.count);
            this.prev.classList.add('prev');
            this.next.classList.add('next');
            this.prev.classList.remove('prev-hide');
            this.next.classList.remove('next-hide');
            this.count.classList.add('count');
        } else {
            this.searchContainer.append(this.count);
            this.prev.classList.add('prev-hide');
            this.next.classList.add('next-hide');
        }
        this.count.textContent = `${matchCount} matches`;
        document.querySelector('.format-json').innerHTML = content;

        const highlightedElement = document.querySelector('.format-json').querySelector('.highlighted');
        if (highlightedElement) {
            highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
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
    
        return `<pre class="format-json">${jsonHighlighted}</pre>`;
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