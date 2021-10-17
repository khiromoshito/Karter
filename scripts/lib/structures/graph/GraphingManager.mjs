import { $ } from "../../utils/element.mjs";
import { Point } from "../Point.mjs";
import { Grapher } from "./Grapher.mjs";
import { GraphInterfaceController } from "./GraphInterfaceController.mjs";
import { ViewSettings } from "./ViewSettings.mjs";

export class GraphingManager {
    constructor({ canvas }) {
        
        /**
         * The graphing manager does not actually hold the graphs,
         * but instead caches the ones from past update */ 
        this.graphs = [];

        this.initializeGrapher({ canvas });
        this.initializeController();
    }

    initializeGrapher({ canvas }) {
        this.grapher = new Grapher({
            canvas, viewSettings: new ViewSettings()
        });
    }

    initializeController() {
        const viewSettings = this.grapher.viewSettings;
        let origin = viewSettings.position;

        const canvas = this.grapher.canvas;

        this.controller = new GraphInterfaceController({
            element: $("#graph-touch"),
            onDrag: ({ dragOffset: {x: ox, y: oy} }) => {
                const currentScale = viewSettings.getScale({ canvasWidth: canvas.width });
                const x = ox / currentScale;
                const y = -(oy / currentScale);

                const newPosition = new Point(origin.x + x, origin.y + y);
                viewSettings.update({ position: newPosition });

                this.update();
            },
            onMouseUp: () => {
                origin = viewSettings.position;
            },
            onMouseDown: () => {
                origin = viewSettings.position;
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

    update() {
        this.grapher.render(this.graphs);
    }

    updateGraphs(graphs) {
        this.graphs = graphs;
        this.update();
    }

}