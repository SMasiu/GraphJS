import { ChartType } from "../types/charts.types";
import ChartFactor, { DEFAULT_CHART_FACTOR } from "../factors/chart-factor";
import Grid from "../grids/grid";

abstract class Chart implements ChartType {

    opacity: number;
    lineWidth: number;
    ctx: CanvasRenderingContext2D | null;
    parent: Grid | null;
    itemSize: number;
    disable: boolean = false;
    dotBorder: boolean;
    dotRadius: number;
    maxValue: number | number[] = 0;
    minValue: number | number[] = 0;
    correspondTo: string = '';
    abstract content: any[];
    abstract identifier: string;
    abstract drawChart(): void;

    updateItemContent(id: string | number, content: any) {
        let item = this.getItemContent(id);
        if(item) {
            for(let key in content) {
                item[key] = (<any>content)[key];
            }
        }
        return item;
    }

    addItemContent(content: any) {
        this.content.push(content);
        return content;
    }

    setSize() {
        this.maxValue = 100;
        this.minValue = 0;
    }

    getColor(color: string | string[], x: number, xE: number) {
        if(typeof color === 'string') {
            return color;
        } else {
            return this.createGradient(x, xE, color);
        }
    }

    abstract createGradient(x: number, xE: number, colors: string[]): CanvasGradient;

    constructor(factor: ChartFactor = DEFAULT_CHART_FACTOR) {

        this.opacity = factor.opacity;
        this.lineWidth = factor.lineWidth;
        this.itemSize = factor.itemSize;
        this.dotBorder = factor.dotBorder;
        this.dotRadius = factor.dotRadius;
        this.parent = null;
        this.ctx = null;

    }
    
    draw() {
        this.drawChart();
    }

    getItemContent(id: string | number) {
        return this.content[this.content.findIndex( c => c.id === id)];
    }

    deleteItemContent(id: string | number) {
        let index = this.content.findIndex(c => c.id === id);
        return index === -1 ? null : this.content.splice(index, 1);
    }

}

export default Chart;