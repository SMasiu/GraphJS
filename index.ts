import CoordinateSystem2dGrid from "./src/grids/coordinate-system-2d-grid";
import ValueLabel from "./src/labels/value-label";
import FlexLabel from "./src/labels/flex-label";
import LineChart from "./src/charts/line-chart";
import HorizontalGrid from "./src/grids/horizontal-grid";
import StringLabel from "./src/labels/string-label";
import PercentLabel from "./dist/src/labels/percent-label";

const canvas = document.querySelector('canvas');
if(canvas) {
    
    let grid = new HorizontalGrid(canvas, {
        left: new ValueLabel(100,0, 20),
        bottom: new StringLabel(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']),
    });
    grid.draw();
}