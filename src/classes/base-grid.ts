import Grid from "./grid";
import { DrawArea, AllLabels, AnyLabelType } from "../types/grids.types";
import clearDrawArea from "../types/draw-area";
import Line from "./line";
import { InputAllLabels } from "../types/input-labels.type";
import Label from "./label";

abstract class BaseGrid extends Grid {

    drawArea: DrawArea;
    y0position: number;
    abstract labels: AllLabels;
    abstract allowedCharts: string[];
    abstract mainLabel: string;
    abstract identifier: string;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.drawArea = clearDrawArea;
        this.y0position = 0;
    }

    abstract drawGrid(): void;
    abstract validateLabels(labels: InputAllLabels): boolean;

    setLabels(labels: InputAllLabels): AllLabels {
        let newLabels: {[key: string]: AnyLabelType} = {};
        for(let pos in labels) {
            if(pos === 'top' || pos === 'bottom' || pos === 'right' || pos === 'left') {
    
                newLabels[pos] = {
                    type: (<Label>labels[pos]).identifier,
                    values: (<Label>labels[pos]).values
                }
        
            }
        }

        return newLabels;
    }

    drawOuter() {
        this.drawLabels();
        this.setUpDrawArea();
    }

    setUpDrawArea() {
        const {left, right, top, bottom} = this.margin;
        let leftWidth = 0, rightWidth = 0, bottomWidth = 0, topWidth = 0;
        if(this.labels.left) {
            leftWidth = this.labels.left.width || 0;
        }
        if(this.labels.right) {
            rightWidth = this.labels.right.width || 0;
        }
        if(this.labels.top) {
            topWidth = this.labels.top.width || 0;
        }
        if(this.labels.bottom) {
            bottomWidth = this.labels.bottom.width || 0;
        }

        this.drawArea.width = Math.ceil(this.width - left - right - rightWidth - leftWidth);
        this.drawArea.height = Math.ceil(this.height - top - bottom - bottomWidth - topWidth);
        this.drawArea.centerX = this.drawArea.width / 2;
        this.drawArea.centerY = this.drawArea.height / 2;
        this.drawArea.startX = Math.ceil(left + leftWidth);
        this.drawArea.startY = Math.ceil(top + topWidth);
        this.ctx.translate(this.drawArea.startX, this.drawArea.startY);
    }
    
    drawBorder() {
        const {ctx} = this;
        const {width, height} = this.drawArea;
        const {left, bottom, top, right} = this.labels;
        if(left) {
            new Line(ctx, [[0, 0],[0, height]]).draw();
            let len = left.type !== 'string' ? 1 : 0;
            this.drawMarkers(left.values, height / (left.values.length - len), -5, 0, left.type);
        }
        if(bottom) {
            new Line(ctx, [[0, height],[width, height]]).draw();
            let len = bottom.type !== 'string' ? 1 : 0;
            this.drawMarkers(bottom.values, width / (bottom.values.length - len), height + 5, height, bottom.type, true);
        }
        if(top) {
            new Line(ctx, [[0, 0], [width, 0]]).draw();
            let len = top.type !== 'string' ? 1 : 0;
            this.drawMarkers(top.values, width / (top.values.length - len), -5, 0, top.type, true);
        }
        if(right) {
            new Line(ctx, [[width, 0], [width, height]]).draw();
            let len = right.type !== 'string' ? 1 : 0;
            this.drawMarkers(right.values, height / (right.values.length - len), width, width + 5, right.type);
        }
    }

    private drawMarkers(values: any[], step: number, from: number, to: number, type: string, reverse: boolean = false) {
        let curent = 0;
        let len = type === 'string' ? 0 : 1;
        for(let i = 0; i < values.length - len; i++) {
            let arr = [[from, curent],[to, curent]];
            if(reverse) {
                arr = arr.map( i => i.reverse());
            }
            new Line(this.ctx, arr).draw();
            curent += step;
        }
        let arr = [[from, curent],[to, curent]];
        if(reverse) {
            arr = arr.map( i => i.reverse());
        }
        new Line(this.ctx, arr).draw();
    }

    private drawLabels() {
        const { ctx } = this;
        const {top, left, bottom, right} = this.labels;
        let height = this.height - this.margin.top - this.margin.bottom;
        let width = this.width - this.margin.left - this.margin.right;
        let topOffset = this.margin.top;
        if(top) {
            topOffset += this.labelPadding + this.font.size + 5;
            height -= this.labelPadding + this.font.size;
        }
        if(bottom) {
            height -= this.labelPadding + this.font.size;
        }
        this.setFont('right');
        if(left) {
            let maxWidth = this.findMaxTextWidth(left.values)
            left.width = maxWidth + this.labelPadding;
            ctx.translate(this.margin.left, topOffset);
            this.drawLabelsValues('left', height, maxWidth);
            ctx.translate(-this.margin.left, -topOffset);
            width -= left.width;
        } if(right) {
            let maxWidth = this.findMaxTextWidth(right.values)
            right.width = maxWidth + this.labelPadding;
            ctx.translate(0, topOffset);
            ctx.textAlign = 'left';
            this.drawLabelsValues('right', height, this.width - maxWidth - this.margin.right);
            ctx.translate(0, -topOffset);
            width -= right.width;
        } 
        ctx.textAlign = 'center';
        if (top) {
            let transX = this.margin.left+(left && left.width ? left.width : 0);
            let transY = this.margin.top + this.font.size;
            top.width = this.labelPadding + this.font.size;
            ctx.translate(transX, transY);
            this.drawLabelsValues('top', width, 0);
            ctx.translate(-transX, -transY);
            topOffset += top.width;
        } if (bottom) {
            let transX = this.margin.left+(left && left.width ? left.width : 0);
            bottom.width = this.labelPadding + this.font.size;
            ctx.translate(transX, 0);
            this.drawLabelsValues('bottom', width, this.height - this.margin.bottom);
            ctx.translate(-transX, 0);
        }
    }

    private drawLabelsValues(cType: 'left' | 'right' | 'top' | 'bottom', size: number, offset: number) {
        const {ctx} = this;
        let curentLabel: AnyLabelType | undefined = this.labels[cType];
        if(curentLabel) {
            const {values, type} = curentLabel;
            let step = size / values.length;
            let curentOffset = step / 2;
            if(type === 'percent' || type === 'value') {
                step = size / (values.length - 1);
                curentOffset = cType === 'top' || cType === 'bottom' ? 0 : 0;
            }
            for(let label of values) {
                label = label.toString();
                if(cType === 'left' || cType === 'right') {
                    if(this.mainLabel === cType && label === '0') {
                        this.y0position = curentOffset;
                    }
                    ctx.textBaseline = 'middle'
                    ctx.fillText(label, offset, curentOffset);
                } else {
                    ctx.fillText(label, curentOffset, offset);
                }
                curentOffset += step;
            }                
        }
    }

}

export default BaseGrid