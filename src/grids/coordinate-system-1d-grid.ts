import { DrawArea, GridOptions } from "../types/grids.types";
import clearDrawArea from "../types/draw-area";
import ValueLabel from "../labels/value-label";
import Grid from "./grid";
import Line from "../shapes/line";
import FlexLabel from "../labels/flex-label";

class CoordinateSystem1dGrid extends Grid implements CoordinateSystem1dGrid {
    allowedCharts: string[];
    drawArea: DrawArea;
    labels: ValueLabel;
    mainLabel: string;
    step: number;
    x0position: number;
    identifier: string;

    constructor(canvas: HTMLCanvasElement, label: ValueLabel, {factor}: GridOptions = {}) {
        super(canvas, factor);
        this.identifier = 'CoordinateSystem1dGrid';
        this.allowedCharts = [];
        this.drawArea = clearDrawArea;
        this.labels = this.setLabels(label);
        this.mainLabel = '0';
        this.step = 0;
        this.x0position = 0;
    }

    drawGrid() {
        this.setUpDrawArea();
        const {centerY, width} = this.drawArea;
        new Line(this.ctx, [[0, centerY], [width, centerY]], {color: this.colors.primary}).draw();
        this.step = width / (this.labels.values.length - 1);
        let offset = 0;
        this.setFont('center');
        for(let label of this.labels.values) {
            new Line(this.ctx, [[offset, centerY - 3], [offset, centerY + 3]], {color: this.colors.primary}).draw();
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

    resize() {
        let label = this.labels;
        if(label.flex) {
            let min = 0, max = 0;
           for(let key in this.chartList) {
               let chart = this.chartList[key];
               chart.setSize();
               if(min > chart.minValue) {
                   min = <number>chart.minValue;
               }
               if(max < chart.maxValue) {
                   max = <number>chart.maxValue;
               }
           }
           (<FlexLabel>label).resize(min, max);
        }
    }

    setLabels(label: ValueLabel): ValueLabel {
        return label;
    }

}

export default CoordinateSystem1dGrid;