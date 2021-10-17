import { ExtendedArray } from "../data/ExtendedArray.mjs";
import { FunctionItem } from "./FunctionItem.mjs";
import { FunctionsInterfaceController } from "./FunctionsInterfaceController.mjs";

export class FunctionsManager {
    constructor({ onUpdate }) {
        this.onUpdate = onUpdate;

        /** @type {FunctionItem[]} */
        this.items = new ExtendedArray();

        this.initializeController();
    }

    initializeController() {
        this.controller = new FunctionsInterfaceController({
            onUpdate: () => {
                this.onUpdate();
            },
            onAddFunction: () => this.addFunction()
        });
    }

    addFunction() {
        const newFunction = new FunctionItem();

        this.items.push(newFunction);
        const functionItemView = this.controller.addFunction({ 
            functionItem: newFunction,
            onDelete: () => {
                this.items.remove(newFunction);
                this.controller.removeFunction({ id: newFunction.id });

                this.onUpdate();
            },
            onInput: (content) => {
                newFunction.updateContent(content);
                this.onUpdate();
            },
            onToggleVisibility: () => {
                newFunction.toggleVisibility();
                functionItemView.update();

                console.log("Toggling visibility...");

                this.onUpdate();
            }
        });

        this.onUpdate();
    }

    getVisibleGraphs() {
        return this.items.filter(func => func.isVisible).map(func => func.graph);
    }
}