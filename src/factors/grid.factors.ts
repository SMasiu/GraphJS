import { OptionsType } from "../types/grids.types";

export const USE_DEFAULT_GRID = (): OptionsType => ({
    colors: {
        primary: 'rgb(167,167,167)',
        secondary: 'rgb(204, 204, 204)'
    },
    margin: {
        top: 25,
        right: 25,
        bottom: 25,
        left: 25
    }
});