import { $ } from "../utils/element.mjs";
import { FunctionsManager } from "./functions/FunctionsManager.mjs";
import { GraphingManager } from "./graph/GraphingManager.mjs";


export class AppController {
    constructor() {
        this.functions = new FunctionsManager({
            onUpdate: () => this.update()
        });

        this.graphs = new GraphingManager({ canvas: this.prepareCanvas() });

        // Add one empty function
        this.functions.addFunction();

        setTimeout(() => document.body.classList.remove("loading"), 500);
        
    }

    update() {
        this.graphs.updateGraphs(this.functions.getVisibleGraphs());
    }

    prepareCanvas() {
        /** @type {HTMLCanvasElement} */
        const canvas = $("#graph-canvas");
        const { innerHeight: height, innerWidth: width } = window;

        const widthProportion = 73/100;
        const canvasWidth = width*widthProportion;

        canvas.height = height;
        canvas.width = canvasWidth;

        return canvas;
    }
}