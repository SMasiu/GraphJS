abstract class Label {

    abstract identifier: 'percent' | 'value' | 'string';
    abstract toLabel(): any[];
    abstract values: any[];
    reverse: boolean;
    width: number;

    constructor () {
        this.reverse = false;
        this.width = 0;
    }

}

export default Label;