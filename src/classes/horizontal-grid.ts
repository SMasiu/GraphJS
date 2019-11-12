import Grid from "./grid";
import { DrawArea, AllLabels, AnyLabel } from "../types/grids.types";
import { LINE_CHART, ROW_CHART, COLUMN_CHART, OPOSITE_COLUMN_CHART, OPOSITE_ROW_CHART } from "../types/chart-names";
import clearDrawArea from "../types/draw-area";

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

        this.drawArea.width = this.width - left - right - rightWidth - leftWidth;
        this.drawArea.height = this.height - top - bottom - bottomWidth - topWidth;
        this.drawArea.centerX = this.drawArea.width / 2;
        this.drawArea.centerY = this.drawArea.height / 2;
        this.drawArea.startX = left + leftWidth;
        this.drawArea.startY = top + topWidth;

        const {ctx} = this;
        ctx.translate(this.drawArea.startX, this.drawArea.startY)
        ctx.beginPath();
        ctx.rect(0, 0, this.drawArea.width, this.drawArea.height)
        ctx.stroke();
    }

    private drawLabels() {
        const { ctx } = this;
        const {top, left, bottom, right} = this.labels;
        ctx.translate(.5,.5);
        let height = this.height - this.margin.top - this.margin.bottom;
        let width = this.width - this.margin.left - this.margin.right;
        let topOffset = this.margin.top;
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
            let curentY = step / 2;

            for(let label of (<AnyLabel>this.labels[type]).values) {
                label  = label.toString();
                if(type === 'left' || type === 'right') {
                    ctx.fillText(label, offset, curentY);
                } else {
                    ctx.fillText(label, curentY, offset);
                }
                curentY += step;
            }
        }
    }

}

export default HorizontalGrid