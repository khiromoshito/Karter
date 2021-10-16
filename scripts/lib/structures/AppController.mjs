import { ExtendedArray } from "./data/ExtendedArray.mjs";
import { FunctionItem } from "./functions/FunctionItem.mjs";
import { FunctionsInterfaceController } from "./functions/FunctionsInterfaceController.mjs";


export class AppController {
    constructor() {
        this.functions = new ExtendedArray();
        this.initializeControllers();
    }

    initializeControllers() {
        /** @type {{functions: FunctionsInterfaceController}} */
        this.controllers = {
            functions: new FunctionsInterfaceController({
                onUpdate: () => {
                    console.log("Functions interface controller reported changes");

                    this.update();
                },
                onAddFunction: () => {
                    const newFunction = new FunctionItem();

                    this.functions.push(newFunction);
                    this.controllers.functions.addFunction({ id: newFunction.id, 
                        onDelete: () => {
                            this.functions.remove(newFunction);
                            this.controllers.functions.removeFunction({ id: newFunction.id });
                            console.log("A function has been deleted");

                            this.update();
                        },
                        onInput: (content) => {
                            newFunction.updateContent(content);
                            console.log("A function has updated its content");

                            this.update();
                        }
                    });


                    console.log("A function has been added");
                    this.update();
                }
            })
        };
    }

    update() {
        console.log("App controller has reported changes");
    }
}