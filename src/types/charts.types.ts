export interface Chart {
    title: string;
    opacity: number;
    lineWidth: number;
    content: any[];
}

interface ValueColor {
    color: string;
    value: number | string;
}

interface GroupItem {
    type: string;
    values: ValueColor | ValueColor[];
}

interface SingleItem {
    values: ValueColor;
}

interface MultipleValuesItem {
    color: string;
    values: number[] | string[];
}

export interface ColumnChart extends Chart {
    content: GroupItem[];
}

export interface RowChart extends Chart {
    content: GroupItem[];
}

export interface OpositeColumnChart extends Chart {
    content: GroupItem[];
}

export interface OpositeRowChart extends Chart {
    content: GroupItem[];
}

export interface PolygonChart extends Chart {
    content: MultipleValuesItem[];
}

export interface RoundChart extends Chart {
    content: SingleItem[];
}

export interface LineChart extends Chart {
    content: MultipleValuesItem[];
}