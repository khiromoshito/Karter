import { drawGraph, drawGridLines } from "../../graph/grapher.mjs";
import { ViewSettings } from "./ViewSettings.mjs";

export class Grapher {

    /** @param {{ canvas: HTMLCanvasElement, viewSettings: ViewSettings }}  param0 */
    constructor({ canvas, viewSettings }) {
        this.canvas = canvas;
        this.viewSettings = viewSettings;
    }

    render(graphs = []) {
        drawGridLines({ canvas: this.canvas, view: this.viewSettings });

        for(const graph of graphs) {
            drawGraph({ graph, canvas: this.canvas, view: this.viewSettings });
        }
    }
}