
export class Point {
    /**
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /** @return {[number, number]} */
    toArray() {
        return [this.x, this.y];
    }
}