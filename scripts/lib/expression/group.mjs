import { parseExpression } from "./parser.mjs";

/** Groups tokens from grouping symbols '( )' */
export function groupTokens(tokens) {

    /** @type {{type: "group", contents: []}[]} */
    const groupStack = [ { type: "group", contents: [] } ];
    const getCurrentGroup = () => groupStack[groupStack.length - 1];
    const addToStack = () => groupStack.push({ type: "group", contents: []});
    const popStack = () => {
        let lastGroup = groupStack.pop();
        if(groupStack.length === 0) addToStack();

        // Optimize lastGroup (if the only content is a group, splice the layer)
        if(lastGroup.contents.length === 1 && lastGroup.contents[0].type === "group") {
            lastGroup = lastGroup.contents[0];
        }

        getCurrentGroup().contents.push(lastGroup);
    };

    for(const token of tokens) {
        if(token.type === "grouping") {
            if(token.value === "(") addToStack(); else popStack();
        } else {
            getCurrentGroup().contents.push(token);
        }
    }

    // Pop stack
    while(groupStack.length > 1) popStack();

    let grouped = groupStack[0].contents;
    if(grouped.length === 1 && grouped[0].type === "group")
        grouped = grouped[0];

    return grouped;
}







/// UNIT TEST
function test() {
    const expression = "1+2))))+3";
    const tokens = parseExpression(expression);
    const grouped = groupTokens(tokens);

    console.log(grouped);
}

// test();