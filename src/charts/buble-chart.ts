import Chart from "./chart";
import { BubleChartType, BubleChartInputType, CoordinateValuesType } from "../types/charts.types";
import Circle from "../shapes/circle";
import ValueLabel from "../labels/value-label";
import CoordinateSystem2dGrid from "../grids/coordinate-system-2d-grid";

class BubleChart extends Chart implements BubleChartType {

    content: CoordinateValuesType[];
    maxX: number = 0;
    minX: number = 0;
    maxY: number = 0;
    minY: number = 0;
    width: number = 0;
    x0position: number = 0;
    height: number = 0;
    y0position: number = 0;
    stepValue: number = 0;

    constructor({values}: BubleChartInputType) {
        super();
        this.content = values || [];
    }

    draw() {
        if(this.parent && this.ctx) {
            let parent: CoordinateSystem2dGrid = <CoordinateSystem2dGrid>this.parent;
            this.width = parent.drawArea.width;
            this.height = parent.drawArea.height;
            this.x0position = parent.x0position;
            this.y0position = parent.y0position;
            this.stepValue = this.width / (parent.labels.x.values.length - 1) / parent.labels.x.step;
            this.maxX = parent.labels.x.values[parent.labels.x.values.length - 1];
            this.minX = parent.labels.x.values[0];
            this.minY = parent.labels.y.values[parent.labels.y.values.length - 1];
            this.maxY = parent.labels.y.values[0];
            this.ctx.globalAlpha = this.opacity;
            for(let {values, color, radius} of this.content) {
                let [x, y] = values;
                let w = this.calcWidth(x);
                let h = this.calcHeight(y);
                new Circle(this.ctx, w, h, radius * this.stepValue, {color}).draw();
                this.ctx.fillStyle = color;
                this.ctx.fill();
            }
        }
    }

    calcWidth(value: number) {
        const {maxX, minX, width, x0position} = this;
        return width * (value / (Math.abs(maxX) + Math.abs(minX))) + x0position;
    }

    calcHeight(value: number) {
        const {maxY, minY, height, y0position} = this;
        return height - height * (value / (Math.abs(maxY) + Math.abs(minY))) - (height - y0position);
    }

}

export default BubleChart;