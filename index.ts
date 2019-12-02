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
import { number } from "prop-types";
import Grid from "./src/grids/grid";

let canvas = <HTMLCanvasElement>document.querySelector('canvas');


let grid = new HorizontalGrid(canvas, {
    left: new FlexLabel(100, 0, 10),
    bottom: new StringLabel(['2019','2020','2021','2022','2023'])
});

//create labels
//move linec to center

grid.addCharts({
    columns: new ColumnChart({
        values: [{
            type: 'group',
            color: [['#E62200','#801300'],['#0B89BF','#085C80']],
            values: [30, 40],
            margin: 'collapse'
        },{
            type: 'group',
            color: [['#E62200','#801300'],['#0B89BF','#085C80']],
            values: [50, 30],
            margin: 'collapse'
        },{
            type: 'group',
            color: [['#E62200','#801300'],['#0B89BF','#085C80']],
            values: [80, 90],
            margin: 'collapse'
        },{
            type: 'group',
            color: [['#E62200','#801300'],['#0B89BF','#085C80']],
            values: [100, 70],
            margin: 'collapse'
        },{
            type: 'group',
            color: [['#E62200','#801300'],['#0B89BF','#085C80']],
            values: [95, 76],
            margin: 'collapse'
        }]
    }),
    lines: new LineChart({
        dots: true,
        smooth: true,
        dashLine: [10, 5],
        values: [{
            color: ['#E62200','#801300'],
            values: [30,50,80,100,95]
        },{
            color: ['#0B89BF','#085C80'],
            values: [40,30,90,70,76]
        }]
    })
})

grid.draw();