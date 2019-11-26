import Chart from "./chart";
import { SameDirectionRoundChartInputType, SameDirectionRoundChartType, ValueColorType, ValueColorUpdateType } from "../types/charts.types";
import LinePiece from "../shapes/line-piece";
import NoGrid from "../grids/no-grid";
import StringLabel from "../labels/string-label";
import { SAME_DIRECTION_ROUND_CHART } from "../types/chart-names";

class SameDirectionRoundChart extends Chart implements SameDirectionRoundChartType {
    content: ValueColorType[];
    centerValue: string | null;
    labels: StringLabel | null;
    itemMargin: number;
    identifier = SAME_DIRECTION_ROUND_CHART;

    constructor({labels, values, centerValue, canvas, itemMargin}: SameDirectionRoundChartInputType = {}) {
        super();
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
        const {ctx, parent, itemSize, opacity, itemMargin, lineWidth, centerValue} = this;
        if(ctx && parent) {
            const { centerX, centerY } = parent.drawArea;
            let originRadius = Math.min(parent.drawArea.width, parent.drawArea.height) / 2;
            let radius = originRadius;
            let margin = itemMargin + itemSize;
            
            for(let item of this.content) {
                let angle = 2 * Math.PI * (item.values / 100);
                new LinePiece(ctx, centerX, centerY, radius, {
                    opacity,
                    angle,
                    color: item.color,
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
            let posY = centerY - originRadius;
            parent.setFont('right');
            for(let label of labels) {
                let posX = centerX - parent.labelPadding * 2;
                ctx.fillText(label.toString(), posX, posY);
                posY += itemSize + itemMargin;
            }
            }

        }
    }
}

export default SameDirectionRoundChart;