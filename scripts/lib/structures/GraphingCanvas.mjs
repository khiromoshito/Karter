import { translatePoint, translateX, translateY } from "../graph/translator.mjs";
import { Point } from "./Point.mjs";

// Handles graphing into canvas
export class GraphingCanvas {
    constructor({ canvas }) {

        /** @type {HTMLCanvasElement} */
        this.canvas = canvas;
        this.position = new Point(0, 0);
        this.scale = 50;
        this.gridValues = { x: [], y: [] };

        /** @type {{ points: Point[], color: string }[]} */
        this.graphs = [];
    }

    update({ gridValues, graphs, position, scale }) {
        if(gridValues) this.gridValues = gridValues;
        if(graphs) this.graphs = graphs;
        if(position) this.position = position;
        if(scale) this.scale = scale;

        this.render();
    }

    updateGridValues(gridValues) { 
        this.gridValues = gridValues;
        this.render();
    }

    updateGraphs(graphs) {
        this.graphs = graphs;
        this.render();
    }

    updatePosition(position) {
        this.position = position;
        this.render();
    }

    render() {
        const ctx = this.canvas.getContext("2d");
        const canvasWidth = this.canvas.width;
        const canvasHeight = this.canvas.height;

        const gridLineStyle = {
            color: "#a0a0a0",
            width: 2
        };

        function drawGridLine(from, to) {
            ctx.strokeStyle = gridLineStyle.color;
            ctx.lineWidth = gridLineStyle.width;
            ctx.beginPath();
            ctx.moveTo(from.x, from.y);
            ctx.lineTo(to.x, to.y);
            ctx.stroke();
        }

        const offset = this.position;
        const scale = this.scale;


        // Clear canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw grid lines
        for(let gridX of this.gridValues.x) {
            const x = translateX(gridX, { offsetX: offset.x, canvasWidth, scale });
            drawGridLine({ x, y: 0 }, { x, y: canvasHeight });
        }

        for(let gridY of this.gridValues.y) {
            const y = translateY(gridY, { offsetY: offset.y, canvasHeight, scale });
            drawGridLine({ x: 0, y }, { x: canvasWidth, y });
        }

        // Draw points
        const pointSize = 2;

        for(const {points, color} of this.graphs) {
            ctx.strokeStyle = color;
            ctx.beginPath();
            for(let i = 0; i < points.length; i++) {
                const {x, y} = translatePoint(points[i], { offset, canvasHeight, canvasWidth, scale });
                if(i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }

                ctx.stroke();
            }
        }
    }


}