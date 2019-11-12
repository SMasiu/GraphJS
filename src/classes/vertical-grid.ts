import BaseGrid from "./base-grid";
import { AllLabels, AnyLabel } from "../types/grids.types";
import Line from "./line";
import { ROW_CHART, OPOSITE_ROW_CHART } from "../types/chart-names";

class VerticalGrid extends BaseGrid {

    allowedCharts: string[];
    labels: AllLabels;
    mainLabel: 'top' | 'bottom';
    constructor(canvas: HTMLCanvasElement, labels: AllLabels, {mainLabel}: {mainLabel: 'top' | 'bottom'} = {mainLabel: 'bottom'}) {
        super(canvas);
        this.allowedCharts = [ROW_CHART, OPOSITE_ROW_CHART];
        this.mainLabel = mainLabel;
        //validate labels
        let valid = false
        if(labels.bottom) {
            if(labels.bottom.type !== 'string') {
                valid = true;
            }
        } else {
            this.mainLabel = 'bottom';
            if(labels.top && labels.top.type !== 'string') {
                valid = true;
            }
        }
        if(!valid) {
            throw new Error('No coresponding labels to values');
        }

        this.labels = labels;
        
    }

    draw() {
        this.drawOuter();
        this.drawInnerGrid();
        this.drawBorder();
    }

    drawInnerGrid() {
        let len = ((<AnyLabel>this.labels[this.mainLabel]).values.length - 1) * 2;
        let step = this.drawArea.width / len;
        let curent = 0;
        this.ctx.strokeStyle = this.colors.secondary;
        for(let i = 0; i < len + 1; i++) {
            new Line(this.ctx, [[curent, 0],[curent, this.drawArea.height]]).draw();
            curent += step;
        }

    }

}

export default VerticalGrid;