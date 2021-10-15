import { makeDivElement, makeInputElement } from "../../utils/element.mjs";


export class FunctionItemView {
    constructor({ onDelete, onInput }) {
        this.listeners = { onDelete, onInput };

        this.initializeView();
    }

    initializeView() {
        const functionItemView = {
            wrapper: makeDivElement({ className: "function-item-wrapper" }),
            input: makeInputElement({ className: "function-item-input" })
        };

        functionItemView.input.addEventListener("input", () => {
            const content = functionItemView.input.value;
            this.listeners.onInput(content);
        });

        functionItemView.wrapper.append(functionItemView.input);

        this.element = functionItemView.wrapper;
    }
}