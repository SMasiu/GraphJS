import Grid from "./grid";
import StringLabel from "./string-label";
import { DrawArea, StringLabelType, NoGridType } from "../types/grids.types";
import clearDrawArea from "../types/draw-area";

class NoGrid extends Grid implements NoGridType {

    mainLabel: string;
    allowedCharts: string[];
    drawArea: DrawArea;
    labels: StringLabelType;
    identifier: string;

    constructor(canvas: HTMLCanvasElement, labels: StringLabel) {
        super(canvas);
        this.identifier = 'NoGrid';
        this.mainLabel = '0';
        this.allowedCharts = [];
        this.drawArea = clearDrawArea;
        this.labels = this.setLabels(labels);
    }

    drawGrid() {
        this.setUpDrawArea();
    }

    setUpDrawArea() {
        const {left, right, top, bottom} = this.margin;
        let width = this.width - left - right;
        let height = this.height - top - bottom
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

    setLabels(labels: StringLabel): StringLabelType {
        return {
            type: labels.identifier,
            values: labels.values
        }
    }

}

export default NoGrid;