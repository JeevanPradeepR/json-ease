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
        this.inputArea.value = `{"grossary":{
            "title": "biscuit",
            "quantity": 1,
            "type": {"product":"britinnia", "price":20},
            "offer": ["scale", "sticker"],
            "discount": false
        }}`;
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
            this.treeView.setDisplay(data);
        }
        if(option==='to-table') {
            this.tableView.setDisplay(data);
          //  this.setCopyText(this.tableView.getCopyData());
        }
       // this.treeView.setDisplay(data)
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

    bindCopy(handler){
        this.outputArea.addEventListener('click', (event) => {
            if(event.target.classList.contains("copy") || 
            event.target.classList.contains("copy-btn") ) {
                      console.log('bind copy')
        
                    const jsonContent = this.getCopyText(); 
                    navigator.clipboard.writeText(jsonContent).then(
                        () => { alert('JSON copied to clipboard!');
                       //return handler('JSON copied')
                    }
                        )
                        .catch(err => 
                            { console.error('Could not copy text: ', err); 
                           // return handler('JSON error',err)
                    });
                   // return
                
            }
        })
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
            // Remove 'active' class from all dynamic divs
            console.log(prev)
            if (prev) {
              prev.classList.remove(cls);
            }
            event.target.classList.add(cls);
    }
    bindPath(handler) {
        this.outputArea.addEventListener('click',(event)=>{
            if(event.target.tagName === 'SPAN' && event.target.classList.contains('tree-non-collapse')) {
                event.preventDefault();
            }
            if(event.target.classList.contains('tree-key') || event.target.classList.contains('tree-value') ||
            event.target.classList.contains('tree-non-collapse')) {
                const path = event.target.getAttribute('data-path');
                this.setCopyText(path);
                handler(path);
                const pre_highlighted_field = this.outputArea.querySelector(".highlight");
                this.addHighlight(event, 'highlight', pre_highlighted_field);
            }
        });  
    }
    bindCopyTable(handler) {
        this.outputArea.addEventListener('click', (event)=> {
            if(event.target.tagName === 'BUTTON' && event.target.classList.contains('copy-btn')) {
                console.log(event.target.getAttribute('key-value'))
                this.setCopyText(event.target.getAttribute('key-value'));
            }
        })
    }
} 
export {View}
