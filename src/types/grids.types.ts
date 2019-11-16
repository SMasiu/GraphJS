import Chart from "../classes/chart";

export interface GridType {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    centerX: number;
    centerY: number;
    margin: MarginAll;
    colors: GridColors;
    drawArea: DrawArea;
    allowedCharts: string[];
    chartList: {[key: string]: Chart};
    labels: LabelType | AllLabels | Label2dType;
    font: FontOptions;
    labelPadding: number;
    mainLabel: string;
    identifier: string;
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
    top?: AnyLabelType;
    right?: AnyLabelType;
    bottom?: AnyLabelType;
    left?: AnyLabelType;
}

export interface HorizontalGridType {
    labels: AllLabels;
}

export interface VerticalGridType {
    labels: AllLabels;
}

export interface PolygonGridType {
    labels: StringLabelType;
}

export interface Coordinate2dGridType {
    labels: Label2dType
}

export interface Coordinate1dGridType {
    labels: NumberLabelType
}

export interface NoGridType {
    labels: StringLabelType
}

export interface Label2dType {
    y: NumberLabelType;
    x: NumberLabelType;
}

export interface LabelType {
    type: string;
    values: string[] | boolean[] | number[];
}

export interface AnyLabelType extends LabelType {
    type: 'percent' | 'value' | 'string';
    width?: number;
    values: string[] | number[];
}

export interface StringLabelType extends LabelType {
    type: 'string';
    values: string[];
}

export interface NumberLabelType extends LabelType {
    type: 'value';
    values: number[];
}

export interface PercentLabelType extends LabelType {
    type: 'percent';
    values: string[];
}