import Chart from "./chart";
import { RowChartType, RowChartInputType, GroupItemType } from "../types/charts.types";
import VerticalGrid from "../grids/vertical-grid";
import Rect from "../shapes/rect";
import CoordinateSystem2dGrid from "../classes/coordinate-system-2d-grid";
import Label from "../labels/label";

class RowChart extends Chart implements RowChartType {

    content: GroupItemType[];
    stepLen: number;
    minX: number;
    maxX: number;
    width: number;
    height: number;
    x0position: number;
    y0position: number;
    constructor({values}: RowChartInputType) {
        super();
        this.content = values || [];
        this.stepLen = 0;
        this.minX = 0;
        this.maxX = 0;
        this.width = 0;
        this.height = 0;
        this.x0position = 0;
        this.y0position = 0;
    
    }

    updateItemContent(id: string | number) {
        return {}
    }
    addItemContent() {
        return {}
    }

    draw() {

        if(this.parent && this.ctx) {

            if(this.parent.identifier === 'VerticalGrid') {
                let parent: VerticalGrid = <VerticalGrid>this.parent;
                this.height = parent.drawArea.height;
                this.width = parent.drawArea.width;
                this.y0position = 0;
                this.x0position = parent.x0position;
                this.stepLen = (<Label>parent.labels[parent.secondaryLabel]).values.length;
                let label = parent.labels[(<'top' | 'bottom'>parent.mainLabel)];
                if(label) {
                    this.maxX = parseFloat(<any>label.values[0]);
                    this.minX = parseFloat(<any>label.values[label.values.length - 1]);
                }
            } else if(this.parent.identifier === 'CoordinateSystem2dGrid') {
                let parent: CoordinateSystem2dGrid = <CoordinateSystem2dGrid>this.parent;
                this.height = parent.drawArea.height;
                this.width = parent.drawArea.width;
                this.x0position = parent.x0position;
                this.y0position = 0;
                this.stepLen = parent.labels.y.values.length - 1;
                this.minX = parent.labels.x.values[0];
                this.maxX = parent.labels.x.values[parent.labels.x.values.length - 1];
            }
            const {y0position, height, stepLen ,itemSize, width, x0position, lineWidth, opacity, ctx, maxX, minX} = this;

            let offsetY = y0position;
            let step = height / stepLen;
            ctx.globalAlpha = opacity;
            for(let item of this.content) {
                if(item.type === 'simple') {
                    let value: number = <number>item.values;
                    let color: string = <string>item.color;
                    let m = value > 0 ? 1 : -1;
                    let lW = (lineWidth / 2) * m
                    let w = this.calcWidth(value) + lW;
                    new Rect(ctx, Math.ceil(x0position + lW) , Math.ceil(offsetY + step / 2 - itemSize / 2), Math.ceil(width - w - (width - x0position) - lW), itemSize, {color, lineWidth}).draw();
                }
                let values: number[] = <number[]>item.values;
                let colors: string[] = <string[]>item.color;
                let i = 0;
                if(item.type === 'group') {
                    let collapse = item.margin === 'collapse';
                    let innerOffset = step / values.length;
                    let curentOffset = collapse ? step / 2 - ((itemSize + lineWidth) * values.length) / 2 : innerOffset / 2;
                    for(let value of values) {
                        let m = value > 0 ? 1 : -1;
                        let lW = (lineWidth / 2) * m
                        let w = this.calcWidth(value) + lW;
                        let plus = collapse ? itemSize / 2 : 0;
                        new Rect(ctx, Math.ceil(x0position + lW), Math.ceil(offsetY + curentOffset + plus - itemSize / 2), Math.ceil(width - w - (width - x0position) - lW), itemSize, {color: colors[i], lineWidth}).draw();
                        curentOffset += collapse ? itemSize + lineWidth : innerOffset;
                        i++;
                    }
                } else if(item.type === 'stacked-group') {
                    let offsetX: number = 0;    
                    let m = item.direction === 'reverse' ? -1 : 1;
                    for(let value of values) {
                        let lW = (lineWidth / 2) * m;
                        let w = this.calcWidth(value * m) + lW;
                        new Rect(ctx, Math.ceil(x0position + offsetX + (lW * m) * m), Math.ceil(offsetY + step / 2 - itemSize / 2), Math.round(width - w - (width - x0position) - lW), itemSize, {color: colors[i], lineWidth}).draw();
                        offsetX += width * (value / (Math.abs(maxX) + Math.abs(minX))) * m;
                        i++;
                    }
                }
                offsetY += step;

            }

        }

    }

    calcWidth(value: number) {
        const {maxX, minX, width, x0position} = this;
        return width - width * (value / (Math.abs(maxX) + Math.abs(minX))) - (width - x0position);
    }

}

export default RowChart;