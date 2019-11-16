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

export interface MultipleValuesItem {
    color: string;
    values: any[];
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

export interface PolygonCharType extends ChartType {
    content: MultipleValuesItem[];
}

export interface LineCharType extends ChartType {
    content: MultipleValuesItem[];
}

export interface RoundChartType extends ChartType {
    content: ValueColorType[];
}

export interface SameDirectionRoundChartType {
    content: ValueColorType[];
}

export interface RangeValueType {
    color: string;
    values: number[] | number[][]
}

export interface RangeChartType extends ChartType {
    content: RangeValueType[];
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

export interface RangeChartInputType {
    values?: RangeValueType[];
}

export interface LineChartInputType {
    values?: MultipleValuesItem[];
    fill?: boolean;
    dots?: boolean;
}

export interface PolygonChartInputType {
    values?: MultipleValuesItem[];
    fill?: boolean;
    dots?: boolean;
}