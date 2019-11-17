import Chart from "./chart";
import { ColumnChartType, ColumnChartInputType, GroupItemType } from "../types/charts.types";
import HorizontalGrid from "./horizontal-grid";
import { AnyLabelType } from "../types/grids.types";
import Rect from "./rect";
import CoordinateSystem2dGrid from "./coordinate-system-2d-grid";

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
            } else if(this.parent.identifier === 'CoordinateSystem2dGrid') {
                let parent: CoordinateSystem2dGrid = <CoordinateSystem2dGrid>this.parent;
                this.height = parent.drawArea.height;
                width = parent.drawArea.width;
                y0position = parent.y0position;
                this.y0position = y0position;
                this.stepLen = parent.labels.x.values.length - 1;
                this.maxY = parent.labels.y.values[0];
                this.minY = parent.labels.y.values[parent.labels.y.values.length - 1];
            }

            let offsetX = x0position;
            let step = width / this.stepLen;
            for(let item of this.content) {
                if(item.type === 'simple') {
                    let value = <number>item.values;
                    let m = value > 0 ? 1 : -1;
                    let color = <string>item.color;
                    this.ctx.globalAlpha = this.opacity;
                    let h = this.calcHeight(value) + (this.lineWidth / 2) * m;
                    new Rect(this.ctx, offsetX + step / 2 - this.itemSize / 2, h, this.itemSize, this.height - h - (this.height - y0position) - (this.lineWidth / 2) * m, {color, lineWidth: this.lineWidth}).draw();
                } else if (item.type === 'group') {
                    let values: number[] = <number[]>item.values;
                    let collapse = item.margin === 'collapse';
                    let innerOffset = step / values.length;
                    let curentOffset = collapse ? step / 2 - ((this.itemSize + this.lineWidth) * values.length) / 2 : innerOffset / 2;
                    let i = 0;
                    let colors: string[] = <string[]>item.color;
                    for(let value of values) {
                        let m = value > 0 ? 1 : -1;
                        let h = this.calcHeight(value) + (this.lineWidth / 2) * m;
                        this.ctx.globalAlpha = this.opacity;
                        let minus = collapse ? 0 : this.itemSize / 2;
                        new Rect(this.ctx, offsetX + curentOffset - minus, h, this.itemSize, this.height - h - (this.height - y0position) - (this.lineWidth / 2) * m, {color: colors[i] || '#000', lineWidth: this.lineWidth}).draw();
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
                        let h = this.calcHeight(cValue) + (this.lineWidth / 2) * multiplyer;
                        this.ctx.globalAlpha = this.opacity;
                        new Rect(this.ctx, offsetX + step / 2 - this.itemSize / 2, h, this.itemSize, this.height - h - (this.height - y0position) - offsetY - (this.lineWidth / 2) * multiplyer, {color: colors[i], lineWidth: this.lineWidth}).draw();
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