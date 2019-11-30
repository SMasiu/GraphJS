import CoordinateSystem2dGrid from "./src/grids/coordinate-system-2d-grid";
import CoordinateSystem1dGrid from "./src/grids/coordinate-system-1d-grid";
import HorizontalGrid from "./src/grids/horizontal-grid";
import VerticalGrid from "./src/grids/vertical-grid";
import NoGrid from "./src/grids/no-grid";
import PolygonGrid from "./src/grids/polygon-grid";
import GridFactor, { DEFAULT_GRID_FACTOR } from "./src/factors/grid-factor";
import ChartFactor, { DEFAULT_CHART_FACTOR } from "./src/factors/chart-factor";
import StringLabel from "./src/labels/string-label";
import ValueLabel from "./src/labels/value-label";
import PercentLabel from "./src/labels/percent-label";
import FlexLabel from "./src/labels/flex-label";
import BubleChart from "./src/charts/buble-chart";
import ColumnChart from "./src/charts/column-chart";
import LineChart from "./src/charts/line-chart";
import PolygonChart from "./src/charts/polygon-chart";
import RangeChart from "./src/charts/range-chart";
import RoundChart from "./src/charts/round-chart";
import SameDirectionRoundChart from "./src/charts/same-direction-round-chart";
import RowChart from "./src/charts/row-chart";

let canvas = <HTMLCanvasElement>document.querySelector('canvas');

let chart1 = new LineChart({
    values: [{
        color: '#FF2212',
        values: [170,190,185,195,200,180,190,170]
    }]
})

let chart2 = new LineChart({
    dashLine: [10, 5],
    values: [{
        color: '#C229AD',
        values: [150,180,145,185,170,150,170,150]
    }]
})

let chart3 = new LineChart({
    smooth: true,
    values: [{
        color: '#59BF0B',
        values: [120,150,115,155,150,130,160,130]
    }]
})

let chart4 = new LineChart({
    dots: true,
    values: [{
        color: '#3D48EB',
        values: [110,120,95,125,130,110,120,100]
    }]
})

let chart5 = new LineChart({
    dots: true,
    values: [{
        color: '#007785',
        values: [[90,75,70],[80,90,80,70],[85, 60],80,[70, 60],[70, 80, 70, 60],[60, 70, 50, 80, 50, 40], 60]
    }]
})

let chart6 = new LineChart({
    fill: true,
    values: [{
        color: '#E8786D',
        values: [40,60,25,65,30,50,40,10]
    }]
})

let chart7 = new LineChart({
    fill: true,
    values: [{
        color: ['#C21585', '#E62802'],
        values: [-40,-50,-45,-35,-20,-40,-10,-20]
    }]
})


let grid = new HorizontalGrid(canvas, {
    left: new ValueLabel(200, -50, 10),
    bottom: new StringLabel(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'])
})

grid.addCharts({
    chart1,
    chart2,
    chart3,
    chart4,
    chart5,
    chart6,
    chart7  
})

grid.draw()