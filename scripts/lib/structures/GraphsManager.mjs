import { drawGraph, drawGridLines } from "../graph/grapher.mjs";
import { getGridXYValues } from "../graph/plotter.mjs";
import { translatePoint, translateX, translateY } from "../graph/translator.mjs";
import { Graph } from "./Graph.mjs";
import { Point } from "./Point.mjs";


export class GraphsManager {

    constructor() {

        /** @type {Graph[]} */
        this.graphs = [];
        this.view = new ViewSettings(() => this);
        this.grapher = new Grapher(() => this );

    }

    initialize({ canvas }) {
        this.grapher.canvas = canvas;
    }

}

class GraphsManagerSubInterface {
    /** @returns {GraphsManager} */
    _graphsManagerGetter = () => null;
    get manager() { return this._graphsManagerGetter() }

    constructor(graphsManagerGetter) {
        this._graphsManagerGetter = graphsManagerGetter;
    }
}


class ViewSettings extends GraphsManagerSubInterface {

    constructor(graphsManagerGetter) {
        super(graphsManagerGetter);

        /** Factor of view range */
        this.zoom = 1;

        /** How much to zoom when zooming in or out */
        this.zoomFactor = 1.2;

        /** Maximum distance of x bounds when at zoom = 1 */
        this.defaultRange = 20;
        this.position = new Point(0, 0);
    }

    zoomIn() { this.update({ zoom: this.zoom /= this.zoomFactor }); }
    zoomOut() { this.update({ zoom: this.zoom *= this.zoomFactor }); }

    update({ zoom, defaultRange, position }) {
        if(zoom) this.zoom = zoom;
        if(defaultRange) this.defaultRange = defaultRange;
        if(position) this.position = position;

        this.manager.grapher.render();
    }

    /** @returns {{ x1: number, x2: number, y1: number, y2: number }} */
    get bounds() {
        const { height } = this.manager.grapher.canvas;

        const halfRange = this.currentRange / 2;
        const offset = this.position;

        const yRange = height / this.scale;
        const yHalfRange = yRange / 2;

        const x1 = offset.x - halfRange;
        const x2 = offset.x + halfRange;
        const y1 = offset.y - yHalfRange;
        const y2 = offset.y + yHalfRange;
        
        return { x1, x2, y1, y2 };
    }

    get currentRange() { return this.defaultRange*this.zoom }

    // How big in pixels are each unit
    get scale() { return this.manager.grapher.canvas.width / this.currentRange; }
}


class Grapher extends GraphsManagerSubInterface {

    constructor(graphsManagerGetter, { canvas } = {}) {
        super(graphsManagerGetter);

        /** @type {HTMLCanvasElement} */
        this.canvas = canvas || null;

    }

    updateCanvas(canvas) {
        this.canvas = canvas;
    }

    render() {
        drawGridLines({ canvas: this.canvas, view: this.manager.view });

        for(const graph of this.manager.graphs) {
            drawGraph({ graph, canvas: this.canvas, view: this.manager.view });
        }
    }
}