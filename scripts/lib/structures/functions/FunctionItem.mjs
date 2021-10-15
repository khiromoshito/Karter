import { pickRandomColor } from "../../utils/misc.mjs";
import { Graph } from "../Graph.mjs";
import { SolvableExpression } from "../SolvableExpression.mjs";

export class FunctionItem {
    constructor({ onUpdate }) {
        this.content = "";
        this.isVisible = true;
        this.color = pickRandomColor();
        this.graph = new Graph({ expression: SolvableExpression.fromString(""), color: this.color });

        this.onUpdate = onUpdate;
    }

    updateColor(color) {
        this.color = color;
        this.graph.color = color;
        this.onUpdate();
    }

    updateContent(content) {
        this.content = content;
        this.graph.expression.updateExpression(content);
        this.onUpdate();
    }

    toggleVisibility() {
        this.isVisible = !this.isVisible;
        this.onUpdate();
    }
}
