class BindController {
    
    handleHighlight() {
        if (this.view.hasHighlightedElement()) {
            this.view.removeHighlight();
        }
    }
    
    handleTreeEvents(target) {
        if (this.isTreeElement(target)) {
            if (target.classList.contains('tree-non-collapse')) {
                event.preventDefault();
            }
            const path = target.getAttribute('data-path');
            this.view.setCopyText(path);
            this.model.setPath(path);
            console.log(path, this.model.getPath());
            this.view.setRootPath(this.model.getPath());
            this.view.addHighlight(event, 'highlight', this.view.getHighlightedElement());
        }
    }
    
    handleCopyAction(target) {
        if (this.isCopyButton(target)) {
            const jsonContent = this.view.getCopyText();
            navigator.clipboard.writeText(jsonContent)
                .then(() => alert('JSON copied to clipboard!'))
                .catch(err => console.error('Could not copy text: ', err));
        }
    }
    
    handleButtonActions(event, target) {
        if (this.isButton(target)) {
            if (target.classList.contains('copy-btn')) {
                const keyValue = target.getAttribute('key-value');
                this.view.setCopyText(keyValue);
            } 
        }
    }

    handleSearch(event, target) {
        if (this.isButton(target) && target.classList.contains('search-btn')) { 
                
        }
    }
    
    isTreeElement(target) {
        return target.classList.contains('tree-key') ||
               target.classList.contains('tree-value') ||
               target.classList.contains('tree-non-collapse') ||
               target.classList.contains('line-tree-key') ||
               target.classList.contains('line-tree-value');
    }
    
    isCopyButton(target) {
        return target.classList.contains("copy") || target.classList.contains("copy-btn");
    }
    
    isButton(target) {
        return target.tagName === 'BUTTON';
    }
}
export default BindController;