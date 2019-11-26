import Chart from "./chart";
import { BubleChartType, BubleChartInputType, CoordinateValuesType } from "../types/charts.types";
import Circle from "../shapes/circle";
import CoordinateSystem2dGrid from "../grids/coordinate-system-2d-grid";
import { BUBLE_CHART } from "../types/chart-names";

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
    reversedValuesX: boolean = false;
    reversedValuesY: boolean = false;
    identifier = BUBLE_CHART;
    constructor({values}: BubleChartInputType) {
        super();
        this.content = values || [];
    }
    createGradient(x: number, xE: number, colors: string[]) {
        const { ctx } = this;
            let grd = (<CanvasRenderingContext2D>ctx).createLinearGradient(x, 0, x + xE, 0);
            let step = 1 / (colors.length - 1);
            let cStep = 0;
            for(let c of colors) {
                grd.addColorStop(cStep, c);
                cStep += step;
            }
            return grd;
    }
    drawChart() {
        if(this.parent && this.ctx) {
            let parent: CoordinateSystem2dGrid = <CoordinateSystem2dGrid>this.parent;
            this.width = parent.drawArea.width;
            this.height = parent.drawArea.height;
            this.x0position = parent.x0position;
            this.y0position = parent.y0position;
            this.stepValue = this.width / (parent.labels.x.values.length - 1) / parent.labels.x.step;
            this.maxX = parent.labels.x.max;
            this.minX = parent.labels.x.min;
            this.minY = parent.labels.y.min;
            this.maxY = parent.labels.y.max;
            this.reversedValuesX = parent.labels.x.reversedValues;
            this.reversedValuesY = parent.labels.y.reversedValues;
            this.ctx.globalAlpha = this.opacity;
            for(let {values, color, radius} of this.content) {
                let [x, y] = values;
                let w = this.calcWidth(x);
                let h = this.calcHeight(y);
                let col = this.getColor(color, w - radius , radius * 2);
                new Circle(this.ctx, w, h, radius, {color: col}).draw();
                this.ctx.fillStyle = col;
                this.ctx.fill();
            }
        }
    }

    private calcWidth(value: number) {
        const {maxX, minX, width, x0position} = this;
        return this.combineCalc(value, x0position, width, minX, maxX, this.reversedValuesX);
    }

    private calcHeight(value: number) {
        const {maxY, minY, height, y0position} = this;
        return this.combineCalc(value, y0position, height, minY, maxY, this.reversedValuesY);
    }

    private combineCalc(value: number, _0pos: number, size: number, min: number, max: number, reverse: boolean) {
        if(value === 0) {
            return _0pos;
        }
        else if(value < 0 && !reverse) {
            let lWidth = _0pos;
            let w = lWidth * (Math.abs(value) / Math.abs(min));
            return _0pos - w;
        }

        else {
            let rWidth = reverse ? _0pos : size - _0pos;
            let w = rWidth * (value / max) * (reverse ? -1 : 1);
            return w + _0pos;
        }
    }

    setSize() {
        let maxX = 0, maxY = 0, minY = 0, minX = 0;
        for(let item of this.content) {
            let [x, y] = item.values;
            if(x > maxX) {
                maxX = x + item.radius;
            } else if(x < minX) {
                minX = x - item.radius;
            }
            if(y > maxY) {
                maxY = y + item.radius;
            } else if(y < minY) {
                minY = y - item.radius;
            }
        }
        this.minValue = [minX, minY];
        this.maxValue = [maxX, maxY];
    }

}

export default BubleChart;