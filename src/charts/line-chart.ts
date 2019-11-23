import Chart from "./chart";
import { LineCharType, MultipleValuesItem, LineChartInputType } from "../types/charts.types";
import Circle from "../shapes/circle";
import { AllLabels } from "../types/grids.types";
import Line from "../shapes/line";
import HorizontalGrid from "../grids/horizontal-grid";
import CoordinateSystem2dGrid from "../grids/coordinate-system-2d-grid";

class LineChart extends Chart implements LineCharType {

    content: MultipleValuesItem[];
    fill: boolean;
    dots: boolean;
    labelLen: number = 0;

    constructor({values, fill, dots, factor}: LineChartInputType = {}) {
        super(factor);
        this.content = values || [];
        this.fill = fill || false;
        this.dots = dots || false;
    }

    draw() {

        if(this.parent && this.ctx) {

            const {ctx} = this;
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
                mainLabel = this.parent.mainLabel;
                secondaryLabel = (<HorizontalGrid>this.parent).secondaryLabel;
            } else if(id === 'CoordinateSystem2dGrid') {
                mainLabel = 'y';
                secondaryLabel = 'x';
            }
            let parent: any = this.parent;
            let label = parent.labels[mainLabel];
            if(label) {
                maxY = parseFloat(<any>label.values[0]);
                minY = parseFloat(<any>label.values[label.values.length - 1]);
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
                if(this.fill) {
                    let minus = typeof item.values[item.values.length - 1] === 'number' ? step : innerStep;
                    points.push([posX - minus, y0position], [originPosX, y0position]);
                }
                ctx.lineWidth = this.lineWidth;
                new Line(ctx, points, {color: item.color, close: this.fill}).draw();
                ctx.fillStyle = item.color;
                if(this.fill) {
                    ctx.globalAlpha = this.opacity;
                    ctx.fill();
                }
                if(this.dots) {
                    if(this.fill) {
                        points.pop();
                        points.pop();
                    }
                    for(let [x ,y] of points) {                        
                        ctx.globalAlpha = 1;
                        if(this.dotBorder) {
                            ctx.lineWidth = this.dotRadius * 2;
                        }
                        new Circle(ctx, x, y, this.dotRadius, {color: this.dotBorder ? '#fff' : item.color}).draw();
                        ctx.fillStyle = item.color;
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

}

export default LineChart;