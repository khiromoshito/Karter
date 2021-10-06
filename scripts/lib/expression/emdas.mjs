
import { parseExpression } from "./parser.mjs";
import { groupTokens } from "./group.mjs";

const operations = [
    { symbol: "^", name: ["power"] },
    { symbol: "*/", name: ["multiply", "divide"] },
    { symbol: "+-", name: ["add", "subtract"] },
];


/** Groups operations according to EMDAS rule */
export function arrangeOperations(tokens) {
    let arranged = [...tokens];

    arranged = unifyTerms(arranged);
    arranged = unifySigns(arranged);
    
    for(const operation of operations) {
        arranged = arrangeByOperation(arranged, operation);
    }


    return arranged;
}


/** Combine different non-operator tokens as multipliables */
function unifyTerms(tokens) {
    const unified = [];
    let lastType = null;

    for(let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if(lastType != null) {
            if(token.type !== "operator") {
                unified.push({ type: "operator", value: "*" });
            } else {
                lastType = null;
            }
        } else {
            if(token.type !== "operator") {
                lastType = "non-operator";
            }
        }
        
        unified.push(token);
    }

    return unified;
}

/** Combine +- signs */
function unifySigns(tokens) {
    
    const unified = [];
    let lastType = null;

    for(const token of tokens) {
        if(token.type === "operator") {
            if(["+", "-"].includes(token.value)) {
                if(lastType === null) {
                    lastType = "+-";
                    unified.push(token);
                } else if(lastType === "+-") {
                    const lastToken = unified[unified.length - 1];
                    lastToken.value = combineSigns(
                        lastToken.value, token.value);
                } else {
                    lastType = null;
                    unified.push(token);
                }
            } else {
                lastType = null;
                unified.push(token);
            }
        } else {
            if(lastType === "+-") token.sign = unified.pop().value;
            lastType = "number";

            if(token.type === "group") 
                token.contents = unifySigns(token.contents);
            unified.push(token);
        }
    }

    return unified;
}




/**
 * @param {any[]} tokens 
 * @param {{symbol: string, name: string}} operation 
 * @returns 
 */
function arrangeByOperation(tokens, operation) {
    const arranged = [];
    let i = 0;

    while(i < tokens.length) {
        const token = tokens[i];

        if(token.type === "operator" && operation.symbol.includes(token.value)) {

            // If current operation token is last
            if(i === token.length - 1) throw(new Error("parse-error: operation-no-right"));

            const lastToken = arranged.pop();
            const nextToken = tokens[i + 1];

            const operationName = operation.name[
                operation.symbol.indexOf(token.value)
            ];

            if(lastToken.type === "group") lastToken.contents = arrangeOperations(lastToken.contents);
            if(nextToken.type === "group") nextToken.contents = arrangeOperations(nextToken.contents);
            arranged.push({ type: "operation", operation: operationName, contents: [ lastToken, nextToken ] });

            i += 2;
        } else {
            if(token.type === "group") {
                token.contents = arrangeByOperation(token.contents, operation);
            }
            arranged.push(token);
            i++;
        }
    }

    return arranged;
}


/** Gets first number from tokens including prefix signs */
function getFirstNumber(tokens) {
    let negativeCount = 0;
    let numberToken = null;

    let i = 0;
    while(i < tokens.length) {
        const token = tokens[i];
        if(token.type === "operator") {
            if(token.value === "-") {
                negativeCount++; i++;
            }
            else if(token.value !== "+") throw("parse-error: unexpected-operation")
        } else {
            numberToken = token;
            break;
        }
    }

    if(numberToken === null) throw("parse-error: no-number-found");
    
    const targetSign = negativeCount%2 === 0 ? "+" : "-";
    const number = {...numberToken, 
        sign: combineSigns(targetSign, numberToken.sign)};

   return { number, skips: i + 1 };
}


function combineSigns(sign1, sign2) {
    if(sign1 === undefined) return sign2;
    if(sign2 === undefined) return sign1;
    if(sign1 === sign2 ) return "+";
    return "-";
}



/// UNIT TEST
function test() {
    console.time("Process time");
    const expression = "-3x^(1+2)";
    const tokens = parseExpression(expression);
    const grouped = groupTokens(tokens);
    const arranged = arrangeOperations(grouped);
    console.timeEnd("Process time");

    console.log(JSON.stringify(arranged, null, 3));
}

// test();