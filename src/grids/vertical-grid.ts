import BaseGrid from "./base-grid";
import { AllLabels, VerticalGridType, InputAllLabels, VerticalGridOptopns } from "../types/grids.types";
import { ROW_CHART } from "../types/chart-names";
import Label from "../labels/label";
import Line from "../shapes/line";

class VerticalGrid extends BaseGrid implements VerticalGridType {

    allowedCharts = [ROW_CHART];
    labels: AllLabels;
    mainLabel: 'top' | 'bottom';
    identifier = 'VerticalGrid';
    secondaryLabel: 'left' | 'right';

    constructor(canvas: HTMLCanvasElement, labels: InputAllLabels, {mainLabel, secondaryLabel, factor}:VerticalGridOptopns = {}) {
        super(canvas, {factor});
        this.mainLabel = mainLabel || 'bottom';
        this.secondaryLabel = secondaryLabel || 'left';
        if(!this.validateLabels(labels)) {
            throw new Error('No coresponding labels to values');
        }   
        this.labels = this.setLabels(labels);
    }

    validateLabels(labels: InputAllLabels) {
        let valid = false
        if(labels.bottom) {
            if(labels.bottom.identifier !== 'string') {
                valid = true;
            }
        } else {
            this.mainLabel = 'top';
            if(labels.top && labels.top.identifier !== 'string') {
                valid = true;
            }
        }
        return valid;
    }

    drawGrid() {
        this.drawOuter();
        this.drawInnerGrid();
        this.drawBorder();
    }

    drawInnerGrid() {
        let len = ((<Label>this.labels[this.mainLabel]).values.length - 1) * 2;
        let step = this.drawArea.width / len;
        let curent = 0;
        for(let i = 0; i < len + 1; i++) {
            let label = (<Label>this.labels[this.mainLabel]).values[i / 2];
            let color = this.colors[label === '0' || label === '0%' || label === 0 ? 'primary' : 'secondary'];
            new Line(this.ctx, [[curent, 0],[curent, this.drawArea.height]], {color: color}).draw();
            curent += step;
        }

    }
    
}

export default VerticalGrid;