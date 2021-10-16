import { getGridXYValues } from "./plotter.mjs";
import { translatePoint, translateX, translateY } from "./translator.mjs";

/** @param {{ view: ViewSettings }} param0 */
export function drawGridLines({ canvas, view }) {
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const gridLineStyle = {
        color: "#333333",
        axisColor: "#a0a0a0",
        width: 1.5
    };

    function drawGridLine(from, to) {
        ctx.strokeStyle = gridLineStyle.color;
        ctx.lineWidth = gridLineStyle.width;
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
    }

    const viewBounds = view.getBounds({ canvasHeight, canvasWidth });
    const scale = view.getScale({ canvasWidth });
    const offset = view.position;
    
    const gridValues = getGridXYValues(viewBounds);


    const translationArgs = { offsetX: offset.x, offsetY: offset.y, canvasWidth, canvasHeight, scale };
    const gridValuesPairs = {
        x: gridValues.x.map(x => ({ absolute: x, relative: translateX(x, translationArgs) })),
        y: gridValues.y.map(y => ({ absolute: y, relative: translateY(y, translationArgs) }))
    };


    console.log(gridValuesPairs.y);


    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);


    // Draw grid lines
    for(let gridX of gridValuesPairs.x) {
        const x = gridX.relative;
        drawGridLine({ x, y: 0 }, { x, y: canvasHeight });
    }

    for(let gridY of gridValuesPairs.y) {
        const y = gridY.relative;
        drawGridLine({ x: 0, y }, { x: canvasWidth, y });
    }

    // Draw side rules
    drawSideRules({ canvas, valuesPairs: gridValuesPairs });
}




export function drawGraph({ graph, canvas, view }) {
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const viewBounds = view.getBounds({ canvasHeight, canvasWidth });
    const scale = view.getScale({ canvasWidth });
    const offset = view.position;

    const color = graph.color;
    const points = graph.plotFromXBounds(viewBounds.x1, viewBounds.x2);

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";

    ctx.beginPath();
    for(let i = 0; i < points.length; i++) {
        const point = points[i];
        const {x, y} = translatePoint(point, { offset, canvasHeight, canvasWidth, scale });
        if(i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }


    ctx.stroke();
}


/** @param {{ canvas: HTMLCanvasElement, valuesPairs: { x: {relative: number, absolute: number}, y: {relative: number, absolute: number}} }} param0 */
export function drawSideRules({ canvas, valuesPairs }) {

    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    function putText(text, x, y) {
        ctx.fillStyle = "#999999";
        ctx.font = "11px Arial";
        ctx.textAlign = "center";

        ctx.fillText(text, x, y);
    }

    const sideRulePadding = 23;


    const xLabel_y = canvasHeight - (sideRulePadding/2) + 5;
    const yLabel_x = sideRulePadding/2;

    ctx.clearRect(0, canvasHeight - sideRulePadding, canvasWidth, sideRulePadding);
    for(const { relative, absolute } of valuesPairs.x) {
        putText(absolute, relative, xLabel_y);
    }


    ctx.clearRect(0, 0, sideRulePadding, canvasHeight);
    for(const { relative, absolute } of valuesPairs.y) {
        putText(absolute, yLabel_x, relative + 5);
    }
}