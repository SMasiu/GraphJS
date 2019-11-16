import Chart from "./chart";
import { LineCharType, MultipleValuesItem, LineChartInputType } from "../types/charts.types";
import HorizontalGrid from "./horizontal-grid";
import Line from "./line";

class LineChart extends Chart implements LineCharType {

    content: MultipleValuesItem[];
    fill: boolean;

    constructor({values, fill}: LineChartInputType = {}) {
        super();
        this.content = values || [];
        this.fill = fill || false;
    }

    draw() {

        if(this.parent && this.ctx) {

            const {ctx} = this;
            const {width, height} = this.parent.drawArea;
            let x0position: number, y0position: number;
            let maxY: number = 0, minY: number = 0; 

            let id = this.parent.identifier;

            if(id === 'HorizontalGrid') {
                let parent: HorizontalGrid = <HorizontalGrid>this.parent;
                let label = parent.labels[(<'left' | 'right'>parent.mainLabel)];
                if(label) {
                    maxY = <number>label.values[0];
                    minY = <number>label.values[label.values.length - 1];
                    x0position = 0;
                    y0position = parent.y0position;
                }
            }
            
            ctx.lineWidth = this.lineWidth;
            ctx.globalAlpha = this.opacity;
            let originPosX = 0
            let posX = originPosX;
            for(let item of this.content) {
                
                let points: number[][] = [];
                let step = width / item.values.length;
                let innerStep = 0;
                for(let values of item.values) {
                    
                    innerStep = step / values.length;
                    for(let value of values) {
                        let h = height - height * (value / maxY);
                        points.push([posX, h]);

                        posX += innerStep;

                    }
                }
                points.push([posX - innerStep, height], [originPosX, height]);
                new Line(ctx, points, {color: item.color, close: true}).draw();
                ctx.fillStyle = item.color;
                ctx.fill();
            }
        }
    }

}

export default LineChart;