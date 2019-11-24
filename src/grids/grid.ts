import { GridType, MarginAll, DrawArea, GridColors, AllLabels, FontOptions, Label2dType, Background } from "../types/grids.types";
import Chart from "../charts/chart";
import GridFactor, { DEFAULT_GRID_FACTOR } from "../factors/grid-factor";
import Label from "../labels/label";

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
    y0position: number = 0;
    x0position: number = 0;
    background: Background;
    abstract identifier: string;
    abstract mainLabel: string;
    abstract labels: Label | AllLabels | Label2dType | null;
    abstract drawArea: DrawArea;
    abstract allowedCharts: string[];

    constructor(public canvas: HTMLCanvasElement, factor: GridFactor = DEFAULT_GRID_FACTOR) {
        let ctx = this.canvas.getContext('2d');
        if (ctx) {
            this.ctx = ctx;
        } else {
            throw new Error('Something went wrong while reading context');
        }
        this.height = ctx.canvas.clientHeight;
        this.width = ctx.canvas.clientWidth;
        this.centerX = this.width / 2;
        this.centerY = this.height / 2;
        this.margin = {
            top: 25,
            left: 25,
            bottom: 25,
            right: 25
        };
        this.labelPadding = factor.labelPadding;
        this.colors = factor.colors;
        this.font = factor.font;
        this.background = factor.background;
        this.chartList = {};
    }

    
    abstract setUpDrawArea(): void;
    abstract setLabels(labels: any): any;
    abstract drawGrid(): void;

    async draw() {
        this.resize();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.restore();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        await this.drawBackground();
        this.ctx.translate(.5,.5);
        this.drawGrid();
        this.drawCharts();
    }

    async drawBackground() {
        return new Promise((resolve) => {
            const {color, image, opacity} = this.background;
            const {ctx, width, height} = this;
            if(color !== 'transparent') {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.rect(0, 0, width, height);
                ctx.fill();
            }
            if(image) {
                let img = new Image();
                img.src = image;
                img.onload = () => {
                    ctx.globalAlpha = opacity;
                    ctx.drawImage(img, 0, 0, width, height);
                    ctx.globalAlpha = 1;
                    resolve(true);
                }
            } 
            else {
                resolve(false);
            }
        });
    }

    resize() {}

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
                
                let index = this.allowedCharts.findIndex( a => a === charts[name].identifier );
                if(index === -1) {
                    throw new Error('This chart is not allowed on this type of grid');
                }

                charts[name].ctx = this.ctx;
                charts[name].parent = this;
                this.chartList[name] = charts[name];
            }
        }

    }
    
    drawCharts() {
        for(let chart in this.chartList) {
            if(!this.chartList[chart].disable) {
                this.chartList[chart].draw();
            }
        }
    }

}

export default Grid;