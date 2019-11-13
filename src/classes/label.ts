abstract class Label {

    abstract identifier: 'percent' | 'value' | 'string';
    abstract toLabel(): any[];
    abstract values: any[];
    reverse: boolean;

    constructor () {
        this.reverse = false;
    }

}

export default Label;