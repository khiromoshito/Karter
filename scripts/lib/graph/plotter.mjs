import { GraphConfig } from "../structures/graph/GraphConfig.mjs";
import { Point } from "../structures/Point.mjs";
import { SolvableExpression } from "../structures/SolvableExpression.mjs";



/**
 * Graph points from expression according to given settings
 * @param {{expression: SolvableExpression, config: GraphConfig}} param0
 * @returns {Point[]}
 */
export function plotGraphPoints({ expression, config }) {
    const xValues = mapXValues(config);
    return plotGraphPointsFromXValues({ expression, config, xValues });
}

/** @param {{ expression: SolvableExpression, xValues: number[] }} param0 */
export function plotGraphPointsFromXValues({ expression, xValues }) {

    if(expression.error || !expression.root_token) return [];

    /** @type {Point[]} */
    const points = [];

    for(const x of xValues) {
        const y = expression.solve({x});
        points.push(new Point(x, y));
    }

    return points;
}

/** 
 * Lists all x values from graph settings
 * @param {GraphConfig} param0
 * @returns {number[]} */
export function mapXValues({bounds: {x1, x2}, frequency = 1000}) {
    const interval = (x2 - x1)/frequency;
    const xValues = [];

    for(let x = x1; x <= x2; x += interval) {
        const preciseX = Number(x.toFixed(4));
        xValues.push(preciseX);
    }

    return xValues;
}




/**
 * Lists all x and y values for the grid in the given bounds
 * @param {{x1: number, x2: number}} param0 
 * @returns {{x: number[], y: number[]}}
 */
export function getGridXYValues({x1, x2, y1, y2}) {
    
    const maxRange = Math.max(x2 - x1, y2 - y1);

    // Average number of grid lines
    const averageFrequency = 10;

    // The specific range where interval is 1
    const scaleBase = 8;

    // Distances between grid lines
    const interval = Math.floor(maxRange / scaleBase);

    const startX = Math.floor(x1 / interval) * interval;
    const startY = Math.floor(y1 / interval) * interval;

    const values = { x: [], y: [] };

    for(let x = startX; x <= x2; x += interval) values.x.push(Number(x.toFixed(4)));
    for(let y = startY; y <= y2; y += interval) values.y.push(Number(y.toFixed(4)));

    return values;
}








// UNIT TEST
function test() {
    const expression = SolvableExpression.fromString("x^2");
    const points = plotGraphPoints({ expression, config: {
        bounds: { x1: -10, x2: 10 }, frequency: 1000
    } });

    console.log(points);
    
    // const gridValues = getGridXYValues({ x1: -12, x2: 12, y1: -7, y2: 7});
    // console.log(gridValues);
}

// test();