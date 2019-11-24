import { Coordinate2dGridType, Label2dType, DrawArea } from "../types/grids.types";
import { ROW_CHART, OPOSITE_ROW_CHART, COLUMN_CHART, OPOSITE_COLUMN_CHART, LINE_CHART } from "../types/chart-names";
import ValueLabel from "../labels/value-label";
import clearDrawArea from "../types/draw-area";
import GridFactor from "../factors/grid-factor";
import Grid from "../grids/grid";
import Line from "../shapes/line";
import FlexLabel from "../labels/flex-label";
import Label from "../labels/label";

interface InputLabels {
    x: ValueLabel,
    y: ValueLabel
}

interface CoordinateSystem2dInput {
    meshType?: string;
    factor?: GridFactor
}

class CoordinateSystem2dGrid extends Grid implements Coordinate2dGridType {

    allowedCharts: string[];
    labels: Label2dType;
    mainLabel: string;
    drawArea: DrawArea;
    x0position: number;
    y0position: number;
    meshType: string;
    identifier: string;
    step: {
        x: number,
        y: number;
    }

    constructor(canvas: HTMLCanvasElement, labels: InputLabels, {meshType, factor}: CoordinateSystem2dInput = {}) {
        super(canvas, factor);
        this.identifier = 'CoordinateSystem2dGrid';
        this.allowedCharts = [ROW_CHART, OPOSITE_ROW_CHART, COLUMN_CHART, OPOSITE_COLUMN_CHART, LINE_CHART];
        this.labels = this.setLabels(labels);
        this.drawArea = clearDrawArea;
        this.mainLabel = 'both';
        this.x0position = 0;
        this.y0position = 0;
        this.step = {x: 0, y: 0};
        this.meshType = meshType || 'default';
    }

    getZeroPosition() {
        this.x0position = this.getZero('width', 'x');
        this.y0position = this.getZero('height', 'y');
    }

    getZero(what: 'width' | 'height', from: 'x' | 'y') {
        let x = 0;
        let step = this.drawArea[what] / (this.labels[from].values.length - 1);
        this.step[from] = step;
        let values = [...this.labels[from].values];
        for(let val of values) {
            if(val === 0) {
                break;
            }
            x += step;
        }
        return x;
    }

    drawGrid() {
        this.setUpDrawArea();
        this.getZeroPosition();
        this.drawBorder();
        this.drawLabels();
    }

    drawBorder() {
        new Line(this.ctx, [[0, this.y0position],[this.drawArea.width, this.y0position]], {color: this.colors.primary}).draw();
        new Line(this.ctx, [[this.x0position, 0],[this.x0position, this.drawArea.height]], {color: this.colors.primary}).draw();
    }

    setUpDrawArea() {
        let {top, bottom, left, right} = this.margin;
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

    drawLabels() {
        
        this.setFont('center');
        this.drawLabel(this.labels.x.values, this.step.x, this.y0position, 'height')
        this.drawLabel(this.labels.y.values, this.step.y, this.x0position, 'width', true)
        this.ctx.fillText('0', this.x0position + this.labelPadding, this.y0position + 5 + this.labelPadding);
    }

    drawLabel(values: number[], step: number, zeroPosition: number, direction: 'height' | 'width', reverse: boolean = false) {
        let offset = 0;
        for(let label of values) {
            if(label !== 0) {
                let long = [[offset, 0], [offset, this.drawArea[direction]]];
                let short = [[offset, zeroPosition - 3],[offset, zeroPosition + 3]]
                if(reverse) {
                    long = long.map( l => l.reverse());
                    short = short.map( s => s.reverse());
                }
                if(this.meshType === 'default') {
                    new Line(this.ctx, long, {color: this.colors.secondary}).draw();
                }
                if(reverse) {
                    this.ctx.textAlign = 'right';
                    this.ctx.fillText(label.toString(), zeroPosition - this.labelPadding, offset + 2);
                } else {
                    this.ctx.textAlign = 'center';
                    this.ctx.fillText(label.toString(), offset, zeroPosition + this.labelPadding + 5);
                }
                new Line(this.ctx, short, {color: this.colors.primary}).draw();
            }
            offset += step;
        }
    }

    setLabels({x, y}: InputLabels): Label2dType {
        return { x, y };
    }

    resize() {
        this.checkLabel(this.labels.y, 1);
        this.checkLabel(this.labels.x, 0);
    }

    private checkLabel(label: Label, i: number) {
        if(label && label.flex) {
            let min = 0, max = 0;
            for(let key in this.chartList) {
                let chart = this.chartList[key];
                chart.setSize();
                let mnVal = 0, mxVal = 0;
                if(typeof chart.maxValue === 'number') {
                    mxVal = chart.maxValue;
                } else {
                    mxVal = chart.maxValue[i];
                }
                if(typeof chart.minValue === 'number') {
                    mnVal = chart.minValue;
                } else {
                    mnVal = chart.minValue[i];
                }
                if(min > mnVal) {
                   min = mnVal;
                }   
                if(max < mxVal) {
                   max = mxVal;
                }
            }
            (<FlexLabel>label).resize(min, max);
        }
    }
}


export default CoordinateSystem2dGrid;