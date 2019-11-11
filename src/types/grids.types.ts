import { Chart } from "./charts.types";

export interface GridType {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    margin: MarginAll;
    colors: GridColors;
    drawArea: DrawArea;
    labels: Label;
    allowedCharts: string[];
    chartList: {[key: string]: Chart}
}

export interface OptionsType {
    margin: MarginAll,
    colors: GridColors
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

export interface HorizontalGridType {
    labels: {
        top: AnyLabel;
        right: AnyLabel;
        bottom: AnyLabel;
        left: AnyLabel;
    }
}

export interface VerticalGridType {
    labels: {
        top: AnyLabel;
        right: AnyLabel;
        bottom: AnyLabel;
        left: AnyLabel;
    }
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

interface AnyLabel extends Label {
    type: 'percent' | 'value' | 'string';
    values: string[] | number[];
}

interface StringLabel extends Label {
    type: 'string';
    values: string[];
}

interface NumberLabel extends Label {
    type: 'number';
    values: number[];
}