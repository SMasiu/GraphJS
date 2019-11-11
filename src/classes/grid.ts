import { GridType, MarginAll, Label, DrawArea, GridColors, OptionsType } from "../types/grids.types";
import { USE_DEFAULT_GRID } from "../factors/grid.factors";
import { Chart } from "../types/charts.types";

abstract class Grid implements GridType {
    
    ctx: CanvasRenderingContext2D;
    height: number;
    width: number;
    colors: GridColors;
    margin: MarginAll;
    chartList: {[key: string]: Chart}
    abstract labels: Label;
    abstract drawArea: DrawArea;
    abstract allowedCharts: string[];

    constructor(public canvas: HTMLCanvasElement, { margin, colors }: OptionsType = USE_DEFAULT_GRID()) {
        let ctx = this.canvas.getContext('2d');
        if (ctx) {
            this.ctx = ctx;
        } else {
            throw new Error('Something went wrong while reading context');
        }
        this.height = ctx.canvas.clientHeight;
        this.width = ctx.canvas.clientWidth;
        this.margin = margin;
        this.colors = colors;
        this.chartList = {};
    }

    abstract draw(): void;
    
    addChart(): void {

    }

}

export default Grid;