import HorizontalGrid from "./classes/horizontal-grid";

let canvas: HTMLCanvasElement | null = document.querySelector('canvas');

if(canvas) {

    let grid = new HorizontalGrid(canvas, {
        left: {
            type: 'string',
            values: ['June', 'July', 'November', 'December']
        }, 
        right: {
            type: 'string',
            values: ['London', 'Warsaw', 'Gliwize', 'Zabrze']
        },
        top: {
            type: 'string',
            values: ['one','two','thre','four','five']
        },
        bottom: {
            type: 'string',
            values: ['June', 'July', 'November', 'December']
        }
    });

    grid.draw();

}