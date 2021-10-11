import { plotGraphPoints, plotGraphPointsFromXValues } from "../graph/plotter.mjs";
import { SolvableExpression } from "./SolvableExpression.mjs";


/** Represents an instance of a graph */
export class Graph {

    /** @param {{expression: SolvableExpression, color: string}} param0 */
    constructor({ expression, color }) {
        this.expression = expression;
        this.color = color;
    }

    /** List all mappable points from given x values */
    plot(xValues) {
        return plotGraphPointsFromXValues({ expression: this.expression, xValues });
    }

    plotFromXBounds(x1, x2) {
        return plotGraphPoints({ expression: this.expression, 
            config: { bounds: {x1, x2}, frequency: 500 } });
    }
}