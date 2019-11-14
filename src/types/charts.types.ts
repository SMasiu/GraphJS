import Grid from "../classes/grid";

export interface ChartType {
    opacity: number;
    lineWidth: number;
    content: any[];
    parent: Grid | null;
    itemSize: number;
    ctx: CanvasRenderingContext2D | null;
}

export interface ValueColorType {
    color: string;
    value: number;
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

export interface SameDirectionRoundChartType {
    content: ValueColorType[];
}

export interface LineChart extends ChartType {
    content: MultipleValuesItem[];
}

export interface ChartOptions {
    lineWidth: number;
    opacity: number;
    itemSize: number;
}

export interface SameDirectionRoundChartInputType {
    values?: ValueColorType[];
    centerValue?: any;
}