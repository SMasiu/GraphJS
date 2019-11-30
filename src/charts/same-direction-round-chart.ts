import Chart from "./chart";
import { SameDirectionRoundChartInputType, SameDirectionRoundChartType, ValueColorType } from "../types/charts.types";
import LinePiece from "../shapes/line-piece";
import NoGrid from "../grids/no-grid";
import StringLabel from "../labels/string-label";
import { SAME_DIRECTION_ROUND_CHART } from "../types/chart-names";
import Grid from "../grids/grid";
import Line from "../shapes/line";

class SameDirectionRoundChart extends Chart implements SameDirectionRoundChartType {
    content: ValueColorType[];
    centerValue: string | null;
    labels: StringLabel | null;
    itemMargin: number;
    identifier = SAME_DIRECTION_ROUND_CHART;

    constructor({labels, values, centerValue, canvas, itemMargin, factor}: SameDirectionRoundChartInputType = {}) {
        super(factor);
        if (canvas) {
            this.parent = new NoGrid(canvas);
            this.ctx = this.parent.ctx;
            this.parent.setUpDrawArea();
            if (this.ctx) {
                this.ctx.translate(.5, .5);
            }
        }
        this.itemMargin = itemMargin === 0 || itemMargin ? itemMargin : 10;
        this.content = values || [];
        this.centerValue = centerValue ? centerValue.toString() : null;
        if(labels) {
            this.labels = labels;
        } else {
            this.labels = null
        }
    }

    createGradient(r: number, xE: number, colors: string[]) {
        const { ctx, itemSize } = this;
        const {centerX, centerY} = (<Grid>this.parent).drawArea;
        let grd = (<CanvasRenderingContext2D>ctx).createRadialGradient(centerX, centerY, r - itemSize / 2, centerX, centerY, r + itemSize / 2);
        let step = 1 / (colors.length - 1);
        let cStep = 0;
        for(let c of colors) {
            grd.addColorStop(cStep, c);
            cStep += step;
        }
        return grd;
    }

    drawChart() {
        const {ctx, parent, itemSize, opacity, itemMargin, lineWidth, centerValue} = this;
        if(ctx && parent) {
            const { centerX, centerY } = parent.drawArea;
            let originRadius = Math.min(parent.drawArea.width, parent.drawArea.height) / 2;
            let radius = originRadius;
            let margin = itemMargin + itemSize;
            for(let item of this.content) {
                let color = this.getColor(item.color, radius, 0);
                let angle = 2 * Math.PI * (item.values / 100);
                new LinePiece(ctx, centerX, centerY, radius, {
                    opacity,
                    angle,
                    color,
                    lineWidth,
                    size: itemSize
                }).draw();
                radius -= margin;
            }
            ctx.textBaseline = 'middle';
            if(centerValue) {
                parent.setFont('center');
                ctx.font = `35px ${parent.font.family}`;
                ctx.fillText(centerValue, centerX, centerY);
            }
            if(this.labels) {
                let labels = this.labels.values;
                let posY = centerY - originRadius - (this.itemSize / 2) + 2;
                parent.setFont('left');
                for(let label of labels) {
                    if(this.parent) {
                        let posX = centerX;
                        ctx.lineWidth = this.parent.font.size + 5;
                        label = label.toString();
                        let textW = ctx.measureText(label).width;
                        let start = posX - textW / 2;
                        new Line(ctx, [[start, posY], [start + textW, posY]], {color: '#fff'}).draw();
                        ctx.fillText(label, start, posY);
                        posY += itemSize + itemMargin;
                    }
                }
            }

        }
    }
}

export default SameDirectionRoundChart;