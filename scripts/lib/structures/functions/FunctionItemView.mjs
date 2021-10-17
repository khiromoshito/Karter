import { makeButtonElement, makeDivElement, makeInputElement } from "../../utils/element.mjs";
import { FunctionItem } from "./FunctionItem.mjs";


export class FunctionItemView {
    constructor({ functionItem, onDelete, onInput, onToggleVisibility }) {
        this.id = functionItem.id;
        this.listeners = { onDelete, onInput, onToggleVisibility };

        /** @type {FunctionItem} */
        this.functionItem = functionItem;

        /** @type {{ wrapper: HTMLDivElement, colorDisplay: HTMLDivElement, input: HTMLInputElement, removeBtn: HTMLButtonElement }} */
        this.elements = {};

        this.initializeView();
    }

    initializeView() {
        this.elements = {
            wrapper: makeDivElement({ 
                className: "function-item-wrapper", id: this.id }),

            colorDisplay: makeDivElement({ className: "function-item-color-wrapper", content: this.functionItem.color }),
            
            input: makeInputElement({ className: "function-item-input",
                events: { 
                    input: () => {
                        const content = input.value;
                        this.listeners.onInput(content);
                    }
                }
            }),

            visibilityBtn: makeButtonElement({
                className: "function-item-visibilitybtn", content: "V",
                events: { click: () => this.listeners.onToggleVisibility() }
            }),

            removeBtn: makeButtonElement({ 
                className: "function-item-removebtn", content: "X",
                events: { click: () => this.listeners.onDelete() } })
        };

        const { wrapper, colorDisplay, input, visibilityBtn, removeBtn } = this.elements;

        wrapper.append(colorDisplay, input, visibilityBtn, removeBtn);
        this.element = wrapper;
    }

    update() {
        const { wrapper, colorDisplay } = this.elements;
        const func = this.functionItem;

        if(!func.isVisible) wrapper.classList.add("invisible");
        else wrapper.classList.remove("invisible");

        colorDisplay.innerHTML = func.color;
    }

    destroy() {
        this.element.parentElement.removeChild(this.element);
    }
}