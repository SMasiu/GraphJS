import Grid from "./grid";
import StringLabel from "./string-label";
import { DrawArea, StringLabelType, NoGridType } from "../types/grids.types";
import clearDrawArea from "../types/draw-area";

class NoGrid extends Grid implements NoGridType {

    mainLabel: string;
    allowedCharts: string[];
    drawArea: DrawArea;
    labels: null;
    identifier: string;

    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.identifier = 'NoGrid';
        this.mainLabel = '0';
        this.allowedCharts = [];
        this.drawArea = clearDrawArea;
        this.labels = null;
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

    setLabels(labels: StringLabel){
        return null;
    }

}

export default NoGrid;