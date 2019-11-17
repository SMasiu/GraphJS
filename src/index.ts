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
import RangeChart from "./classes/range-chart";
import LineChart from "./classes/line-chart";
import PolygonChart from "./classes/polygon-chart";
import ColumnChart from "./classes/column-chart";

let canvas1: HTMLCanvasElement | null = document.querySelector('#c1');
let canvas2: HTMLCanvasElement | null = document.querySelector('#c2');
let canvas3: HTMLCanvasElement | null = document.querySelector('#c3');
let canvas4: HTMLCanvasElement | null = document.querySelector('#c4');
let canvas5: HTMLCanvasElement | null = document.querySelector('#c5');
let canvas6: HTMLCanvasElement | null = document.querySelector('#c6');
let canvas7: HTMLCanvasElement | null = document.querySelector('#c7');
let canvas8: HTMLCanvasElement | null = document.querySelector('#c8');
let canvas9: HTMLCanvasElement | null = document.querySelector('#c9');

if(canvas1) {
    let grid: Grid = new HorizontalGrid(canvas1, {
        // top: new ValueLabel(0, 100, 20),
        // right: new PercentLabel(25, {reverse: true}),
        bottom: new StringLabel(['June', 'July', 'May', 'November', 'December']),
        left: new ValueLabel(0, 100, 20, {reverse: true})
    });
    grid.addCharts({
        line: new LineChart({
            fill: false,
            dots: true,
            values: [{
                color: 'red',
                values: [50, 76, 60, 45, 90, 70]
            }, {
                color: 'orange',
                values: [[30, 60, 40, 70], [10 , 0, 40], [5], [60, 65, 65, 100, 90], [70, 75, 85], 75]
            }]
        })
    })
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
    grid.addCharts({
        polygon: new PolygonChart({
            dots: true,
            values: [{
                color: 'red',
                values: [100, 10, 100, 100, 10]
            }]
        })
    });
    grid.draw();
}
if(canvas4) {
    let grid = new CoordinateSystem2dGrid(canvas4, {
        x: new ValueLabel(-100, 100, 50),
        y: new ValueLabel(-100, 100, 20, {reverse: true})
    });
    grid.addCharts({
        line: new LineChart({
            fill: true,
            dots: true,
            values: [{
                color: 'red',
                values: [10, 50, 60, 40, 30]
            }, {
                color: 'orange',
                values: [[-30, -60, -40, -70], [-10 , -10, -40], [-60, -65, -65, -100, -90], [-70, -75, -85], -70]
            }]
        })
    });
    grid.draw();
}
if(canvas5) {
    let grid = new CoordinateSystem1dGrid(canvas5, new ValueLabel(-100, 100, 20));
    grid.addCharts({
        range: new RangeChart({
            values: [{
                color: 'red',
                values: [0]
            },{
                color: 'gray',
                values: [[Infinity, -10], [10, Infinity]]
            },{
                color: 'orange',
                values: [[Infinity, Infinity]]
            }]
        })
    })
    grid.draw();
}
if(canvas6) {
    let grid = new NoGrid(canvas6, new StringLabel(['June', 'July', 'May']));
    grid.addCharts({
        sameRoud: new SameDirectionRoundChart({
            centerValue: 130,
            values: [{
                color: 'red',
                values: 60
            },{
                color: 'orange',
                values: 50
            },{ 
                color: 'gray',
                values: 40
            }]
        })
    });
    grid.draw();
}
if(canvas7) {
    let grid = new NoGrid(canvas7, new StringLabel(['June', 'July', 'May']));
    grid.addCharts({
        roud: new RoundChart({
            centerValue: 130,
            changingSize: true,
            blankCenter: true,
            itemsMargin: 5,
            values: [{
                color: 'orange',
                values: 40
            },{
                color: 'red',
                values: 40
            },{ 
                color: 'gray',
                values: 20
            }]
        })
    });
    grid.draw();
}
if(canvas8) {
    let grid: Grid = new HorizontalGrid(canvas8, {
        // top: new ValueLabel(0, 100, 20),
        // right: new PercentLabel(25, {reverse: true}),
        bottom: new StringLabel(['June', 'July', 'May', 'November', 'December']),
        left: new ValueLabel(-100, 100, 20, {reverse: true})
    });
    grid.addCharts({
        column: new ColumnChart({
            values: [{
                type: 'simple',
                color: 'red',
                values: 50
            },{
                type: 'simple',
                color: 'orange',
                values: 60
            },{
                type: 'group',
                color: ['gray', 'orange', 'red'],
                values: [20, 50, 60]
            },{
                type: 'group',
                color: ['gray', 'orange', 'red'],
                values: [50, 30, 70],
                margin: 'collapse'
            },{
                type: 'stacked-group',
                color: ['gray', 'orange', 'red'],
                values: [20, 30, 50]
            }]
        }),
        opositeColumn: new ColumnChart({
            values: [{
                type: 'simple',
                color: 'blue',
                values: -50
            },{
                type: 'simple',
                color: 'pink',
                values: -60
            },{
                type: 'group',
                color: ['black', 'yellow', 'silver'],
                values: [-20, -50, -60]
            },{
                type: 'group',
                color: ['black', 'pink', 'silver'],
                values: [-50, -30, -70],
                margin: 'collapse'
            },{
                type: 'stacked-group',
                color: ['black', 'yellow', 'siler'],
                values: [20, 30, 50],
                direction: 'reverse'
            }]
        })
    });
    
    grid.draw();
}
if(canvas9) {
    let grid = new CoordinateSystem2dGrid(canvas9, {
        x: new ValueLabel(-100, 100, 50),
        y: new ValueLabel(-100, 100, 20, {reverse: true})
    });
    grid.addCharts({
        column: new ColumnChart({
            values: [{
                type: 'simple',
                color: 'red',
                values: 50
            },{
                type: 'group',
                color: ['gray', 'orange', 'red'],
                values: [20, 50, 60]
            },{
                type: 'group',
                color: ['gray', 'orange', 'red'],
                values: [50, 30, 70],
                margin: 'collapse'
            },{
                type: 'stacked-group',
                color: ['gray', 'orange', 'red'],
                values: [20, 30, 50]
            }]
        })
    })
    grid.draw();
}