import { $, makeDivElement, makeInputElement } from "../../utils/element.mjs";
import { FunctionsManager } from "./FunctionsManager.mjs";

export class FunctionsInterfaceController {

    constructor({ onUpdate }) {
        this.onUpdate = onUpdate || (() => {});
        this.manager = new FunctionsManager({ onUpdate: () => this.onUpdate() });
        this.initializeViews();
    }

    initializeViews() {
        this.views = {
            listContainer: $("body"),
            buttons: {
                adding: $("#functions-addbtn")
            }
        };

        this.views.buttons.adding.addEventListener("click", () => this.addFunction());
    }

    addFunction() {
        const functionItemView = {
            wrapper: makeDivElement({ className: "function-item-wrapper" }),
            input: makeInputElement({ className: "function-item-input" })
        };

        const functionItem = this.manager.addFunction();

        functionItemView.input.addEventListener("input", () => {
            const content = functionItemView.input.value;
            functionItem.updateContent(content);
        });

        functionItemView.wrapper.append(functionItemView.input);
        this.views.listContainer.appendChild(functionItemView.wrapper);
    }
}


// UNIT TESTING
// function test() {
//     const controller = new FunctionsInterfaceController();
//     controller.
// }

// test();