import { ChartType } from "../types/charts.types";
import Grid from "./grid";
import ChartFactor, { DEFAULT_CHART_FACTOR } from "../factors/chart-factor";

abstract class Chart implements ChartType {

    opacity: number;
    lineWidth: number;
    ctx: CanvasRenderingContext2D | null;
    parent: Grid | null;
    itemSize: number;
    disable: boolean = false;
    dotBorder: boolean;
    dotRadius: number;
    abstract content: any[];

    abstract draw(): void;

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

    constructor(factor: ChartFactor = DEFAULT_CHART_FACTOR) {

        this.opacity = factor.opacity;
        this.lineWidth = factor.lineWidth;
        this.itemSize = factor.itemSize;
        this.dotBorder = factor.dotBorder;
        this.dotRadius = factor.dotRadius;
        this.parent = null;
        this.ctx = null;
        
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