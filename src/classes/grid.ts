import { GridType, MarginAll, LabelType, DrawArea, GridColors, OptionsType, AllLabels, FontOptions, Label2dType } from "../types/grids.types";
import { USE_DEFAULT_GRID } from "../factors/grid.factors";
import Chart from "./chart";

abstract class Grid implements GridType {
    
    ctx: CanvasRenderingContext2D;
    height: number;
    width: number;
    centerX: number;
    centerY: number;
    colors: GridColors;
    margin: MarginAll;
    chartList: {[key: string]: Chart}
    font: FontOptions;
    labelPadding: number;
    RAD_0: number = 0 - Math.PI / 2;
    
    abstract mainLabel: string;
    abstract labels: LabelType | AllLabels | Label2dType;
    abstract drawArea: DrawArea;
    abstract allowedCharts: string[];

    constructor(public canvas: HTMLCanvasElement, { margin, colors, font, labelPadding }: OptionsType = USE_DEFAULT_GRID()) {
        let ctx = this.canvas.getContext('2d');
        if (ctx) {
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.restore();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.ctx = ctx;
        } else {
            throw new Error('Something went wrong while reading context');
        }
        this.height = ctx.canvas.clientHeight;
        this.width = ctx.canvas.clientWidth;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.margin = margin;
        this.labelPadding = labelPadding;
        this.colors = colors;
        this.font = font;
        this.chartList = {};
    }

    
    abstract setUpDrawArea(): void;
    abstract setLabels(labels: any): any;
    abstract drawGrid(): void;

    draw() {
        this.ctx.translate(.5,.5);
        this.drawGrid();
        this.drawCharts();
    }

    validateLabels(labels: any): boolean {
        return true;
    }
    
    setFont(align: string) {
        const {ctx} = this;
        ctx.textAlign = <CanvasTextAlign>align;
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

    addCharts(charts: {[key: string]: Chart}): void {

        for(let name in charts) {
            if(this.chartList[name]) {
                throw new Error('This chart name is taken');
            } else {
                charts[name].ctx = this.ctx;
                charts[name].parent = this;
                this.chartList[name] = charts[name];
            }
        }

    }
    
    drawCharts() {
        for(let chart in this.chartList) {
            this.chartList[chart].draw();
        }
    }

}

export default Grid;