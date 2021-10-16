import { pickRandomColor } from "../../utils/misc.mjs";
import { Graph } from "../Graph.mjs";
import { SolvableExpression } from "../SolvableExpression.mjs";

export class FunctionItem {

    /** @private */
    static idCounter = 0;

    constructor() {
        this.id = FunctionItem.idCounter++;
        this.content = "";
        this.isVisible = true;
        this.color = pickRandomColor();
        this.graph = new Graph({ expression: SolvableExpression.fromString(""), color: this.color });
    }

    updateColor(color) {
        this.color = color;
        this.graph.color = color;
    }

    updateContent(content) {
        this.content = content;
        this.graph.expression.updateExpression(content);
    }

    toggleVisibility() {
        this.isVisible = !this.isVisible;
    }
}
