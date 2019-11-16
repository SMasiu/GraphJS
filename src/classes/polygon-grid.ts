import Grid from "./grid";
import { POLYGON_CHART } from "../types/chart-names";
import { DrawArea, PolygonGridType, StringLabelType } from "../types/grids.types";
import clearDrawArea from "../types/draw-area";
import StringLabel from "./string-label";
import CirclePoint from "./circle-point";
import Line from "./line";

class PolygonGrid extends Grid implements PolygonGridType {

    allowedCharts: string[];
    drawArea: DrawArea;
    labels: StringLabelType;
    mainLabel: string;
    radius: number;
    gridSize: number;
    identifier: string;

    constructor(canvas: HTMLCanvasElement, label: StringLabel) {
        super(canvas);
        this.identifier = 'PolygonGrid';
        this.allowedCharts = [POLYGON_CHART];
        this.drawArea = clearDrawArea;
        this.mainLabel = '0';
        this.labels  = this.setLabels(label);
        this.radius = (this.height - this.margin.top - this.margin.bottom) / 2;
        this.gridSize = 5;
    }

    setLabels(label: StringLabel): StringLabelType {
        return {
            type: label.identifier,
            values: label.values
        }
    }

    drawGrid() {
        const {ctx} = this;
        let singleAngle = Math.PI * 2 / this.labels.values.length;
        let radius = this.radius;
        let step = radius / this.gridSize;
        for(let i = 0; i < this.gridSize; i++) {
            let cPoint = new CirclePoint(radius, this.RAD_0, singleAngle, this.centerX, this.centerY);
            let points = [];
            for(let _ of this.labels.values) {
                points.push(cPoint.next());
            }
            new Line(ctx, points, {
                close: true,
                color: this.colors[i === 0 ? 'primary' : 'secondary']
            }).draw();
            if(i === 0) {
                for(let point of points) {
                    new Line(ctx, [point, [this.centerX, this.centerY]], {color: this.colors.secondary}).draw();
                }
            }
            radius -= step;
        }
        let maxWidth = this.findMaxTextWidth(this.labels.values);
        let cPoint = new CirclePoint(this.radius + this.labelPadding + maxWidth / 2, this.RAD_0, singleAngle, this.centerX, this.centerY);
        this.setFont('center');
        for(let label of this.labels.values) {
            let poit = cPoint.next();
            ctx.fillText(label,poit[0], poit[1]);
        }
        this.setUpDrawArea();
    }

    setUpDrawArea () {
        const {left, right, top, bottom} = this.margin;
        let width = this.width - left - right;
        let height = this.height - top - bottom;
        this.drawArea = {
            startX: left,
            startY: top,
            centerX: width / 2,
            centerY: height / 2,
            width,
            height
        }
        this.ctx.translate(this.drawArea.startX, this.drawArea.startY);
    }

}

export default PolygonGrid;