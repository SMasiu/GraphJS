import { ChartFactor } from '../factors/chart-factor'
import { StringLabel } from '../labels/string-label'
import { Grid } from '../grids/grid'

export interface ChartType {
  opacity: number
  lineWidth: number
  content: any[]
  parent: Grid | null
  itemSize: number
  ctx: CanvasRenderingContext2D | null
  disable: boolean
  dotRadius: number
  dotBorder: boolean
  identifier: string
  correspondTo: string
  maxValue: number | number[]
  minValue: number | number[]
}

export interface ValueColorType {
  color: string | string[] | any
  values: number
  id?: string | number
  name?: string
}

export interface ValueColorUpdateType {
  color?: string
  id?: string | number
  values?: number
  name?: string
}

export interface GroupItemType {
  type: string
  color: string | string[] | any
  values: number | number[]
  margin?: string
  direction?: string
  id?: string | number
  name?: string | string[]
}

export interface GroupItemUpdateType {
  type?: string
  color?: string | string[]
  values?: number | number[]
  margin?: string
  direction?: string
  id?: string | number
  name?: string | string[]
}

export interface MultipleValuesItem {
  color: string | string[] | any
  values: any[]
  id?: string | number
  name?: string
}

export interface MultipleValuesItemUpdate {
  color?: string
  values?: any[]
  name?: string
  id?: string | number
}

export interface ColumnChartType extends ChartType {
  content: GroupItemType[]
}

export interface RowChartType extends ChartType {
  content: GroupItemType[]
}

export interface PolygonCharType extends ChartType {
  content: MultipleValuesItem[]
}

export interface LineCharType extends ChartType {
  content: MultipleValuesItem[]
}

export interface RoundChartType extends ChartType {
  content: ValueColorType[]
}

export interface SameDirectionRoundChartType {
  content: ValueColorType[]
}

export interface RangeValueType {
  color: string | string[] | any
  values: number[] | number[][] | any
  under?: boolean
  name?: string
}

export interface RangeChartType extends ChartType {
  content: RangeValueType[]
}

export interface CoordinateValuesType {
  color: string | string[] | any
  values: number[]
  radius: number
  id?: string | number
  name?: string
}

export interface CoordinateValuesUpdateType {
  color?: string
  values?: number[]
  radius?: number
  id?: string | number
  name?: string
}

export interface BubbleChartType {
  content: CoordinateValuesType[]
}

export interface BubbleChartInputType {
  values?: CoordinateValuesType[]
  factor?: ChartFactor
}

export interface ChartOptions {
  lineWidth: number
  opacity: number
  itemSize: number
}

export interface SameDirectionRoundChartInputType {
  values?: ValueColorType[]
  centerValue?: any
  labels?: StringLabel
  canvas?: HTMLCanvasElement
  itemMargin?: number
  factor?: ChartFactor
}

export interface RoundChartInputType {
  values?: ValueColorType[]
  labels?: StringLabel
  centerValue?: any
  changingSize?: boolean
  blankCenter?: boolean
  itemsMargin?: number
  canvas?: HTMLCanvasElement
  centerRadius?: number
  changingStepSize?: number
  factor?: ChartFactor
}

export interface RangeChartInputType {
  values?: RangeValueType[]
  factor?: ChartFactor
}

export interface ChartInput {
  factor?: ChartFactor
}

export interface LineChartInputType extends ChartInput {
  values?: MultipleValuesItem[]
  fill?: boolean
  dots?: boolean
  dashLine?: number[]
  smooth?: boolean
  correspondTo?: string
  moveToCenter?: boolean
}

export interface PolygonChartInputType extends ChartInput {
  values?: MultipleValuesItem[]
  fill?: boolean
  dots?: boolean
}

export interface ColumnChartInputType {
  values?: GroupItemType[]
  correspondTo?: string
  correspondToSecondary?: string
  factor?: ChartFactor
}

export interface RowChartInputType {
  values?: GroupItemType[]
  correspondTo?: string
  correspondToSecondary?: string
  factor?: ChartFactor
}
