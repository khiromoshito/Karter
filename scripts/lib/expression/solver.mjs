/* Written 10.06.21 */

import { arrangeOperations } from "./emdas.mjs";
import { groupTokens } from "./group.mjs";
import { parseExpression } from "./parser.mjs";

/** 
 * Solves string expression
 * @param {string} expression
 * @param {any} variables
 */
export function solveExpression(expression, variables = {}) {
    const tokens = parseExpression(expression);
    const grouped = groupTokens(tokens);
    const finalExpression = arrangeOperations(grouped);

    const solution = solveToken(finalExpression[0], variables);
    return solution;
}


function solveToken(token, variables) {
    let solution = 0;
    switch(token.type) {
        case "word":
            if(token.value in variables) {
                solution = variables[token.value];
            } else {
                throw(new Error("evaluation-error: unknown-variable"));
            }
        break;
        case "operation":
            solution = solveOperation(token, variables);
        break;
        case "number":
            solution = token.value;
        break;
        case "group":
            solution = solveToken(token.contents[0], variables);
        break;
    }

    return token.sign === "-" ? -solution : solution;
}


const OPERATION_ACTIONS = {
    "add": (left, right) => left + right,      
    "multiply": (left, right) => left * right,      
    "subtract": (left, right) => left - right,      
    "divide": (left, right) => left / right,      
    "power": (left, right) => left**right  
};

function solveOperation({ operation, contents }, variables) {
    const left = solveToken(contents[0], variables);
    const right = solveToken(contents[1], variables);

    if(operation in OPERATION_ACTIONS) {
        return OPERATION_ACTIONS[operation](left, right);
    } else {
        throw(new Error("parse-error: unknown-operation"));
    }
}






/// UNIT TEST
function test() {
    const expression = "(3a^2 - 2b)/(4a - 3b^3) + 8";
    const solution = solveExpression(expression, {
        a: 2, b: 1
    });

    console.log(`${expression} = ${solution}\n`);
}

test();