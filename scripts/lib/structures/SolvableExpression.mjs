import { arrangeOperations } from "../expression/emdas.mjs";
import { groupTokens } from "../expression/group.mjs";
import { parseExpression } from "../expression/parser.mjs";
import { solveExpression } from "../expression/solver.mjs";

export class SolvableExpression {

    constructor(root_token, originalString) {
        this.root_token = root_token;

        this.error = null;

        this.originalString = originalString;
    }

    /** 
     * Solves this expression.
     * @param {any} variables - list of variable values to substitute into expression
     * @returns {number}
     * */
    solve(variables = {}) {
        if(!this.root_token) return undefined;

        try {
            let solution = solveExpression(this.root_token, variables);
            if((solution !== 0 && !solution) || solution === Infinity) solution = undefined;
            return solution;
        } catch(e) {
            return undefined;
        }
    }


    updateExpression(expression_string) {
        this.originalString = expression_string;
        try {
            const newVersion = SolvableExpression.fromString(expression_string);
            this.root_token = newVersion.root_token;
            this.error = undefined;
        } catch(e) {
            this.error = e;
            this.root_token = undefined;
        }
    }




    // CONSTRUCTOR
    /** Creates a solvable expression from string expression */
    static fromString(expression) {
        const tokens = arrangeOperations(groupTokens(parseExpression(expression)));
        const root_token = tokens[0];

        return new SolvableExpression(root_token, expression.replace(/ /g, ""));
    }
}







/// UNIT TEST
function test() {
    const expression = SolvableExpression.fromString("(3a^2 - 2b)/(4a - 3b^3) + 8");
    const solution = expression.solve({ a: 2, b: 1 });

    console.log(`${expression.originalString} = ${solution}\n`);
}

// test();