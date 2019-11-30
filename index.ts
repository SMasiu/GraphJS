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

let chart = new SameDirectionRoundChart({
    labels: new StringLabel(['cats','dogs','snakes','birds']),
    centerValue: '76.3%',
    values: [{
        color: '#E61700',
        values: 40
    },{
        color: '#2155BF',
        values: 60
    },{
        color: ['#1D8012','#2DC21C'],
        values: 70
    },{
        color: '#C23167',
        values: 90
    }]
})

let grid = new NoGrid(canvas)
grid.addCharts({
    chart,
})

grid.draw()