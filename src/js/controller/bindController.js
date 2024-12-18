class BindController {
    
    handleHighlight() {
        if (this.view.hasHighlightedElement()) {
            this.view.removeHighlight();
        }
    }
    
    handleTreeEvents(event, target) {
        if (this.isTreeElement(target)) {
            if (target.classList.contains('tree-non-collapse')) {
                event.preventDefault();
            }
            const path = target.getAttribute('data-path');
            this.view.setCopyText(path);
            this.model.setPath(path);

            this.view.setRootPath(this.model.getPath());
            this.view.addHighlight(event, 'highlight', this.view.getHighlightedElement());
        }
    }

    handleTableActions(event, target) {
        if(this.isTableElement(target)){
            if(target.classList.contains('limit-btn')) {
                if(target.textContent === 'Limit to one object') {
                    if(this.view.getTableLength()) {
                        target.textContent = `Expand`;
                        this.view.getNextTableBtn().style.display = 'block';
                        this.view.getPrevTableBtn().style.display = 'block';
                        this.view.getLimitTableInfo().textContent = `1 of ${this.view.getTableLength()} objects `;
                        this.view.setTableIndex(0);
                        this.view.setTableData(JSON.parse(this.model.getJson())[this.view.getTableIndex()]);     
                    }else {
                        this.view.getLimitTableInfo().textContent = 'Cannot set limit to one object';
                        setTimeout(()=> this.view.getLimitTableInfo().textContent = '', 3000);
                    }
                } else {
                    target.textContent = `Limit to one object`;
                    this.view.getNextTableBtn().style.display = 'none';
                    this.view.getPrevTableBtn().style.display = 'none';
                    this.view.getLimitTableInfo().textContent = '';
                    this.view.setTableData(JSON.parse(this.model.getJson()));
                }
            }
            if(target.classList.contains('prev-btn')) {
                const index = this.view.getTableIndex();
                if(index > 0) {
                    this.view.setTableIndex(index - 1);
                    this.view.setTableData(JSON.parse(this.model.getJson())[index - 1]);
                    this.view.getLimitTableInfo().textContent = `${index} of ${this.view.getTableLength()} objects `;
                }
            }
            if(target.classList.contains('next-btn')) {
                const index = this.view.getTableIndex();
                const length = this.view.getTableLength();
                if(index < length-1) {
                    this.view.setTableIndex(index + 1);
                    this.view.setTableData(JSON.parse(this.model.getJson())[index + 1]);
                    this.view.getLimitTableInfo().textContent = `${index + 2} of ${this.view.getTableLength()} objects `;
                }
            }
        } 
    }
    
    handleCopyAction(target) {
        if (this.isCopyButton(target)) {
            if (target.classList.contains('copy-btn')) {
                const keyValue = target.getAttribute('key-value');
                this.view.setCopyText(keyValue);
            }

            if(target.classList.contains('path')) {
                this.view.setCopyText(this.model.getPath());
            }
            
            const jsonContent = this.view.getCopyText();
            navigator.clipboard.writeText(jsonContent)
                .then(() => this.handlePopup('Text copied to clipboard!'))
                .catch(err => console.error('Could not copy text: ', err));
                
        }
        

    }

    handleExpandAction(event, target) {
        if (this.isButton(target)) {
            if(target.classList.contains('expand-all')) {
                this.view.getTreeElements().forEach(details => details.open = true);
            } else if(target.classList.contains('collapse-all')) {
                this.view.getTreeElements().forEach(details => details.open = false);
            }
        }
    }
    handlePopup(text) {
        // Display the modal
        const popupModal = this.view.getPopupModal();
        popupModal.style.display = 'block';
        popupModal.textContent = text;

        // After 1.5 seconds, fade out and hide the modal
        setTimeout(() => {
            popupModal.classList.add('fade-out'); // Add fade-out class
        }, 1000); // Delay fade-out for 1 second
    
        // Hide the modal completely after the animation (1.5 seconds total)
        setTimeout(() => {
            popupModal.style.display = 'none';
            popupModal.classList.remove('fade-out'); // Remove fade-out class
        }, 1500); // After 1.5 seconds (match the fade-out time)
    }
    
    handleButtonActions(event, target) {
 
    }

    
    isTreeElement(target) {
        return target.classList.contains('tree-key') ||
               target.classList.contains('tree-value') ||
               target.classList.contains('tree-non-collapse') ||
               target.classList.contains('line-tree-key') ||
               target.classList.contains('line-tree-value');
    }

    isTableElement(target) {
        return target.classList.contains('limit-container') ||
               target.classList.contains('limit-btn') ||
               target.classList.contains('limit-info') ||
               target.classList.contains('prev-btn') ||
               target.classList.contains('next-btn');
    }
    
    isCopyButton(target) {
        return target.classList.contains("copy") || 
        target.classList.contains("copy-btn") || 
        target.classList.contains("path");
    }
    
    isButton(target) {
        return target.tagName === 'BUTTON';
    }
}
export default BindController;