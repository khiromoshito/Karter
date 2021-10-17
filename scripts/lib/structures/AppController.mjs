import { $ } from "../utils/element.mjs";
import { ExtendedArray } from "./data/ExtendedArray.mjs";
import { FunctionItem } from "./functions/FunctionItem.mjs";
import { FunctionsInterfaceController } from "./functions/FunctionsInterfaceController.mjs";
import { FunctionsManager } from "./functions/FunctionsManager.mjs";
import { Grapher } from "./graph/Grapher.mjs";
import { GraphingManager } from "./graph/GraphingManager.mjs";
import { GraphInterfaceController } from "./graph/GraphInterfaceController.mjs";
import { ViewSettings } from "./graph/ViewSettings.mjs";
import { Point } from "./Point.mjs";


export class AppController {
    constructor() {
        this.functions = new FunctionsManager({
            onUpdate: () => this.update()
        });

        this.graphs = new GraphingManager({ canvas: $("#graph-canvas") });

        // Add one empty function
        this.functions.addFunction();
    }

    update() {
        this.graphs.updateGraphs(this.functions.getVisibleGraphs());
    }
}