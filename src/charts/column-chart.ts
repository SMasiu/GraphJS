import Chart from "./chart";
import { ColumnChartType, ColumnChartInputType, GroupItemType } from "../types/charts.types";
import Rect from "../shapes/rect";
import HorizontalGrid from "../grids/horizontal-grid";

class ColumnChart extends Chart implements ColumnChartType {

    content: GroupItemType[];
    stepLen: number = 0;
    minY: number = 0;
    maxY: number = 0;
    height: number = 0;
    y0position: number = 0;

    constructor({values}: ColumnChartInputType) {
        super();
        this.content = values || [];
    }

    draw() {
        if(this.parent && this.ctx) {
            let mainLen = 1;
            let reversedValues = false;
            let width = 0, x0position = 0, y0position = 0;
            let underZero = 0;
            let mainLabel = '';
            let secondaryLabel = '';
            if(this.parent.identifier === 'HorizontalGrid') {
                mainLabel = (<HorizontalGrid>this.parent).mainLabel;
                secondaryLabel = (<HorizontalGrid>this.parent).secondaryLabel;
            } else if(this.parent.identifier === 'CoordinateSystem2dGrid') {
                mainLabel = 'y';
                secondaryLabel = 'x';
            }
            let parent = this.parent;
            this.height = parent.drawArea.height;
            width = parent.drawArea.width;
            y0position = parent.y0position;
            this.y0position = y0position;
            let minus = (<any>parent).labels[secondaryLabel].identifier === 'value' ? 1 : 0;
            this.stepLen = (<any>parent).labels[secondaryLabel].values.length - minus;
            reversedValues = (<any>parent).labels[mainLabel].reversedValues;
            let label = (<any>parent).labels[mainLabel];
            if(label) {
                this.maxY = label.max;
                this.minY = label.min;
                mainLen = label.values.length - 1;
                underZero = label.underZero;
            }

            y0position = this.height;
            this.y0position = this.height;
            let offsetX = x0position;
            let step = width / this.stepLen;
            const {ctx, opacity, lineWidth, itemSize, height, minY, maxY} = this;
            let hStep = height * (underZero / mainLen);
            let minusStart = hStep;
            if(!reversedValues) {
                minusStart = 0;
                ctx.translate(0, hStep + this.y0position);
                ctx.scale(1, -1);
            }
            for(let item of this.content) {
                if(item.type === 'simple') {
                    let value = <number>item.values;
                    let m = value > 0 ? 1 : -1;
                    let color = <string>item.color;
                    ctx.globalAlpha = opacity;
                    let lW = (lineWidth / 2) * m;
                    let h = this.calcHeight(value - this.getMinusValue()) + lW;
                    let itemH = height - h - (height - y0position) - lW;
                    let startH = h - minusStart;

                    new Rect(ctx, offsetX + step / 2 - itemSize / 2, startH, itemSize, itemH, {color, lineWidth}).draw();
                } else if (item.type === 'group') {
                    let values: number[] = <number[]>item.values;
                    let collapse = item.margin === 'collapse';
                    let innerOffset = step / values.length;
                    let curentOffset = collapse ? step / 2 - ((itemSize + lineWidth) * values.length) / 2 : innerOffset / 2;
                    let i = 0;
                    let colors: string[] = <string[]>item.color;
                    for(let value of values) {
                        let m = value > 0 ? 1 : -1;
                        let lW = (lineWidth / 2) * m;
                        let h = this.calcHeight(value - this.getMinusValue()) + lW;
                        ctx.globalAlpha = opacity;
                        let minus = collapse ? 0 : itemSize / 2;
                        let itemH = height - h - (height - y0position) - lW;
                        let startH = h - minusStart;
                        new Rect(ctx, offsetX + curentOffset - minus, startH, itemSize, itemH, {color: colors[i] || '#000', lineWidth}).draw();
                        curentOffset += collapse ?  itemSize + lineWidth : innerOffset;
                        i++;
                    }
                } else if(item.type === 'stacked-group') {

                    let values: number[] = <number[]>item.values;
                    let i = 0;
                    let colors: string[] = <string[]>item.color;
                    let offsetY: number = 0;
                    let cValue: number = 0;
                    let first = true;
                    for(let value of values) {
                        let multiplyer = item.direction === 'reverse' ? -1 : 1
                        cValue += value * multiplyer;
                        let lW = (lineWidth / 2) * multiplyer;
                        let h = this.calcHeight(cValue - this.getMinusValue()) + lW;
                        ctx.globalAlpha = opacity;
                        let itemH = height - h - (height - y0position) + offsetY - lW;
                        let startH = h - minusStart;
                        new Rect(ctx, offsetX + step / 2 - itemSize / 2, startH, itemSize, itemH, {color: colors[i], lineWidth}).draw();
                        if(this.minY > 0) {
                            offsetY -= (height * ((value - (first ? this.getMinusValue() : 0))  / (maxY - minY)) * multiplyer);
                        } else {
                            offsetY -= (height * (value / (Math.abs(maxY) + Math.abs(minY))) * multiplyer);
                        }
                        i++;
                        first = false;
                    }

                }
                offsetX += step;
            }
            if(!reversedValues) {
                ctx.translate(0, - (this.parent.height - (this.parent.height - height) / 2 - this.parent.centerY - this.y0position));
                ctx.scale(-1, 1);
            }
        }
    }

    getMinusValue() {
        if(this.minY > 0) {
            return this.minY;
        }
        return 0;
    }

    calcHeight(value: number) {
        const {maxY, minY, height, y0position} = this;
        if(minY > 0) {
            return height - height * (value / (maxY - minY)) - (height - y0position);
        }
        return height - height * (value / (Math.abs(maxY) + Math.abs(minY))) - (height - y0position);
    }

}

export default ColumnChart;