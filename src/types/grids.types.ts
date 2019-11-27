import Chart from "../charts/chart";
import GridFactor from "../factors/grid-factor";
import Label from "../labels/label";
import ValueLabel from "../labels/value-label";
import StringLabel from "../labels/string-label";

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
    labels: Label | AllLabels | Label2dType | null;
    font: FontOptions;
    labelPadding: number;
    mainLabel: string;
    identifier: string;
    background: Background;
}

export interface Background {
    color: string;
    image: string;
    opacity: number;
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

export interface HorizontalGridOptions {
    mainLabel?: 'left' | 'right';
    secondaryLabel?: 'bottom' | 'top';
    factor?: GridFactor;
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
    top?: Label;
    right?: Label;
    bottom?: Label;
    left?: Label;
}

export interface InputAllLabels {
    top?: Label;
    right?: Label;
    bottom?: Label;
    left?: Label;
}

export interface HorizontalGridType {
    labels: AllLabels;
}

export interface VerticalGridType {
    labels: AllLabels;
}

export interface PolygonGridType {
    labels: StringLabel;
}

export interface Coordinate2dGridType {
    labels: Label2dType
}

export interface Coordinate1dGridType {
    labels: ValueLabel
}

export interface NoGridType {
    labels: null
}

export interface Label2dType {
    y: ValueLabel;
    x: ValueLabel;
}

export interface LabelType {
    type: string;
    values: string[] | boolean[] | number[];
}

export interface GridOptions {
    factor?: GridFactor;
}

export interface InputLabels {
    x: ValueLabel,
    y: ValueLabel
}

export interface CoordinateSystem2dInput {
    meshType?: string;
    factor?: GridFactor
}

export interface VerticalGridOptopns {
    mainLabel?: 'top' | 'bottom';
    secondaryLabel?: 'left' | 'right';
    factor?: GridFactor
}