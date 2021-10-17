import { $, makeButtonElement, makeDivElement, makeInputElement } from "../../utils/element.mjs";
import { FunctionItem } from "./FunctionItem.mjs";


export class FunctionItemView {
    static rawInstance = $(".function-item-wrapper.prototype").innerHTML;

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
        const wrapper = makeDivElement({ className: "function-item-wrapper", id: this.id });
        wrapper.innerHTML = FunctionItemView.rawInstance;

        this.elements = {
            wrapper,
            colorDisplay: $(".function-item-color-preview", wrapper),
            input: $(".function-item-input", wrapper),
            visibilityBtn: $(".function-item-visibilitybtn", wrapper),
            removeBtn: $(".function-item-removebtn", wrapper)
        };

        this.elements.input.addEventListener("input", () => {
            const content = this.elements.input.value;
            this.listeners.onInput(content);
        });

        this.elements.visibilityBtn.addEventListener("click", ()=>this.listeners.onToggleVisibility());
        this.elements.removeBtn.addEventListener("click", ()=>this.listeners.onDelete());

        this.element = wrapper;
        this.update();
    }

    update() {
        const { wrapper, colorDisplay, visibilityBtn } = this.elements;
        const func = this.functionItem;

        if(!func.isVisible) {
            wrapper.classList.add("invisible");
            visibilityBtn.title = "Unhide";
        } else {
            wrapper.classList.remove("invisible");
            visibilityBtn.title = "Hide";
        }

        colorDisplay.style.backgroundColor = this.functionItem.color;
    }

    destroy() {
        this.element.parentElement.removeChild(this.element);
    }
}