import { Chart } from "./charts.types";

export interface GridType {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    margin: MarginAll;
    colors: GridColors;
    drawArea: DrawArea;
    allowedCharts: string[];
    chartList: {[key: string]: Chart};
    labels: Label | AllLabels;
    font: FontOptions;
    labelPadding: number;
}

export interface FontOptions {
    size: number;
    family: string;
    color: string;
}

export interface OptionsType {
    margin: MarginAll;
    colors: GridColors;
    font: FontOptions;
    labelPadding: number;
}

export interface GridColors {
    primary: string;
    secondary: string;
}

export interface MarginAll {
    top: number;
    right: number;
    bottom: number;
    left: number;
}

export interface DrawArea {
    startX: number;
    startY: number;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
}

export interface AllLabels {
    top?: AnyLabel;
    right?: AnyLabel;
    bottom?: AnyLabel;
    left?: AnyLabel;
}

export interface HorizontalGridType {
    labels: AllLabels;
}

export interface VerticalGridType {
    labels: AllLabels;
}

export interface RoundGridType {
    labels: StringLabel;
}

export interface PolygonGridType {
    labels: StringLabel;
}

export interface CoordinateGridType {
    labels: {
        vertical: NumberLabel;
        horizontal: NumberLabel;
    }
}

export interface Label {
    type: string;
    values: string[] | boolean[] | number[];
}

export interface AnyLabel extends Label {
    type: 'percent' | 'value' | 'string';
    width?: number;
    values: string[] | number[];
}

export interface StringLabel extends Label {
    type: 'string';
    values: string[];
}

export interface NumberLabel extends Label {
    type: 'number';
    values: number[];
}