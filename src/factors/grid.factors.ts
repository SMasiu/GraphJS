import { OptionsType } from "../types/grids.types";

export const USE_DEFAULT_GRID = (): OptionsType => ({
    colors: {
        primary: 'rgb(100, 100, 100)',
        secondary: 'rgb(240, 240, 240)'
    },
    margin: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    },
    font: {
        color: 'rgb(30, 30, 30)',
        size: 11,
        family: 'Sans-Serif'
    },
    labelPadding: 10
});