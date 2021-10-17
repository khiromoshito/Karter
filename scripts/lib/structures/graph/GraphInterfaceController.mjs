import { Point } from "../Point.mjs";

export class GraphInterfaceController {

    /** @param {{ onDrag: (dragDetails: { origin: Point, dragOffset: Point, current: Point })=>any }} */
    constructor({ onMouseDown, onMouseUp, onDrag, onWheel, element }) {
        this.listeners = { onMouseDown, onMouseUp, onWheel, onDrag };

        /** @type {HTMLElement} */
        this.element = element;

        this.initializeControls();
    }

    initializeControls() {
        const element = this.element;
        const { onMouseDown, onMouseUp, onDrag, onWheel } = this.listeners;
        
        /** @type {Point} */
        let origin;

        /** @param {MouseEvent} e */
        const dragListener = (e) => {
            const { clientX: x, clientY: y } = e;

            const dragOffset = new Point(origin.x - x, origin.y - y);
            const current = new Point(x, y);

            onDrag({ origin, dragOffset, current });
        };

        element.addEventListener("mousedown", (e) => {
            origin = new Point(e.clientX, e.clientY);

            element.addEventListener("mousemove", dragListener);
            onMouseDown(e);
        });

        element.addEventListener("wheel", (e) => onWheel(e.deltaY));

        document.body.addEventListener("mouseup", (e) => {
            origin = new Point(e.clientX, e.clientY);

            element.removeEventListener("mousemove", dragListener);
            onMouseUp(e);
        });
    }
}