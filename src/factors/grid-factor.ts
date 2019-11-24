interface GridFactorOptions {
    colors?: ColorsInput;
    font?: FontsInput;
    background?: BackgroundInput;
    labelPadding?: number;
}

interface ColorsInput {
    primary?: string;
    secondary?: string;
}

interface FontsInput {
    color?: string;
    size?: number;
    family?: string;
}

interface Colors {
    primary: string;
    secondary: string;
}

interface BackgroundInput {
    image?: string;
    color?: string;
    opacity?: number;
}

interface Background {
    image: string;
    color: string;
    opacity: number;
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
    background: Background;

    constructor({colors, font, labelPadding, background}: GridFactorOptions = {}) {
        this.colors = {
            primary: colors && colors.primary || 'rgb(170, 170, 170)',
            secondary: colors && colors.secondary || 'rgb(240, 240, 240)',
        }
        this.font = {
            color: font && font.color || 'rgb(30, 30, 30)',
            size: font && font.size || 11,
            family: font && font.family || 'Sans-Serif'
        }
        this.labelPadding = labelPadding || 10;
        this.background = {
            color: background && background.color || 'transparent',
            image: background && background.image || '',
            opacity: background && background.opacity || .25
        }
    }

}

export const DEFAULT_GRID_FACTOR = new GridFactor();

export default GridFactor;