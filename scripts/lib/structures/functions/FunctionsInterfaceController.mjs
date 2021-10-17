import { $, makeDivElement, makeInputElement } from "../../utils/element.mjs";
import { FunctionItemView } from "./FunctionItemView.mjs";

export class FunctionsInterfaceController {

    constructor({ onUpdate, onAddFunction }) {
        this.listeners = { onUpdate, onAddFunction };

        /** @type {FunctionItemView[]} */
        this.functionItems = [];
        this.initializeViews();
    }

    initializeViews() {
        this.views = {
            listContainer: $("body"),
            buttons: {
                adding: $("#functions-addbtn")
            }
        };

        this.views.buttons.adding.addEventListener("click", () => this.listeners.onAddFunction());
    }

    addFunction({ functionItem, onDelete, onInput, onToggleVisibility }) {
        const functionItemView = new FunctionItemView({
            functionItem,
            onDelete: () => onDelete(),
            onInput: (content) => onInput(content),
            onToggleVisibility: () => onToggleVisibility()
        });

        this.views.listContainer.appendChild(functionItemView.element);
        this.functionItems.push(functionItemView);

        return functionItemView;
    }

    removeFunction({ id }) {
        const selectedFunctionIndex = this.functionItems.findIndex(func => func.id === id);
        if(selectedFunctionIndex != -1) {
            this.functionItems[selectedFunctionIndex].destroy();
            this.functionItems.splice(selectedFunctionIndex, 1);
        }
    }
}


// UNIT TESTING
// function test() {
//     const controller = new FunctionsInterfaceController();
//     controller.
// }

// test();