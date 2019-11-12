import Grid from "./grid";
import { DrawArea, AllLabels, AnyLabel } from "../types/grids.types";
import { LINE_CHART, ROW_CHART, COLUMN_CHART, OPOSITE_COLUMN_CHART, OPOSITE_ROW_CHART } from "../types/chart-names";
import clearDrawArea from "../types/draw-area";
import Line from "./line";

class HorizontalGrid extends Grid {

    labels: AllLabels;
    drawArea: DrawArea;
    allowedCharts: string[];

    constructor(canvas: HTMLCanvasElement, labels: AllLabels) {
        super(canvas);
        this.allowedCharts = [LINE_CHART, ROW_CHART, COLUMN_CHART, OPOSITE_COLUMN_CHART, OPOSITE_ROW_CHART];
        this.labels = labels;

        this.drawArea = clearDrawArea;
    }

    draw() {
        this.ctx.translate(.5,.5);
        this.drawLabels();
        this.setUpDrawArea();
        this.drawBorder();
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
    
    private drawBorder() {
        const {ctx} = this;
        const {width, height} = this.drawArea;
        ctx.strokeStyle = this.colors.primary;
        if(this.labels.left) {
            new Line(ctx, [[0, 0],[0, height]]).draw();
            this.drawMarkers(this.labels.left.values, height / this.labels.left.values.length, -5, 0);
        }
        if(this.labels.bottom) {
            new Line(ctx, [[0, height],[width, height]]).draw();
        }
        if(this.labels.top) {
            new Line(ctx, [[0, 0], [width, 0]]).draw();
        }
        if(this.labels.right) {
            new Line(ctx, [[width, 0], [width, height]]).draw();
            this.drawMarkers(this.labels.right.values, height / this.labels.right.values.length, width, width + 5);
        }
    }

    private drawMarkers(values: any[], step: number, from: number, to: number) {
        let curent = 0;
        for(let _ of values) {
            new Line(this.ctx, [[from, curent],[to, curent]]).draw();
            curent += step;
        }
        new Line(this.ctx, [[from, curent],[to, curent]]).draw();
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
        ctx.strokeStyle = this.colors.primary;
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

    private drawLabelsValues(type: 'left' | 'right' | 'top' | 'bottom', size: number, offset: number) {
        const {ctx} = this;
        if(this.labels[type] && (<AnyLabel>this.labels[type]).type === 'string') {
            let step = size / (<AnyLabel>this.labels[type]).values.length;
            let curentOffset = step / 2;
            
            for(let label of (<AnyLabel>this.labels[type]).values) {
                label  = label.toString();
                if(type === 'left' || type === 'right') {
                    ctx.fillText(label, offset, curentOffset);
                } else {
                    ctx.fillText(label, curentOffset, offset);
                }
                curentOffset += step;
            }
        }
    }

}

export default HorizontalGrid