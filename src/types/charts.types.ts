import Grid from "../classes/grid";

export interface ChartType {
    opacity: number;
    lineWidth: number;
    content: any[];
    parent: Grid | null;
    ctx: CanvasRenderingContext2D | null;
}

interface ValueColorType {
    color: string;
    value: number | string;
}

interface GroupItemType {
    type: string;
    values: ValueColorType | ValueColorType[];
}

interface SingleItemType {
    values: ValueColorType;
}

interface MultipleValuesItem {
    color: string;
    values: number[] | string[];
}

export interface ColumnChart extends ChartType {
    content: GroupItemType[];
}

export interface RowChart extends ChartType {
    content: GroupItemType[];
}

export interface OpositeColumnChart extends ChartType {
    content: GroupItemType[];
}

export interface OpositeRowChart extends ChartType {
    content: GroupItemType[];
}

export interface PolygonChart extends ChartType {
    content: MultipleValuesItem[];
}

export interface RoundChart extends ChartType {
    content: SingleItemType[];
}

export interface LineChart extends ChartType {
    content: MultipleValuesItem[];
}

export interface ChartOptions {
    lineWidth: number;
    opacity: number;
}