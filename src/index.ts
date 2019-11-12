import HorizontalGrid from "./classes/horizontal-grid";

let canvas: HTMLCanvasElement | null = document.querySelector('canvas');

if(canvas) {

    let grid = new HorizontalGrid(canvas, {
        left: {
            type: 'value',
            values: [100, 80, 60, 40, 20, 0]
        }, 
        right: {
            type: 'value',
            values: [100, 80, 60, 40, 20, 0]
        },
        top: {
            type: 'value',
            values: [0, 20, 40, 60, 80, 100]
        },
        bottom: {
            type: 'value',
            values: [100, 80, 60, 40, 20, 0]
        }
    });

    grid.draw();

}