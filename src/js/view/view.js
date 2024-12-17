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
        this.outputArea = document.querySelector('.output-area');
        this.theme = document.querySelector('.theme');
        this.convertBtn = document.querySelector('.convert-btn');
        this.copyBtn = document.querySelector(".copy");
        this.tabSpaceBtn = document.querySelector(".tab-space-btn");
        this.path = document.querySelector('.path');
        this.downloadBtn = document.querySelector(".download-btn");
        this.popupModal = document.getElementById('popupModal');
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
    getHighlightedElement() {
        return this.outputArea.querySelector(".highlight");
    }
    getPopupModal() {
        return this.popupModal;
    }
    getNextTableBtn() {
        return this.outputArea.querySelector(".next-btn");
    }
    getPrevTableBtn() {
        return this.outputArea.querySelector(".prev-btn");
    }
    getLimitTableInfo() {
        return this.outputArea.querySelector('.limit-info');
    }
    getTableLength() {
        return this.tableView.getTableLength();
    }
    getTableData() {
        return this.tableView.getTableData();
    }
    setTableData(data) {
        this.tableView.display.querySelector(".table-body").innerHTML = '';
        this.tableView.convertToTable(data);
    }
    getTableIndex() {
        return this.tableView.getTableIndex() || 0;
    }
    setTableIndex(index) {
        this.tableView.setTableIndex(index);
    }
    getTreeElements() {
        return this.outputArea.querySelectorAll('details');
    }
    setDisplay(data, option) {
        this.path.classList.add('path-none');
        this.outputArea.scrollTo({ top: 0, behavior: 'smooth' });

        if(option === 'validate') {
            this.validateView.setDisplay(data);
            this.setCopyText(this.validateView.getCopyData());
        }
        if(option === 'format'){
            this.formatView.setDisplay(data, this.getSpace());
            this.setCopyText(this.formatView.getCopyData());
        }
        if(option === 'to-single-line') {
            this.singleLineView.setDisplay(data);
            this.setCopyText(this.singleLineView.getCopyData());
        }
        if(option === 'to-tree') {
            this.path.classList.remove('path-none');
            this.treeView.setDisplay(data, this.getSpace());
        }
        if(option === 'to-table') {
            this.tableView.setDisplay(data);
        }
    }
    getSpace() {
        return this.space;
    }
    setSpace(space) {
        this.space = space;
    }
    setRootPath(path) {
        this.path.textContent = path;
    }
    getRootPath() {
        return this.path.textContent;
    }
    bindCopy(handler) {
        this.path.addEventListener('click', handler);
    }
    bindTransform(handler) {
        this.convertBtn.addEventListener('click', handler);
    }
    bindSpace(handler) {
        this.tabSpaceBtn.addEventListener('change', handler);
    }
    bindDownload(handler) {
        this.downloadBtn.addEventListener('change', handler);
    }
    bindInsertDummyData(handler) {
        this.inputArea.addEventListener('keydown', handler);
    }
    bindToggleTheme(handler) {
        this.theme.addEventListener('click', handler);
    }
    addHighlight(event, cls, prev) {
            if (prev) {
              prev.classList.remove(cls);
            }
            event.target.classList.add(cls);
    }
    removeHighlight() {
        this.outputArea.querySelector(".highlight").classList.remove('highlight');  
    }
    hasHighlightedElement() {
       return this.outputArea.querySelector(".highlight") ? true : false;
    }
    bindEvents(handler) {
        this.outputArea.addEventListener('click', handler);
    }
}    
export {View}
