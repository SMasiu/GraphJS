import Chart from "./chart";
import { ColumnChartType, ColumnChartInputType, GroupItemType } from "../types/charts.types";
import HorizontalGrid from "./horizontal-grid";
import { AnyLabelType } from "../types/grids.types";
import Rect from "./rect";

class ColumnChart extends Chart implements ColumnChartType {

    content: GroupItemType[];
    stepLen: number;
    minY: number;
    maxY: number;
    height: number;
    y0position: number;

    constructor({values}: ColumnChartInputType) {
        super();
        this.content = values || [];
        this.stepLen = 0;
        this.minY = 0;
        this.maxY = 0;
        this.height = 0;
        this.y0position = 0;
    }

    draw() {
        if(this.parent && this.ctx) {
            let width = 0, x0position = 0, y0position = 0;
            if(this.parent.identifier === 'HorizontalGrid') {
                let parent: HorizontalGrid = <HorizontalGrid>this.parent;
                this.height = parent.drawArea.height;
                width = parent.drawArea.width;
                y0position = parent.y0position;
                this.y0position = y0position;
                this.stepLen = (<AnyLabelType>parent.labels[parent.secondaryLabel]).values.length;
                let label = parent.labels[(<'left' | 'right'>parent.mainLabel)];
                if(label) {
                    this.maxY = parseFloat(<any>label.values[0]);
                    this.minY = parseFloat(<any>label.values[label.values.length - 1]);
                }
            }

            let offsetX = x0position;
            let step = width / this.stepLen;
            for(let item of this.content) {
                if(item.type === 'simple') {
                    let value = <number>item.values;
                    let color = <string>item.color;
                    this.ctx.globalAlpha = this.opacity;
                    let h = this.calcHeight(value);
                    new Rect(this.ctx, offsetX + step / 2 - this.itemSize / 2, h, this.itemSize, this.height - h - (this.height - y0position), {color}).draw();
                } else if (item.type === 'group') {
                    let values: number[] = <number[]>item.values;
                    let collapse = item.margin === 'collapse';
                    let innerOffset = step / values.length;
                    let curentOffset = collapse ? step / 2 - ((this.itemSize + this.lineWidth) * values.length) / 2 : innerOffset / 2;
                    let i = 0;
                    let colors: string[] = <string[]>item.color;
                    for(let value of values) {
                        let h = this.calcHeight(value);
                        this.ctx.globalAlpha = this.opacity;
                        let minus = collapse ? 0 : this.itemSize / 2;
                        new Rect(this.ctx, offsetX + curentOffset - minus, h, this.itemSize, this.height - h - (this.height - y0position), {color: colors[i] || '#000'}).draw();
                        curentOffset += collapse ?  this.itemSize + this.lineWidth : innerOffset;
                        i++;
                    }
                } else if(item.type === 'stacked-group') {

                    let values: number[] = <number[]>item.values;
                    let i = 0;
                    let colors: string[] = <string[]>item.color;
                    let offsetY: number = 0;
                    let cValue: number = 0;
                    for(let value of values) {
                        let multiplyer = item.direction === 'reverse' ? -1 : 1
                        cValue += value * multiplyer;
                        let h = this.calcHeight(cValue);
                        this.ctx.globalAlpha = this.opacity;
                        new Rect(this.ctx, offsetX + step / 2 - this.itemSize / 2, h, this.itemSize, this.height - h - (this.height - y0position) - offsetY, {color: colors[i]}).draw();
                        offsetY += this.height * (value / (Math.abs(this.maxY) + Math.abs(this.minY))) * multiplyer;
                        i++;
                    }

                }
                offsetX += step;
            }
        }
    }

    calcHeight(value: number) {
        const {maxY, minY, height, y0position} = this;
        return height - height * (value / (Math.abs(maxY) + Math.abs(minY))) - (height - y0position);
    }

}

export default ColumnChart;