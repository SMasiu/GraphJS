abstract class Label {

    abstract identifier: 'percent' | 'value' | 'string' | 'flex';
    abstract toLabel(): any[];
    abstract values: any[];
    reverse: boolean;
    width: number;
    reversedValues: boolean = false;
    min = 0;
    max = 0;
    underZero = 0;
    flex: boolean = false;

    constructor () {
        this.reverse = false;
        this.width = 0;
    }

}

export default Label;