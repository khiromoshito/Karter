
export function makeElement(tag, { className, id, content }) {
    const element = document.createElement(tag);
    if(className) element.setAttribute("class", className);
    if(id) element.id = id;
    if(content) element.innerHTML = content;

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

/** @returns {HTMLButtonElement} */
export function makeButtonElement({ className, id, content }) {
    return makeElement("button", { className, id, content });
}

/** @returns {HTMLElement} */
export function $(selector) {
    return document.querySelector(selector);
}