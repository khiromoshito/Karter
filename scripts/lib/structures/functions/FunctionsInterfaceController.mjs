import { $, makeDivElement, makeInputElement } from "../../utils/element.mjs";
import { FunctionItemView } from "./FunctionItemView.mjs";
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
        const functionItem = this.manager.addFunction();

        const functionItemView = new FunctionItemView({
            onDelete: () => {
                console.log("A function is bound to be deleted");
                this.onUpdate();
            },
            onInput: (content) => {
                functionItem.graph.expression.updateExpression(content);
                console.log(`A function has updated its content: ${content}`);
                this.onUpdate();
            }
        });

        this.views.listContainer.appendChild(functionItemView.element);
    }
}


// UNIT TESTING
// function test() {
//     const controller = new FunctionsInterfaceController();
//     controller.
// }

// test();