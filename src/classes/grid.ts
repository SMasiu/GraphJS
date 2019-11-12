import { GridType, MarginAll, Label, DrawArea, GridColors, OptionsType, AllLabels, FontOptions } from "../types/grids.types";
import { USE_DEFAULT_GRID } from "../factors/grid.factors";
import { Chart } from "../types/charts.types";

abstract class Grid implements GridType {
    
    ctx: CanvasRenderingContext2D;
    height: number;
    width: number;
    colors: GridColors;
    margin: MarginAll;
    chartList: {[key: string]: Chart}
    font: FontOptions;
    labelPadding: number;
    abstract labels: Label | AllLabels;
    abstract drawArea: DrawArea;
    abstract allowedCharts: string[];

    constructor(public canvas: HTMLCanvasElement, { margin, colors, font, labelPadding }: OptionsType = USE_DEFAULT_GRID()) {
        let ctx = this.canvas.getContext('2d');
        if (ctx) {
            this.ctx = ctx;
        } else {
            throw new Error('Something went wrong while reading context');
        }
        this.height = ctx.canvas.clientHeight;
        this.width = ctx.canvas.clientWidth;
        this.margin = margin;
        this.labelPadding = labelPadding;
        this.colors = colors;
        this.font = font;
        this.chartList = {};
    }

    abstract draw(): void;
    abstract setUpDrawArea(): void;

    setFont(align: string) {
        const {ctx} = this;
        ctx.textAlign = 'right';
        ctx.font = `bold ${this.font.size}px ${this.font.family}`;
        ctx.fillStyle = this.font.color;
    }

    findMaxTextWidth(values: any[]): number {
        let max = 0;
        values.forEach( (v: any) => {
            v = v.toString();
            let w = this.ctx.measureText(v).width;
            if(max < w) {
                max = w;
            }
        });
        return max;
    }

    addChart(): void {

    }
    
}

export default Grid;