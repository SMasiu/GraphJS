interface GridFactorOptions {
    colors?: Colors;
    font?: Fonts;
    labelPadding?: number;
}

interface Colors {
    primary: string;
    secondary: string;
}

interface Fonts {
    color: string;
    size: number;
    family: string;
}

class GridFactor {

    colors: Colors;
    font: Fonts;
    labelPadding: number;

    constructor({colors, font, labelPadding}: GridFactorOptions = {}) {
        this.colors = colors || {
            primary: 'rgb(170, 170, 170)',
            secondary: 'rgb(240, 240, 240)'
        }
        this.font = font || {
            color: 'rgb(30, 30, 30)',
            size: 11,
            family: 'Sans-Serif'
        }
        this.labelPadding = labelPadding || 10;
    }

}

export const DEFAULT_GRID_FACTOR = new GridFactor();

export default GridFactor;