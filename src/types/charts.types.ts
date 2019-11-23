import ChartFactor from "../factors/chart-factor";
import StringLabel from "../labels/string-label";
import Grid from "../grids/grid";

export interface ChartType {
    opacity: number;
    lineWidth: number;
    content: any[];
    parent: Grid | null;
    itemSize: number;
    ctx: CanvasRenderingContext2D | null;
    disable: boolean;
    dotRadius: number;
    dotBorder: boolean;
}

export interface ValueColorType {
    color: string;
    values: number;
    id?: string | number;
}

export interface ValueColorUpdateType {
    color?: string;
    id?: string | number;
    values?: number;
}

export interface GroupItemType {
    type: string;
    color: string | string[];
    values: number | number[];
    margin?: string;
    direction?: string;
}

export interface GroupItemUpdateType {
    type?: string;
    color?: string | string[];
    values?: number | number[];
    margin?: string;
    direction?: string;
}

export interface MultipleValuesItem {
    color: string;
    values: any[];
    id?: string | number;
}

export interface MultipleValuesItemUpdate {
    color?: string;
    values?: any[];
}

export interface ColumnChartType extends ChartType {
    content: GroupItemType[];
}

export interface RowChartType extends ChartType {
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
    values: number[] | number[][],
    under?: boolean
}

export interface RangeChartType extends ChartType {
    content: RangeValueType[];
}

export interface CoordinateValuesType {
    color: string;
    values: number[],
    radius: number;
    id?: string | number;
}

export interface CoordinateValuesUpdateType {
    color?: string;
    values?: number[],
    radius?: number;
    id?: string | number;
}

export interface BubleChartType {
    content: CoordinateValuesType[];
}

export interface BubleChartInputType {
    values?: CoordinateValuesType[];
}

export interface ChartOptions {
    lineWidth: number;
    opacity: number;
    itemSize: number;
}

export interface SameDirectionRoundChartInputType {
    values?: ValueColorType[];
    centerValue?: any;
    labels?: StringLabel;
    canvas?: HTMLCanvasElement;
    itemMargin?: number;
}

export interface RoundChartInputType {
    values?: ValueColorType[];
    labels?: StringLabel;
    centerValue?: any;
    changingSize?: boolean;
    blankCenter?: boolean;
    itemsMargin?: number;
    canvas?: HTMLCanvasElement;
    centerRadius?: number;
    changingStepSize?: number;
}

export interface RangeChartInputType {
    values?: RangeValueType[];
}

export interface ChartInput {
    factor?: ChartFactor;
}

export interface LineChartInputType extends ChartInput {
    values?: MultipleValuesItem[];
    fill?: boolean;
    dots?: boolean;
}

export interface PolygonChartInputType extends ChartInput {
    values?: MultipleValuesItem[];
    fill?: boolean;
    dots?: boolean;
}

export interface ColumnChartInputType {
    values?: GroupItemType[];
}

export interface RowChartInputType {
    values?: GroupItemType[];
}