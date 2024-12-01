//get data from model and set to view & vice versa
class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindConvert(this.convertData.bind(this));
        this.view.bindCopy(this.copyClipBoard.bind(this));
        this.view.bindSpace(this.manageSpace.bind(this));
        this.view.bindPath(this.manageTreePath.bind(this));
        this.view.bindCopyTable(this.copyTableCell.bind(this))
        this.view.bindDownload(this.downloadData.bind(this));
        //keep only 2, bindClick, bindChange
    }
    convertData(option) {
        const inputText = this.view.getInput();
        this.model.setJson(inputText);
        this.model.setOption(option);
        this.view.setDisplay(this.model.getJson(), this.model.getOption());
    }
    copyClipBoard(copy) {
        const copyText = this.view.getCopyText();
        console.log("copy:",copy)
    }
    manageSpace(space) {
        this.model.setSpace(space);
        const json = this.model.getJson();
        const option = this.model.getOption();
        const spaces = this.model.getSpace();
        return {json, option, spaces};
    }
    manageTreePath(path) {
        this.model.setPath(path);
        this.view.setRootPath(this.model.getPath());
    }
    copyTableCell(){

    }
    downloadData(option) {
        const data = this.model.getJson();
        const downloadAs = option;
        return {data, downloadAs};
    }
}
export {Controller};