
/**
 * Parses string expressions into an array of tokens.
 * @param {string} expression - function expression from user input
 * @returns {{ type: string, value: any }[]}
 */
export function parseExpression(expression) {
    const chars = expression.replace(/ /g, "").split("");
    const tokens = [];

    for(let i = 0; i < chars.length;) {
        const char = chars[i];
        const type = CHAR_REF.getTypeOf(char);

        if(type === null) { i++; continue; } else
        if(type === "digit") {
            // Composed number, starting from initial digit
            let digits = char;

            // Traverse thru next digits 'til not a digit
            while(i < chars.length) {
                const foundChar = chars[++i];
                if(CHAR_REF.isDigit(foundChar)) {
                    digits += foundChar
                } else break;
            }

            tokens.push({ type: "number", value: Number(digits) });

        } else if(type === "letter") {
            // Composed word, starting from initial letter
            let word = char;

            // Traverse thru next letters 'til not a letter
            while(i < chars.length) {
                const foundChar = chars[++i];
                if(CHAR_REF.isLetter(foundChar)) {
                    word += foundChar
                } else break;
            }

            tokens.push({ type: "word", value: word });
        } else {
            tokens.push({ type, value: char });
            i++;
        }
    }

    return tokens;
}




const CHAR_REF = {
    digits: "0123456789.",
    letters: "abcdefghijklmnopqrstuvwxyz",
    grouping: "()",
    operator: "+-/*^",

    isDigit: (char) => CHAR_REF.digits.includes(char),
    isLetter: (char) => CHAR_REF.letters.includes(char),
    isGrouping: (char) => CHAR_REF.grouping.includes(char),
    isOperator: (char) => CHAR_REF.operator.includes(char),

    /**
     * @param {string} char 
     * @returns {"digit" | "letter" | "grouping" | "operator"} 
     */
    getTypeOf(char) {
        if(this.isDigit(char)) return "digit";
        if(this.isLetter(char)) return "letter";
        if(this.isGrouping(char)) return "grouping";
        if(this.isOperator(char)) return "operator";
        return null;
    }
};







/// UNIT TEST
function test() {
    const expression = "(22x + 3^7) / 5 + 3";
    const tokens = parseExpression(expression);
    console.log(tokens);
}

// test();