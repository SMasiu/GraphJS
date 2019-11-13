import HorizontalGrid from "./classes/horizontal-grid";
import VerticalGrid from "./classes/vertical-grid";
import Grid from "./classes/grid";
import ValueLabel from "./classes/value-label";
import StringLabel from "./classes/string-label";
import PercentLabel from "./classes/percent-label";
import PolygonGrid from "./classes/polygon-grid";
import CoordinateSystem2dGrid from "./classes/coordinate-system-2d-grid";

let canvas1: HTMLCanvasElement | null = document.querySelector('#c1');
let canvas2: HTMLCanvasElement | null = document.querySelector('#c2');
let canvas3: HTMLCanvasElement | null = document.querySelector('#c3');
let canvas4: HTMLCanvasElement | null = document.querySelector('#c4');

new ValueLabel(0, 100, 20);

if(canvas1) {
    let grid: Grid = new HorizontalGrid(canvas1, {
        top: new ValueLabel(0, 100, 20),
        right: new PercentLabel(25, {reverse: true}),
        bottom: new StringLabel(['June', 'July', 'May', 'November', 'December']),
        left: new ValueLabel(0, 100, 20, {reverse: true})
    });
    grid.draw();
}
if(canvas2) {
    let grid = new VerticalGrid(canvas2, {
        top: new PercentLabel(25, {reverse: true}),
        right: new StringLabel(['June', 'July', 'May', 'November', 'December']),
        bottom: new ValueLabel(0, 100, 20),
        left: new ValueLabel(0, 100, 20, {reverse: true})
    });
    grid.draw();
}
if(canvas3) {
    let grid = new PolygonGrid(canvas3, new StringLabel(['June', 'July', 'May', 'November', 'December']));
    grid.draw();
}
if(canvas4) {
    let grid = new CoordinateSystem2dGrid(canvas4, {
        x: new ValueLabel(-20, 100, 20),
        y: new ValueLabel(-20, 100, 20, {reverse: true})
    });
    grid.draw();
}
