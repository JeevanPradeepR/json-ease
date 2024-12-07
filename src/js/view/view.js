//contains dom manipulations, mainly for UI
import TreeView from "./treeView.js";
import ValidateView from "./validateView.js";
import FormatView from "./formatView.js";
import SingleLineView from "./singleLineView.js";
import TableView from "./tableView.js";
import DownloadView from "./downloadView.js";
class View {
    constructor() {
        this.inputArea = document.querySelector('.input-area');
        this.inputArea.value = `[{"grossary":{
            "title": "biscuit",
            "quantity": 1,
            "type": {"product":"britinnia", "price":20},
            "offer": ["scale", "sticker"],
            "discount": false
        }}, {"grossary":{
            "title": "biscuit",
            "quantity": 1,
            "type": {"product":"britinnia", "price":20},
            "offer": ["scale", "sticker"],
            "discount": false
        }}]`;
        this.convertBtn = document.querySelector('.convert-btn');
        this.outputArea = document.querySelector('.output-area');
        this.copyBtn = document.querySelector(".copy");
        this.tabSpaceBtn = document.querySelector(".tab-space-btn");
        this.path = document.querySelector('.path');
        this.downloadBtn = document.querySelector(".download-btn");
        this.copyText='';
        this.space = 2;
        this.validateView = new ValidateView(this.outputArea);
        this.formatView = new FormatView(this.outputArea);
        this.singleLineView = new SingleLineView(this.outputArea);
        this.treeView = new TreeView(this.outputArea);
        this.tableView = new TableView(this.outputArea);
        this.downloadView = new DownloadView(this.outputArea, this.inputArea);
        this.path.classList.add('path-none');

    }
    getInput() {
        return this.inputArea.value;
    }
    setCopyText(copy) {
        this.copyText = copy;
    }
    getCopyText() {
        return this.copyText;
    }
    setDisplay(data, option) {
        console.log(option)
        this.path.classList.add('path-none');
        if(option==='validate') {
            this.validateView.setDisplay(data);
            this.setCopyText(this.validateView.getCopyData());
        }
        if(option==='format'){
            this.formatView.setDisplay(data, this.space);
            this.setCopyText(this.formatView.getCopyData());
        }
        if(option==='to-single-line') {
            this.singleLineView.setDisplay(data);
            this.setCopyText(this.singleLineView.getCopyData());
        }
        if(option==='to-tree') {
            this.path.classList.remove('path-none');
            this.treeView.setDisplay(data, this.space);
        }
        if(option==='to-table') {
            this.tableView.setDisplay(data);
        }
    }

    setRootPath(path) {
        this.path.textContent = path;
    }
    bindConvert(handler) {
        this.convertBtn.addEventListener('click', function(event) {
            if(event.target && event.target.tagName === 'BUTTON') {
                //event.target.value = validate, format, to-tree, to-table, to-single-line, download
                    handler(event.target.value)
            }
        });
    }
    bindSpace(handler) {
        this.tabSpaceBtn.addEventListener('change',(event)=>{
           const {json, option, spaces} = handler(event.target.value);
           if(json) {
                this.space = spaces*1;
                this.setDisplay(json,option);
           } else {
                this.space = spaces*1;
           }
        })
    }
    bindDownload(handler) {
        this.downloadBtn.addEventListener('change', (event)=> {
            const {data, downloadAs} = handler(event.target.value);
            this.downloadView.downloadData(data, downloadAs);
            event.target.selectedIndex = 0; 
            event.preventDefault();
        })
    }
    addHighlight(event, cls, prev) {
            console.log(prev)
            if (prev) {
              prev.classList.remove(cls);
            }
            event.target.classList.add(cls);
    }
    bindEvents(handler) {
        this.outputArea.addEventListener('click', (event) => {
            const target = event.target;
            if(target.classList.contains('search-btn') || target.classList.contains('search-input')) {
                  return;
            }
            const highlight = target.querySelector(".highlight");
            if (highlight) {
                highlight.classList.remove('highlight');
            }
            // Handle the case when the target is a span with 'tree-non-collapse' class
            if (target.tagName === 'SPAN' && target.classList.contains('tree-non-collapse')) {
                event.preventDefault();
            }
    
            // Handle clicks on elements that are part of the tree (tree-key, tree-value, etc.)
            if (
                target.classList.contains('tree-key') ||
                target.classList.contains('tree-value') ||
                target.classList.contains('tree-non-collapse') ||
                target.classList.contains('line-tree-key') ||
                target.classList.contains('line-tree-value')
            ) {
                const path = target.getAttribute('data-path');
                this.setCopyText(path);  // Set the copy text
                handler(path);           // Call the handler with the path
                
                // Add or remove the highlight class
                const preHighlightedField = this.outputArea.querySelector(".highlight");
                this.addHighlight(event, 'highlight', preHighlightedField);
            } else {
                if(target.classList.contains('highlight')) {
                    target.classList.remove('highlight');
                }
            }
    
            // Handle clicks on buttons with 'copy-btn' class (for copying values)
            if (target.tagName === 'BUTTON' && target.classList.contains('copy-btn')) {
                const keyValue = target.getAttribute('key-value');
                this.setCopyText(keyValue);  // Set the copy text from the button
            }

            // Check if the target is either a "copy" or "copy-btn" element
            if (target.classList.contains("copy") || target.classList.contains("copy-btn")) {
                console.log('bind copy');  // Logging the action (could be removed in production)

                // Get the text content to be copied
                const jsonContent = this.getCopyText(); 

                // Attempt to copy the text to the clipboard
                navigator.clipboard.writeText(jsonContent)
                    .then(() => {
                        alert('JSON copied to clipboard!');  // Inform the user about success
                        // Optionally, you could call the handler here if necessary
                        // handler('JSON copied');
                    })
                    .catch(err => {
                        console.error('Could not copy text: ', err);  // Log the error
                        // Optionally, you could call the handler here for error feedback
                        // handler('JSON error', err);
                    });
            }
        });
    }
    
} 
export {View}
