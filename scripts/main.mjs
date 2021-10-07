import { plotGraphPoints } from "./lib/graph/plotter.mjs";
import { GraphingCanvas } from "./lib/structures/GraphingCanvas.mjs";
import { SolvableExpression } from "./lib/structures/SolvableExpression.mjs";

const canvas = document.getElementById("graph-canvas");
const graphingCanvas = new GraphingCanvas({ canvas });

const expression = SolvableExpression.fromString("x^2 - 2");
const points = plotGraphPoints({ expression, config: {
    bounds: { x1: -10, x2: 10 }, frequency: 500
} });

graphingCanvas.update({
    gridValues: {
        x: [ -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5 ],
        y: [ -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5 ],
    },
    graphs: [ { points, color: "#ff0000" } ]
});



document.getElementById("btn-zoomin").onclick = function() {
    graphingCanvas.update({ scale: graphingCanvas.scale*1.2 });
}

document.getElementById("btn-zoomout").onclick = function() {
    graphingCanvas.update({ scale: graphingCanvas.scale/1.2 });
}