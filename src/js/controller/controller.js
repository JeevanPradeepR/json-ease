//get data from model and set to view & vice versa
import BindController from "./bindController.js";
class Controller extends BindController {
    constructor(model, view) {
        super();
        this.model = model;
        this.view = view;
        this.view.bindTransform(this.transformJson.bind(this));
        this.view.bindInsertDummyData(this.handleInsertDummyData.bind(this));
        this.view.bindSpace(this.manageSpace.bind(this));
        this.view.bindDownload(this.downloadData.bind(this));
        this.view.bindCopy(this.handleCopy.bind(this));
        this.view.bindToggleTheme(this.handleToggleTheme.bind(this));

        this.view.bindEvents(this.setEvents.bind(this));
    }

    transformJson({target}) {
        const inputText = this.view.getInput();
        this.model.setJson(inputText);
        if(target.tagName === 'BUTTON') {
            this.model.setOption(target.value);
            this.view.setDisplay(this.model.getJson(), this.model.getOption());
        }
    }

    handleInsertDummyData(event) {
        if (event.key === 'Tab') { 
            event.preventDefault();
            if(!this.view.inputArea.value) {
                this.view.inputArea.value = this.generatedDummyData();
            }
        }
    }

    handleToggleTheme() {
        document.querySelector('.main-section').classList.toggle('dark-theme');
        document.body.classList.toggle('dark-theme');
    }

    manageSpace({target}) {
        this.model.setSpace(target.value * 1);
        const space = this.model.getSpace();
        this.view.setSpace(space);
        this.view.setDisplay(this.model.getJson(), this.model.getOption());
    }
   
    downloadData({target}) {
        const data = this.model.getJson();
        const downloadAs = target.value;
        this.view.downloadView.downloadData(data, downloadAs);
    }

    setEvents(event) {
        const { target } = event;
        this.handleHighlight();
        this.handleTreeEvents(event, target);
        this.handleCopyAction(target);
        this.handleButtonActions(event, target);
        this.handleTableActions(event, target);
        this.handleExpandAction(event, target);
    }
    handleCopy(event) {
        const { target } = event;
        this.handleCopyAction(target);
    }
    
    generatedDummyData() {
       return `[
            {
              "grossary": {
                "title": "biscuit",
                "quantity": 2,
                "type": {
                  "product": "big packet",
                  "price": 20
                },
                "offer": [
                  "scale",
                  "sticker"
                ],
                "discount": false
              }
            },
            {
              "grossary": {
                "title": "soap",
                "quantity": 1,
                "type": {
                  "product": "dish wash",
                  "price": 10
                },
                "offer": [
                  "scrubber",
                  "soap",
                  "sticker"
                ],
                "discount": true
              }
            }
          ]`
    }
}
export {Controller};