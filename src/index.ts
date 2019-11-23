import VerticalGrid from "./grids/vertical-grid";
import ValueLabel from "./labels/value-label";
import PercentLabel from "./labels/percent-label";
import PolygonGrid from "./grids/polygon-grid";
import CoordinateSystem1dGrid from "./grids/coordinate-system-1d-grid";
import NoGrid from "./grids/no-grid";
import SameDirectionRoundChart from "./charts/same-direction-round-chart";
import RoundChart from "./charts/round-chart";
import RangeChart from "./charts/range-chart";
import LineChart from "./charts/line-chart";
import PolygonChart from "./charts/polygon-chart";
import ColumnChart from "./charts/column-chart";
import RowChart from "./charts/row-chart";
import BubleChart from "./charts/buble-chart";
import GridFactor from "./factors/grid-factor";
import ChartFactor from "./factors/chart-factor";
import StringLabel from "./labels/string-label";
import HorizontalGrid from "./grids/horizontal-grid";
import Grid from "./grids/grid";
import CoordinateSystem2dGrid from "./grids/coordinate-system-2d-grid";

let canvas1: HTMLCanvasElement | null = document.querySelector('#c1');
let canvas2: HTMLCanvasElement | null = document.querySelector('#c2');
let canvas3: HTMLCanvasElement | null = document.querySelector('#c3');
let canvas4: HTMLCanvasElement | null = document.querySelector('#c4');
let canvas5: HTMLCanvasElement | null = document.querySelector('#c5');
let canvas6: HTMLCanvasElement | null = document.querySelector('#c6');
let canvas7: HTMLCanvasElement | null = document.querySelector('#c7');
let canvas8: HTMLCanvasElement | null = document.querySelector('#c8');
let canvas9: HTMLCanvasElement | null = document.querySelector('#c9');
let canvas10: HTMLCanvasElement | null = document.querySelector('#c10');
let canvas11: HTMLCanvasElement | null = document.querySelector('#c11');
let canvas12: HTMLCanvasElement | null = document.querySelector('#c12');
let canvas13: HTMLCanvasElement | null = document.querySelector('#c13');
let f = new ChartFactor({lineWidth: 1.5})
let gf = new GridFactor({colors: {primary: 'blue', secondary: 'red'}})

if(canvas3) {
    let polygon = new PolygonChart({
        dots: true,
        values: [{
            color: 'red',
            id: 1,
            values: [50, 40, 70, 30, 20]
        }]
    });
    let grid = new PolygonGrid(canvas3, new StringLabel(['June', 'July', 'May', 'November', 'December']));
    grid.addCharts({
        polygon
    });
    polygon.updateItemContent(1, {color: 'pink', values: [20, 20 ,20, 20, 20]})
    polygon.addItemContent({id: 2, color: 'blue', values: [50, 39, 40 ,50]})
    polygon.deleteItemContent(1);

    grid.draw();
}

