
export function makeElement(tag, { className, id }) {
    const element = document.createElement(tag);
    if(className) element.setAttribute("class", className);
    if(id) element.id = id;

    return element;
}

/** @returns {HTMLDivElement} */
export function makeDivElement({ className, id }) {
    return makeElement("div", { className, id });
}

/** @returns {HTMLInputElement} */
export function makeInputElement({ className, id }) {
    return makeElement("input", { className, id });
}

/** @returns {HTMLElement} */
export function $(selector) {
    return document.querySelector(selector);
}