import { plotGraphPoints } from "./lib/graph/plotter.mjs";
import { Graph } from "./lib/structures/Graph.mjs";
import { GraphingCanvas } from "./lib/structures/GraphingCanvas.mjs";
import { GraphsManager } from "./lib/structures/GraphsManager.mjs";
import { SolvableExpression } from "./lib/structures/SolvableExpression.mjs";

const manager = new GraphsManager();
const canvas = document.getElementById("graph-canvas");

manager.initialize({ canvas });

const expression = SolvableExpression.fromString("x^4 + 5x^3 + 3x^2 + 2x");
// manager.graphs.push(new Graph({ expression, color: "#ff0000" }));

manager.grapher.render();

document.getElementById("btn-zoomin").onclick = function() {
    manager.view.zoomIn();
}

document.getElementById("btn-zoomout").onclick = function() {
    manager.view.zoomOut();
}