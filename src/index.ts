import HorizontalGrid from "./classes/horizontal-grid";
import VerticalGrid from "./classes/vertical-grid";
import Grid from "./classes/grid";
import ValueLabel from "./classes/value-label";
import StringLabel from "./classes/string-label";
import PercentLabel from "./classes/percent-label";
import PolygonGrid from "./classes/polygon-grid";
import CoordinateSystem2dGrid from "./classes/coordinate-system-2d-grid";
import CoordinateSystem1dGrid from "./classes/coordinate-system-1d-grid";
import NoGrid from "./classes/no-grid";
import SameDirectionRoundChart from "./classes/same-direction-round-chart";
import RoundChart from "./classes/round-chart";

let canvas1: HTMLCanvasElement | null = document.querySelector('#c1');
let canvas2: HTMLCanvasElement | null = document.querySelector('#c2');
let canvas3: HTMLCanvasElement | null = document.querySelector('#c3');
let canvas4: HTMLCanvasElement | null = document.querySelector('#c4');
let canvas5: HTMLCanvasElement | null = document.querySelector('#c5');
let canvas6: HTMLCanvasElement | null = document.querySelector('#c6');
let canvas7: HTMLCanvasElement | null = document.querySelector('#c7');

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
        x: new ValueLabel(-100, 100, 20),
        y: new ValueLabel(-100, 100, 20, {reverse: true})
    });
    grid.draw();
}
if(canvas5) {
    let grid = new CoordinateSystem1dGrid(canvas5, new ValueLabel(-100, 100, 20));
    grid.draw();
}
if(canvas6) {
    let grid = new NoGrid(canvas6, new StringLabel(['June', 'July', 'May']));
    grid.addCharts({
        animals: new SameDirectionRoundChart({
            centerValue: 130,
            values: [{
                color: 'red',
                value: 60
            },{
                color: 'orange',
                value: 50
            },{ 
                color: 'gray',
                value: 40
            }]
        })
    });
    grid.draw();
}
if(canvas7) {
    let grid = new NoGrid(canvas7, new StringLabel(['June', 'July', 'May']));
    grid.addCharts({
        animals: new RoundChart({
            centerValue: 130,
            changingSize: true,
            blankCenter: true,
            itemsMargin: 5,
            values: [{
                color: 'orange',
                value: 40
            },{
                color: 'red',
                value: 40
            },{ 
                color: 'gray',
                value: 20
            }]
        })
    });
    grid.draw();
}