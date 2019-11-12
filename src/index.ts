import HorizontalGrid from "./classes/horizontal-grid";
import VerticalGrid from "./classes/vertical-grid";
import Grid from "./classes/grid";

let canvas1: HTMLCanvasElement | null = document.querySelector('#c1');
let canvas2: HTMLCanvasElement | null = document.querySelector('#c2');

if(canvas1) {

    let grid: Grid = new HorizontalGrid(canvas1, {
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
if(canvas2) {
    let grid = new VerticalGrid(canvas2, {
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