if(canvas1) {
    let grid: Grid = new HorizontalGrid(canvas1, {
        // top: new ValueLabel(0, 100, 20),
        // right: new PercentLabel(25, {reverse: true}),
        bottom: new StringLabel(['June', 'July', 'May', 'November', 'December']),
        left: new ValueLabel(100, 0, 20)
    });
    grid.addCharts({
        line: new LineChart({
            factor: f,
            fill: false,
            dots: true,
            values: [{
                id: 1,
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
        left: new StringLabel(['June', 'July', 'May', 'November', 'December']),
        bottom: new ValueLabel(0, 100, 20),
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
    let grid = new NoGrid(canvas6);
    grid.addCharts({
        sameRoud: new SameDirectionRoundChart({
            labels: new StringLabel(['June', 'July', 'May', 'December']),
            centerValue: 130,
            values: [{
                color: 'red',
                values: 60,
            },{
                color: 'orange',
                values: 50
            },{ 
                color: 'gray',
                values: 40
            }]
        })
    });
    grid.chartList.sameRoud.addItemContent({values:70, color: 'black'})
    grid.draw();
}
if(canvas7) {
    let grid = new NoGrid(canvas7);
    grid.addCharts({
        roud: new RoundChart({
            labels: new StringLabel(['June', 'July', 'May']),
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




// left: new ValueLabel(100, 0, 50),
// bottom: new StringLabel(['x','a','a','a'])
// x: new ValueLabel(-50, 150, 50),
// y: new ValueLabel(100, 0, 10)    
// let column = new LineChart({
//     factor: f,
//     fill: false,
//     dots: true,
//     values: [{
//         id: 1,
//         color: 'red',
//         values: [50, 76, 60, 45, 90]
//     }, {
//         color: 'orange',
//         values: [[30, 60, 40, 70], [10 , 0, 40], [5], [60, 65, 65, 100, 90], 75]
//     }]
// })

// let column2 = new LineChart({
//     factor: f,
//     fill: false,
//     dots: true,
//     values: [{
//         id: 1,
//         color: 'green',
//         values: [-50, -76, -60, -45, -90]
//     }, {
//         color: 'blue',
//         values: [[-30, -60, -40, -70], [-10 , -0, -40], [-5], [-60, -65, -65, -100, -90], -75]
//     }]
// })

// if(canvas8) {
//     let grid: Grid = new CoordinateSystem2dGrid(canvas8, {  
//         x: new ValueLabel(-50, 150, 50),
//         y: new ValueLabel(-100, 0, 10)
//     });
//     grid.addCharts({
//         column2
//     });    
//     grid.draw();
// }
// if(canvas9) {
//     let grid: Grid = new CoordinateSystem2dGrid(canvas9, {  
//         x: new ValueLabel(-50, 150, 50),
//         y: new ValueLabel(100, 0, 10)
//     });
//     grid.addCharts({
//         column
//     });    
//     grid.draw();
// }
// if(canvas10) {
//     let grid: Grid = new CoordinateSystem2dGrid(canvas10, {  
//         x: new ValueLabel(-50, 150, 50),
//         y: new ValueLabel(100, -100, 10)
//     });
//     grid.addCharts({
//         column2,
//         column,
//     });    
//     grid.draw();
// }
// if(canvas11) {
//     let grid: Grid = new CoordinateSystem2dGrid(canvas11, {  
//         x: new ValueLabel(-50, 150, 50),
//         y: new ValueLabel(-100, 100, 10)
//     });
//     grid.addCharts({
//         column,
//         column2,
//     });    
//     grid.draw();
// }
// if(canvas12) {
//     let grid: Grid = new CoordinateSystem2dGrid(canvas12, {  
//         x: new ValueLabel(-50, 150, 50),
//         y: new ValueLabel(200, -100, 10) 
//     });
//     grid.addCharts({
//         column2,
//         column
//     });    
//     grid.draw();
// }
// if(canvas13) {
//     let grid: Grid = new CoordinateSystem2dGrid(canvas13, {  
//         x: new ValueLabel(-50, 150, 50),
//         y: new ValueLabel(100, -200, 10)
//     });
//     grid.addCharts({
//         column,
//         column2
//     });    
//     grid.draw();
// }


// if(canvas9) {
//     let grid = new CoordinateSystem2dGrid(canvas9, {
//         x: new ValueLabel(-100, 100, 50),
//         y: new ValueLabel(-100, 100, 20, {reverse: true})
//     });
//     grid.addCharts({
//         column: new ColumnChart({
//             values: [{
//                 type: 'simple',
//                 color: 'red',
//                 values: 50
//             },{
//                 type: 'group',
//                 color: ['gray', 'orange', 'red'],
//                 values: [20, 50, 60]
//             },{
//                 type: 'group',
//                 color: ['gray', 'orange', 'red'],
//                 values: [50, 30, 70],
//                 margin: 'collapse'
//             },{
//                 type: 'stacked-group',
//                 color: ['gray', 'orange', 'red'],
//                 values: [20, 30, 50]
//             }]
//         })
//     })
//     grid.draw();
// }
// if(canvas10) {
//     let grid = new VerticalGrid(canvas10, {
//         bottom: new ValueLabel(-100, 100, 20),
//         left: new StringLabel(['July', 'May', 'November', 'December']),
//     });
//     grid.addCharts({
//         row: new RowChart({
//             values: [{
//                 type: 'simple',
//                 color: 'red',
//                 values: 50
//             },{
//                 type: 'group',
//                 color: ['gray', 'orange', 'red'],
//                 values: [20, 10, 20]
//             },{
//                 type: 'group',
//                 color: ['gray', 'orange', 'red'],
//                 values: [-50, -30, 70],
//                 margin: 'collapse'
//             },{
//                 type: 'stacked-group',
//                 color: ['gray', 'orange', 'red'],
//                 direction: 'reverse',
//                 values: [20, 30, 50],
//             }]
//         })
//     });
//     grid.draw();
// }
// if(canvas11) {
//     let grid = new CoordinateSystem2dGrid(canvas11, {
//         x: new ValueLabel(-100, 100, 20),
//         y: new ValueLabel(-100, 100, 50, {reverse: true})
//     });
//     grid.addCharts({
//         row: new RowChart({
//             values: [{
//                 type: 'simple',
//                 color: 'red',
//                 values: 50
//             },{
//                 type: 'group',
//                 color: ['gray', 'orange', 'red'],
//                 values: [20, 10, 20]
//             },{
//                 type: 'group',
//                 color: ['gray', 'orange', 'red'],
//                 values: [-50, -30, 70],
//                 margin: 'collapse'
//             },{
//                 type: 'stacked-group',
//                 color: ['gray', 'orange', 'red'],
//                 direction: 'reverse',
//                 values: [20, 30, 50],
//             }]
//         })
//     });
//     grid.draw();
// }
// if(canvas12) {
//     let grid = new CoordinateSystem2dGrid(canvas12, {
//         x: new ValueLabel(-100, 100, 20),
//         y: new ValueLabel(-100, 100, 20, {reverse: true})
//     });
//     grid.addCharts({
//         buble: new BubleChart({
//             values: [{
//                 color: 'red',
//                 values: [0, 0],
//                 radius: 20
//             },{
//                 color: 'orange',
//                 values: [10, 40],
//                 radius: 10,
//             },{
//                 color: 'gray',
//                 id: 1,
//                 values: [-50, -40],
//                 radius: 25,
//             }]
//         })
//     })
//     grid.draw();
// }
if(canvas13) {
    let sameRoud = new RoundChart({
        labels: new StringLabel(['June', 'July', 'May']),
        centerValue: 130,
        canvas: canvas13,
        blankCenter: true,
        changingSize: true,
        itemsMargin: 10,
        values: [{
            color: 'red',
            values: 20,
        },{
            color: 'orange',
            values: 40
        },{ 
            color: 'gray',
            values: 40
        }]
    })
    sameRoud.draw();
}