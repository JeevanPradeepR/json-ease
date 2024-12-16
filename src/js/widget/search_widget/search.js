
import config from './config.js';
class SearchModel {
    constructor() {
        this.state = {searchText: '', index:-1};
    }
    setSearchText(text) {
        this.state.searchText = text;
    }
    getSearchText() {
        return this.state.searchText;
    }
    setIndex(index) {
        this.state.index = index;
    }
    getIndex() {
        return this.state.index;
    }
}
class SearchController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.bindSearch(this.handleSearch.bind(this));
        this.view.bindCancelSearch(this.handlecancel.bind(this));
        this.view.bindNextSearch(this.handleNext.bind(this));
        this.view.bindPrevSearch(this.handlePrev.bind(this));
        this.view.bindKeyEvent(this.handleKeyEvent.bind(this));
    }
    handleSearch() {
        this.model.setSearchText(this.view.getInput());
        this.view.search(this.model.getSearchText());
        this.model.setIndex(-1);
    }
    handlecancel() {
        this.model.setSearchText(this.view.getInput());
        const input = this.model.getSearchText();
        if (input === '') {
            const highlightedElement = this.view.getHighlightedElements();
            this.view.removePreviousHighlights(highlightedElement);
        } else {
            this.handleSearch();
        }
    }
    handleNext() {
        this.handleDirection(1);  // +1 for next
    }
    handlePrev() {
        this.handleDirection(-1);  // -1 for previous
    }
    handleKeyEvent(event) {
            if (event.key === 'ArrowRight') {
                this.view.next.click();
            } else if (event.key === 'ArrowLeft') {
                this.view.prev.click();
            }
    }
    handleDirection(direction) {
        const highlightedElement = this.view.getHighlightedElements();
        if (highlightedElement) {
            this.view.removeActiveHighlight(highlightedElement);
    
            let index = this.model.getIndex();
            const total = highlightedElement.length;
    
            // Update the index based on the direction (+1 for next, -1 for previous)
            index += direction;
    
            // Ensure the index stays within bounds
            if (index >= total) {
                this.model.setIndex(0);  // Wrap to the beginning
            } else if (index < 0) {
                this.model.setIndex(total - 1);  // Wrap to the end
            } else {
                this.model.setIndex(index);
            }
    
            // Perform the search navigation
            this.view.navigateSearch(this.model.getIndex(), highlightedElement);
        }
    }
}
class SearchView {
    constructor() {
        this.searchContainer = this.setSearchContainer();
        this.input = this.searchContainer.querySelector('.search-input');
        this.searchBtn = this.searchContainer.querySelector('.search-btn');
        this.next = this.searchContainer.querySelector('.next');
        this.prev = this.searchContainer.querySelector('.prev');
        this.count = this.searchContainer.querySelector('.count');
        this.index = -1;
        this.parentElement = '';
        this.content = '';
    }
    setSearchContainer() {
        // The previous `initializeSearchEvent()` function is now just about returning the HTML structure.
        const searchContainer = document.createElement('div');
        searchContainer.classList.add('search-container');
        searchContainer.innerHTML = `
            <input type="search" placeholder="Search..." class="search-input" />
            <button class="search-btn">Search</button>
            <button class="next">↓</button>
            <button class="prev">↑</button>
            <p class="count"></p>
        `;
        return searchContainer;
    }
    getInput() {
        return this.input.value;
    }
    getHighlightedElements() {
        return this.content.querySelectorAll('.highlighted');
    }
    getSearchCount() {
        return this.count.textContent;
    }
    attachElement({parentElement}, position = 'start') {
        this.parentElement = parentElement;
        try{
            this.content = document.querySelector(".search-widget-container");
        } catch (e) {
            throw  Error('There is no class set with search-widget-container name');
        }
        const placement = position.toLowerCase().trim()
        if( placement === 'start') {
            this.parentElement.prepend(this.searchContainer);
        } else if (placement === 'end') {
            this.parentElement.append(this.searchContainer);
        } else {
            throw new Error('Invalid position specified: ' + position+'. Please use "start" or "end"');
        }
    }

    bindSearch(handler){
        this.searchBtn.addEventListener('click', handler);
    }
    bindCancelSearch(handler){
        this.input.addEventListener('search', handler);
    }
    bindNextSearch(handler) {
        this.next.addEventListener('click', handler);
    }
    bindPrevSearch(handler) {
        this.prev.addEventListener('click', handler);
    }
    bindKeyEvent(handler) {
        document.addEventListener('keydown', handler);
    }
  
    search(value) {
        if (!value.length) {
            console.warn("Please provide a valid search value.");
            this.count.textContent = '0 matches';
            return;
        }
        let matchCount = 0;
        this.removePreviousHighlights(this.getHighlightedElements());
    const elements1 = this.content.querySelectorAll('*');
    elements1.forEach(element => {
        if(element.textContent.includes(value)) {
            element.childNodes.forEach(childNode => {
                if(childNode.textContent.includes(value) && childNode.nodeType === Node.TEXT_NODE) {
                    //    Replace the matched text with a highlighted version
                    const highlightedText = element.innerText.replace(value, `<span class="highlighted" style="background-color: yellow;">${value}</span>`);
                    // Push element into results if it contains the search value
                    matchCount++;

                // Update the element's innerHTML with the highlighted version
                    element.innerHTML = highlightedText;
                    const highlightedElement = this.content.querySelector('.highlighted');
                    if (highlightedElement) {
                        highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            })
        }
    })

    
        if (matchCount) {
            this.includeSearchEvent();
        }
    
        this.count.textContent = `${this.getHighlightedElements().length} matches`;
    }
    
    includeSearchEvent() {
        this.searchContainer.append(this.prev, this.next, this.count);
        this.prev.classList.add('prev')?.remove('prev-hide');
        this.next.classList.add('next')?.remove('next-hide');
        this.count.classList.add('count');
    }

    
    removePreviousHighlights(highlightedElements) {
        highlightedElements.forEach((element) => {
            const parentElement = element.parentElement;
            const parentElementText = parentElement.textContent;
            element.remove();
            parentElement.textContent = parentElementText;
        });
        this.count.textContent = '';
    }

    navigateSearch(index, highlightedElements) {
        if(highlightedElements.length) {
            this.count.textContent = `${index+1} of ${highlightedElements.length}`;
            const nextMatch = highlightedElements[index];
            nextMatch.classList.add("active");
            // Scroll to the next match
            nextMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });                             
        }
    }
    
    removeActiveHighlight(highlightedElements) {
        highlightedElements.forEach((element) => {
            element.classList.remove('active');
        });
    }
}

const SearchWidget = new SearchController(new SearchModel(), new SearchView());

export  default SearchWidget;