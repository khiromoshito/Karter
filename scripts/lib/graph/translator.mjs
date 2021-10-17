import { Point } from "../structures/Point.mjs";

export function translatePoint(point, { offset, canvasHeight, canvasWidth, scale }) {

    const relativePoint = new Point((point.x - offset.x)*scale, (point.y - offset.y)*scale);
    const canvasX = relativePoint.x + canvasWidth/2;
    const canvasY = -relativePoint.y + canvasHeight/2;

    return new Point(canvasX, canvasY);
}

export function translateX(x, { offsetX, canvasWidth, scale }) {
    const relativeX = (x - offsetX)*scale;
    return relativeX + canvasWidth/2;
}

export function translateY(y, { offsetY, canvasHeight, scale }) {
    const relativeY = (y - offsetY)*scale;
    return -relativeY + canvasHeight/2;
}
