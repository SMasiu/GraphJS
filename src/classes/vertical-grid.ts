import BaseGrid from "./base-grid";
import { AllLabels, AnyLabelType, VerticalGridType } from "../types/grids.types";
import Line from "./line";
import { ROW_CHART, OPOSITE_ROW_CHART } from "../types/chart-names";
import { InputAllLabels } from "../types/input-labels.type";

class VerticalGrid extends BaseGrid implements VerticalGridType {

    allowedCharts: string[];
    labels: AllLabels;
    mainLabel: 'top' | 'bottom';
    identifier: string;
    
    constructor(canvas: HTMLCanvasElement, labels: InputAllLabels, {mainLabel}: {mainLabel: 'top' | 'bottom'} = {mainLabel: 'bottom'}) {
        super(canvas);
        this.identifier = 'VerticalGrid';
        this.allowedCharts = [ROW_CHART, OPOSITE_ROW_CHART];
        this.mainLabel = mainLabel;
        //validate labels 
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
        let len = ((<AnyLabelType>this.labels[this.mainLabel]).values.length - 1) * 2;
        let step = this.drawArea.width / len;
        let curent = 0;
        for(let i = 0; i < len + 1; i++) {
            new Line(this.ctx, [[curent, 0],[curent, this.drawArea.height]], {color: this.colors.secondary}).draw();
            curent += step;
        }

    }

}

export default VerticalGrid;