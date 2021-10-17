import { $ } from "../utils/element.mjs";
import { ExtendedArray } from "./data/ExtendedArray.mjs";
import { FunctionItem } from "./functions/FunctionItem.mjs";
import { FunctionsInterfaceController } from "./functions/FunctionsInterfaceController.mjs";
import { Grapher } from "./graph/Grapher.mjs";
import { GraphInterfaceController } from "./graph/GraphInterfaceController.mjs";
import { ViewSettings } from "./graph/ViewSettings.mjs";
import { Point } from "./Point.mjs";


export class AppController {
    constructor() {

        /** @type {FunctionItem[]} */
        this.functions = new ExtendedArray();
        this.initializeGrapher();
        this.initializeControllers();
    }

    initializeControllers() {
        /** @type {{functions: FunctionsInterfaceController, graph: GraphInterfaceController}} */
        this.controllers = {};

        this.controllers.functions = new FunctionsInterfaceController({
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
                        console.log(this.functions);

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
        });

        let origin = this.grapher.viewSettings.position;
        const viewSettings = this.grapher.viewSettings;
        const canvas = this.grapher.canvas;

        this.controllers.graph = new GraphInterfaceController({
            element: $("#graph-touch"),
            onDrag: ({ dragOffset: {x: ox, y: oy} }) => {
                const currentScale = viewSettings.getScale({ canvasWidth: canvas.width });
                const x = ox / currentScale;
                const y = -(oy / currentScale);

                const newPosition = new Point( origin.x + x, origin.y + y);
                viewSettings.update({ position: newPosition });

                this.update();
            },
            onMouseUp: () => {
                origin = this.grapher.viewSettings.position;
            },
            onMouseDown: () => {
                origin = this.grapher.viewSettings.position;
            },
            onWheel: (movement) => {
                if(movement < 0) { // Wheeled upwards
                    viewSettings.zoomIn();
                } else {
                    viewSettings.zoomOut();
                }

                this.update();
            }
        });
    }

    initializeGrapher() {
        this.grapher = new Grapher({
            canvas: $("#graph-canvas"),
            viewSettings: new ViewSettings()
        });

        this.grapher.render();
    }

    update() {
        const graphs = this.functions.map(func => func.graph);
        this.grapher.render(graphs);
    }
}