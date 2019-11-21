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
    labelLen: number;

    constructor({values, fill, dots, factor}: LineChartInputType = {}) {
        super(factor);
        this.content = values || [];
        this.fill = fill || false;
        this.dots = dots || false;
        this.labelLen = 0;
    }

    draw() {

        if(this.parent && this.ctx) {

            const {ctx} = this;
            const {width, height} = this.parent.drawArea;
            let x0position: number = 0, y0position: number = 0;
            let maxY: number = 0, minY: number = 0; 
            let id = this.parent.identifier;

            if(id === 'HorizontalGrid') {
                let parent: HorizontalGrid = <HorizontalGrid>this.parent;
                let label = parent.labels[(<'left' | 'right'>parent.mainLabel)];
                if(label) {
                    maxY = parseFloat(<any>label.values[0]);
                    minY = parseFloat(<any>label.values[label.values.length - 1]);
                    x0position = 0;
                    y0position = parent.y0position;
                    let lab = (<AllLabels>parent.labels)[parent.secondaryLabel]
                    if(lab) {
                        let plus = lab.identifier === 'string' ? 1 : 0;
                        this.labelLen = lab.values.length + plus;
                    }
                }
            } else if(id === 'CoordinateSystem2dGrid') {
                let parent: CoordinateSystem2dGrid = <CoordinateSystem2dGrid>this.parent;
                let label = parent.labels.y;
                maxY = label.values[0];
                minY = label.values[label.values.length - 1];
                x0position = parent.x0position;
                y0position = parent.y0position;
                this.labelLen = parent.labels.x.values.length;
            }
            
            let originPosX = 0
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
        }
    }

}

export default LineChart;