import { Point } from "../Point.mjs";

export class ViewSettings {

    constructor() {

        /** Factor of view range */
        this.zoom = 1;

        /** How much to zoom when zooming in or out */
        this.zoomFactor = 1.1;

        /** Maximum distance of x bounds when at zoom = 1 */
        this.defaultRange = 20;
        this.position = new Point(0, 0);
    }

    zoomIn() { this.zoom /= this.zoomFactor; return this.zoom; }
    zoomOut() { this.zoom *= this.zoomFactor; return this.zoom; }

    update({ zoom, defaultRange, position }) {
        if(zoom) this.zoom = zoom;
        if(defaultRange) this.defaultRange = defaultRange;
        if(position) this.position = position;
    }

    /** @returns {{ x1: number, x2: number, y1: number, y2: number }} */
    getBounds({ canvasHeight, canvasWidth }) {
        const halfRange = this.currentRange / 2;
        const offset = this.position;

        const yRange = canvasHeight / this.getScale({ canvasWidth });
        const yHalfRange = yRange / 2;

        const x1 = offset.x - halfRange;
        const x2 = offset.x + halfRange;
        const y1 = offset.y - yHalfRange;
        const y2 = offset.y + yHalfRange;
        
        return { x1, x2, y1, y2 };
    }

    get currentRange() { return this.defaultRange*this.zoom }

    // How big in pixels are each unit
    getScale({ canvasWidth }) { return canvasWidth / this.currentRange; }
}