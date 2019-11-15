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

interface MultipleValuesItem {
    color: string;
    values: number[] | string[];
}

export interface ColumnChartType extends ChartType {
    content: GroupItemType[];
}

export interface RowChartType extends ChartType {
    content: GroupItemType[];
}

export interface OpositeColumnChartType extends ChartType {
    content: GroupItemType[];
}

export interface OpositeRowCharTypet extends ChartType {
    content: GroupItemType[];
}

export interface PolygonCharTypet extends ChartType {
    content: MultipleValuesItem[];
}

export interface RoundChartType extends ChartType {
    content: ValueColorType[];
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

export interface RoundChartInputType {
    values?: ValueColorType[];
    centerValue?: any;
    changingSize?: boolean;
    blankCenter?: boolean;
    itemsMargin?: number;
}