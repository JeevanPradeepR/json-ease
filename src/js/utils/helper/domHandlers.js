function createElement(...elements){
    return elements.map(element=>document.createElement(element));
}

function appendChild(parentElement, childElement) {
    parentElement.appendChild(childElement);
}

function addAsSibling(firstElement, secondElement) {
    firstElement.insertAdjacentElement('beforeend',secondElement);
}
function addAsFirstSibling(firstElement, secondElement) {
    firstElement.insertAdjacentElement('beforebegin',secondElement);
}
function prependChild(parentElement, childElement) {
    parentElement.prepend(childElement);
}

function clearElement(element) {
    element.innerHTML = '';
}

export {createElement, appendChild, prependChild, addAsSibling, addAsFirstSibling, clearElement};