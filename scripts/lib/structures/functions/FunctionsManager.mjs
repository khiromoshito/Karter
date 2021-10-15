import { FunctionItem } from "./FunctionItem.mjs";

export class FunctionsManager {
    constructor({ onUpdate }) {

        /** @type {FunctionItem[]} */
        this.functions = [];

        this.onUpdate = onUpdate;
    }

    addFunction() {
        const newFunction = new FunctionItem({
            onUpdate: () => this.onUpdate()
        });

        this.functions.push(newFunction);
        this.onUpdate();
        return newFunction;
    }

    removeFunction(func) {
        if(this.functions.includes(func)) this.functions.splice(this.functions.indexOf(func), 1);
        this.onUpdate();
    }
}



// UNIT TEST
function test() {
    const manager = new FunctionsManager();
    manager.addFunction();

    // manager.functions[0].updateContent("2x");
    // manager.functions[0].updateColor("red");

    console.log(manager.functions);
    manager.removeFunction(manager.functions[0]);
    console.log(manager.functions);
}

// test();