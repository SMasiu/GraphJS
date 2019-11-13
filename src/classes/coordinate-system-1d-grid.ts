import Grid from "./grid";
import { DrawArea, NumberLabelType } from "../types/grids.types";
import clearDrawArea from "../types/draw-area";
import ValueLabel from "./value-label";
import Line from "./line";

class CoordinateSystem1dGrid extends Grid implements CoordinateSystem1dGrid {
    allowedCharts: string[];
    drawArea: DrawArea;
    labels: NumberLabelType;
    mainLabel: string;
    step: number;
    x0position: number;

    constructor(canvas: HTMLCanvasElement, label: ValueLabel) {
        super(canvas);
        this.allowedCharts = [];
        this.drawArea = clearDrawArea;
        this.labels = this.setLabels(label);
        this.mainLabel = '0';
        this.step = 0;
        this.x0position = 0;
    }

    draw() {
        this.ctx.translate(.5,.5);
        this.setUpDrawArea();
        const {centerY, width} = this.drawArea;
        new Line(this.ctx, [[0, centerY], [width, centerY]]).draw();
        this.step = width / (this.labels.values.length - 1);
        let offset = 0;
        this.setFont('center');
        for(let label of this.labels.values) {
            new Line(this.ctx, [[offset, centerY - 3], [offset, centerY + 3]]).draw();
            this.ctx.fillText(label.toString(), offset, centerY + this.labelPadding + 5);
            if(label === 0) {
                this.x0position = offset;
            }
            offset += this.step;
        }
    }

    setUpDrawArea() {
        const {left, bottom, top, right} = this.margin;
        let width = this.width - left - right;
        let height = this.height - top - bottom;
        this.drawArea = {
            width,
            height,
            centerX: width / 2,
            centerY: height / 2,
            startX: left,
            startY: top
        }
        this.ctx.translate(this.drawArea.startX, this.drawArea.startY);
    }

    setLabels(label: ValueLabel): NumberLabelType {
        return {
            type: label.identifier,
            values: label.values
        }
    }

}

export default CoordinateSystem1dGrid;