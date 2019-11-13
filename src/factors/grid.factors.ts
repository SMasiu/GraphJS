import { OptionsType } from "../types/grids.types";

export const USE_DEFAULT_GRID = (): OptionsType => ({
    colors: {
        primary: 'rgb(167,167,167)',
        secondary: 'rgb(204, 204, 204)'
    },
    margin: {
        top: 100,
        right: 100,
        bottom: 100,
        left: 100
    },
    font: {
        color: 'rgb(30, 30, 30)',
        size: 11,
        family: 'Sans-Serif'
    },
    labelPadding: 10
});