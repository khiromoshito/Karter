import { makeButtonElement, makeDivElement, makeInputElement } from "../../utils/element.mjs";


export class FunctionItemView {
    constructor({ id, onDelete, onInput }) {
        this.id = id;
        this.listeners = { onDelete, onInput };

        this.initializeView();
    }

    initializeView() {
        const wrapper = makeDivElement({ className: "function-item-wrapper", id: this.id });
        const input = makeInputElement({ className: "function-item-input" });
        const removeBtn = makeButtonElement({ className: "function-item-removebtn", content: "X" });
    

        input.addEventListener("input", () => {
            const content = input.value;
            this.listeners.onInput(content);
        });

        removeBtn.addEventListener("click", () => this.listeners.onDelete() );

        wrapper.append(input, removeBtn);
        this.element = wrapper;
    }

    destroy() {
        this.element.parentElement.removeChild(this.element);
    }
}