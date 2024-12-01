import {prependChild} from './helper/domHandlers.js';
function copyToClipBoard(parentElement, clipBoradElement) {
    clipBoradElement.classList.add("copy");
    clipBoradElement.innerHTML = '&#x2398';
    prependChild(parentElement,clipBoradElement)
}
export {copyToClipBoard};