
export function makeElement(tag, { className, id, content, events }) {
    const element = document.createElement(tag);
    if(className) element.setAttribute("class", className);
    if(id) element.id = id;
    if(content) element.innerHTML = content;
    if(events) for(const eventName in events) element.addEventListener(eventName, events[eventName]);

    return element;
}

/** @returns {HTMLDivElement} */
export function makeDivElement(options) {
    return makeElement("div", options);
}

/** @returns {HTMLInputElement} */
export function makeInputElement(options) {
    return makeElement("input", options);
}

/** @returns {HTMLButtonElement} */
export function makeButtonElement(options) {
    return makeElement("button", options);
}


/** @returns {HTMLElement} */
export function $(selector, root) {
    if(!root) root = document;
    return root.querySelector(selector);
}