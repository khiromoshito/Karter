import { getGridXYValues } from "./plotter.mjs";
import { translatePoint, translateX, translateY } from "./translator.mjs";

/** @param {{ view: ViewSettings }} param0 */
export function drawGridLines({ canvas, view }) {
    const ctx = canvas.getContext("2d");
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const gridLineStyle = {
        color: "#333333",
        axisColor: "#5a5a5a",
        width: 1.5
    };

    function drawGridLine(from, to, { isAxis } = { isAxis: false }) {
        ctx.strokeStyle = isAxis ? gridLineStyle.axisColor : gridLineStyle.color;
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


    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);


    let xAxis;
    let yAxis;


    // Draw grid lines
    for(let gridX of gridValuesPairs.x) {
        const x = gridX.relative;
        const isAxis = gridX.absolute === 0;
        
        if(isAxis) xAxis = gridX; else
        drawGridLine({ x, y: 0 }, { x, y: canvasHeight }, { isAxis });
    }


    for(let gridY of gridValuesPairs.y) {
        const y = gridY.relative;
        const isAxis = gridY.absolute === 0;

        if(isAxis) yAxis = gridY; else
        drawGridLine({ x: 0, y }, { x: canvasWidth, y }, { isAxis });
    }

    if(xAxis) drawGridLine({ x: xAxis.relative, y: 0 }, { x: xAxis.relative, y: canvasHeight }, {isAxis: true});
    if(yAxis) drawGridLine({ x: 0, y: yAxis.relative }, { x: canvasWidth, y: yAxis.relative }, { isAxis: true });

    // Draw side rules
    drawSideRules({ canvas, valuesPairs: gridValuesPairs });
}




export function drawGraph({ graph, canvas, view }) {
    if(!graph) return;

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
        if(!point) continue;

        const {x, y} = translatePoint(point, { offset, canvasHeight, canvasWidth, scale });

        let isPreviousPointUndefined = i === 0 || points[i-1] === undefined;
        let isNextPointUndefined = i === points.length-1 || points[i+1] === undefined;

        if(isPreviousPointUndefined) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        if(isNextPointUndefined) ctx.stroke();

    }


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