import Chart from "./chart";
import { RowChartType, RowChartInputType, GroupItemType } from "../types/charts.types";
import VerticalGrid from "../grids/vertical-grid";
import Rect from "../shapes/rect";
import Label from "../labels/label";
import CoordinateSystem2dGrid from "../grids/coordinate-system-2d-grid";
import getColumnSize from "../functions/column-size";
import { ROW_CHART } from "../types/chart-names";

class RowChart extends Chart implements RowChartType {

    content: GroupItemType[];
    stepLen: number = 0;
    minX: number = 0;
    maxX: number = 0;
    width: number = 0;
    height: number = 0;
    x0position: number = 0;
    y0position: number = 0;
    identifier = ROW_CHART;
    correspondTo: string;

    constructor({values, correspondTo}: RowChartInputType) {
        super();
        this.content = values || [];
        this.correspondTo = correspondTo || '';
    }

    drawChart() {

        if(this.parent && this.ctx) {
            let mainLabel = '';
            let secondaryLabel = '';
            let minus = -1
            if(this.parent.identifier === 'VerticalGrid') {
                mainLabel = this.correspondTo || this.parent.mainLabel;
                secondaryLabel = (<VerticalGrid>this.parent).secondaryLabel;
                minus = 0;
            } else if(this.parent.identifier === 'CoordinateSystem2dGrid') {
                mainLabel = 'x';
                secondaryLabel = 'y';
            }

            let parent:any = this.parent;
            this.height = parent.drawArea.height;
            this.width = parent.drawArea.width;
            this.y0position = 0;
            let mainLen = 0, underZero = 0;
            this.x0position = parent.x0position;
            this.stepLen = parent.labels[secondaryLabel].values.length;
            let label = parent.labels[mainLabel];
            let reversedValues = parent.labels[mainLabel].reversedValues;
            if(label) {
                this.maxX = label.max;
                this.minX = label.min;
                mainLen = label.values.length + minus;
                underZero = label.underZero;
            }

            const {y0position, height, stepLen, itemSize, width, x0position, lineWidth, opacity, ctx, maxX, minX} = this;

            let offsetY = y0position;
            let step = height / (stepLen + minus);
            ctx.globalAlpha = opacity;
            let minusHstep = 0;
            let hStep = width * (underZero / mainLen);
            if(reversedValues) {
                minusHstep = hStep - x0position;
                ctx.translate(hStep + x0position, 0);
                ctx.scale(-1, 1);
            }

            for(let item of this.content) {
                if(item.type === 'simple') {
                    let value: number = <number>item.values;
                    let color: string = <string>item.color;
                    let m = value > 0 ? 1 : -1;
                    let lW = (lineWidth / 2) * m
                    let w = this.calcWidth(value) + lW;
                    console.log(x0position)
                    new Rect(ctx, Math.round(x0position + lW + minusHstep) , Math.ceil(offsetY + step / 2 - itemSize / 2), Math.ceil(width - w - (width - x0position) - lW), itemSize, {color, lineWidth}).draw();
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
                        new Rect(ctx, Math.round(x0position + lW + minusHstep), Math.ceil(offsetY + curentOffset + plus - itemSize / 2), Math.ceil(width - w - (width - x0position) - lW), itemSize, {color: colors[i], lineWidth}).draw();
                        curentOffset += Math.floor(collapse ? itemSize + lineWidth : innerOffset);
                        i++;
                    }
                } else if(item.type === 'stacked-group') {
                    let offsetX: number = 0;
                    let m = item.direction === 'reverse' ? -1 : 1;
                    for(let value of values) {
                        let lW = (lineWidth / 2) * m;
                        let w = this.calcWidth(value * m) + lW;
                        new Rect(ctx, Math.round(x0position + offsetX + (lW * m) * m + minusHstep), Math.ceil(offsetY + step / 2 - itemSize / 2), Math.round(width - w - (width - x0position) - lW), itemSize, {color: colors[i], lineWidth}).draw();
                        offsetX += width * (value / (Math.abs(maxX) + Math.abs(minX))) * m;
                        i++;
                    }
                }
                offsetY += step;

            }
            if(reversedValues) {
                ctx.scale(-1, 1);
                ctx.translate(-(hStep + x0position), 0);
            }

        }

    }

    calcWidth(value: number) {
        const {maxX, minX, width, x0position} = this;
        return width - width * (value / (Math.abs(maxX) + Math.abs(minX))) - (width - x0position);
    }

    setSize() {
        const {max, min} = getColumnSize(this.content);
        this.maxValue = max;
        this.minValue = min;
    }

}

export default RowChart;