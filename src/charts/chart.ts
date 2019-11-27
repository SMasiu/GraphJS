import { ChartType } from "../types/charts.types";
import ChartFactor, { DEFAULT_CHART_FACTOR } from "../factors/chart-factor";
import Grid from "../grids/grid";

abstract class Chart implements ChartType {

    opacity: number;
    lineWidth: number;
    ctx: CanvasRenderingContext2D | null;
    parent: Grid | null;
    itemSize: number;
    disable: boolean = false;
    dotBorder: boolean;
    dotRadius: number;
    maxValue: number | number[] = 0;
    minValue: number | number[] = 0;
    correspondTo: string = '';
    abstract content: any[];
    abstract identifier: string;
    abstract drawChart(): void;

    createLabel(out: HTMLElement) {
        let elem = document.createElement('aside');
        elem.classList.add('graphis-labels');
        let names: string[] = [];
        for(let {name, color} of this.content) {
            if(name) {
                if(typeof name === 'string') {
                    if(this.isIn(names, name) === -1) {
                        elem.appendChild(this.createItem(name, color));
                        names.push(name);
                    }
                } else {
                    for(let i in name) {
                        if(this.isIn(names, name[i]) === -1) {
                            elem.appendChild(this.createItem(name[i], color[i]));
                            names.push(name[i]);
                        }
                    }
                }
            }
        }
        out.appendChild(elem);
    }
    
    private isIn(names: string[], name: string) {

        return names.findIndex( n => n === name);

    }

    private createItem (nam: string, col: string | string[]) {
        let item = document.createElement('div');
        item.classList.add('graphjs-item')
        let color = document.createElement('span');
        color.style.display = 'inline-block';
        color.style.width = '10px';
        color.style.height = '10px';
        let c: string;
        if(typeof col === 'string') {
            c = col;
        } else {
            c = `linear-gradient(${col.toString()})`;
        }
        color.style.background = c;
        item.appendChild(color);
    
        let name = document.createElement('p');
        name.appendChild(document.createTextNode(nam));
        item.appendChild(name);
        return item;
    }

    updateItemContent(id: string | number, content: any) {
        let item = this.getItemContent(id);
        if(item) {
            for(let key in content) {
                item[key] = (<any>content)[key];
            }
        }
        return item;
    }

    addItemContent(content: any) {
        this.content.push(content);
        return content;
    }

    setSize() {
        this.maxValue = 100;
        this.minValue = 0;
    }

    getColor(color: string | string[], x: number, xE: number) {
        if(typeof color === 'string') {
            return color;
        } else {
            return this.createGradient(x, xE, color);
        }
    }

    abstract createGradient(x: number, xE: number, colors: string[]): CanvasGradient;

    constructor(factor: ChartFactor = DEFAULT_CHART_FACTOR) {

        this.opacity = factor.opacity;
        this.lineWidth = factor.lineWidth;
        this.itemSize = factor.itemSize;
        this.dotBorder = factor.dotBorder;
        this.dotRadius = factor.dotRadius;
        this.parent = null;
        this.ctx = null;

    }
    
    draw() {
        this.drawChart();
    }

    getItemContent(id: string | number) {
        return this.content[this.content.findIndex( c => c.id === id)];
    }

    deleteItemContent(id: string | number) {
        let index = this.content.findIndex(c => c.id === id);
        return index === -1 ? null : this.content.splice(index, 1);
    }

}

export default Chart;