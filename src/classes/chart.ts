import { ChartType, ChartOptions } from "../types/charts.types";
import USE_DEFAULT_CHART from "../factors/chart.factor";
import Grid from "./grid";

abstract class Chart implements ChartType {

    opacity: number;
    lineWidth: number;
    ctx: CanvasRenderingContext2D | null;
    parent: Grid | null;
    itemSize: number;
    abstract content: any[];

    abstract draw(): void;

    constructor({opacity, lineWidth, itemSize}: ChartOptions = USE_DEFAULT_CHART()) {

        this.opacity = opacity;
        this.lineWidth = lineWidth;
        this.itemSize = itemSize;
        this.parent = null;
        this.ctx = null;
        
    }

}

export default Chart;