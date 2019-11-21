import Label from "./label";

class ValueLabel extends Label {

    values: number[];
    identifier: 'value';

    constructor(private min: number, private max: number, public step: number, {reverse}: {reverse?: boolean} = {}) {
        super();
        this.reverse = reverse || false;
        this.identifier = 'value';
        this.values = this.toLabel();
    }

    toLabel(): number[]{
        const {min, max, step} = this;
        let v: number[] = [];
        if((max - min) % step !== 0) {
            throw new Error('Steps count is not type of Int');
        }
        for(let i = min; i <= max; i += step) {
            v.push(i);
        }
        if(this.reverse) {
            v = v.reverse();
        }
        return v;
    }

}

export default ValueLabel;