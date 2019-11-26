import Chart from "./chart";
import { LineCharType, MultipleValuesItem, LineChartInputType } from "../types/charts.types";
import Circle from "../shapes/circle";
import Line from "../shapes/line";
import HorizontalGrid from "../grids/horizontal-grid";
import { LINE_CHART } from "../types/chart-names";

class LineChart extends Chart implements LineCharType {

    content: MultipleValuesItem[];
    fill: boolean;
    dots: boolean;
    labelLen: number = 0;
    dashLine: number[];
    smooth: boolean;
    correspondTo: string;
    identifier = LINE_CHART;

    constructor({values, fill, dots, dashLine, factor, smooth, correspondTo}: LineChartInputType = {}) {
        super(factor);
        this.content = values || [];
        this.fill = fill || false;
        this.dots = dots || false;
        this.dashLine = dashLine || [0];
        this.smooth = smooth || false;
        this.correspondTo = correspondTo || '';
    }

    createGradient(x: number, xE: number, colors: string[]) {
        const { ctx } = this;
            let grd = (<CanvasRenderingContext2D>ctx).createLinearGradient(0, x, 0, x + xE);
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

            const {ctx, smooth, fill, lineWidth, dashLine, dotRadius, dotBorder} = this;
            const {width, height} = this.parent.drawArea;
            let y0position: number = 0;
            let maxY: number = 0, minY: number = 0; 
            let id = this.parent.identifier;
            let reversedValues = false;
            let mainLabel = '';
            let secondaryLabel = '';
            let mainLen: number = 0;
            let underZero: number = 0;
            if(id === 'HorizontalGrid') {
                mainLabel = this.correspondTo || this.parent.mainLabel;
                secondaryLabel = (<HorizontalGrid>this.parent).secondaryLabel;
            } else if(id === 'CoordinateSystem2dGrid') {
                mainLabel = 'y';
                secondaryLabel = 'x';
            }
            let parent: any = this.parent;
            let label = parent.labels[mainLabel];
            if(label) {
                maxY = parseFloat(<any>label.max);
                minY = parseFloat(<any>label.min);
                y0position = parent.y0position;
                mainLen = label.values.length - 1;
                reversedValues = label.reversedValues;
                underZero = label.underZero;
                let lab = parent.labels[secondaryLabel];
                if(lab) {
                    let plus = lab.identifier === 'string' ? 1 : 0;
                    this.labelLen = lab.values.length + plus;
                }
            }

            let hStep = height * (underZero / mainLen);
            let originPosX = 0;
            if(!reversedValues) {
                ctx.translate(0, hStep + y0position);
                ctx.scale(1, -1);
            }

            for(let item of this.content) {
                let posX = originPosX;
                
                let points: number[][] = [];
                let step = width / (this.labelLen - 1);
                let innerStep = 0;
                for(let values of item.values) {
                    if(typeof values === 'number') {
                        let h = height - height * (values / (Math.abs(maxY) + Math.abs(minY))) - (height - y0position);
                        points.push([posX, Math.round(h)]);
                        posX += step;
                    } else {
                        innerStep = step / values.length;
                        for(let value of values) {
                            let h = height - height * (value / (Math.abs(maxY) + Math.abs(minY))) - (height - y0position);
                            points.push([Math.round(posX), Math.round(h)]);

                            posX += innerStep;

                        }
                    }
                }
                if(fill) {
                    let minus = typeof item.values[item.values.length - 1] === 'number' ? step : innerStep;
                    points.push([posX - minus, y0position], [originPosX, y0position]);
                }
                ctx.lineWidth = lineWidth;
                let color = this.getColor(item.color, 0, height);
                new Line(ctx, points, {color, close: fill, dashLine: dashLine, smooth}).draw();
                ctx.fillStyle = color;
                if(fill) {
                    ctx.globalAlpha = this.opacity;
                    ctx.fill();
                }
                if(this.dots) {
                    if(fill) {
                        points.pop();
                        points.pop();
                    }
                    for(let [x ,y] of points) {                        
                        ctx.globalAlpha = 1;
                        if(dotBorder) {
                            ctx.lineWidth = dotRadius * 2;
                        }
                        new Circle(ctx, x, y, dotRadius, {color: dotBorder ? '#fff' : color}).draw();
                        ctx.fillStyle = color;
                        ctx.fill();
                    }
                }

            }

            if(!reversedValues) {
                ctx.scale(1, -1);
                ctx.translate(0, -(hStep + y0position));
            }

        }
    }

    setSize() {
        let arr: any = [...this.content];
        arr = arr.map((a: any) => a.values).flat(3);
        let max = 0, min = 0;
        arr.forEach( (v:number) => {
            if (v > max) { max = v }
            else if (v < min) { min = v };
        });
        this.maxValue = max;
        this.minValue = min;
    }

}

export default LineChart;