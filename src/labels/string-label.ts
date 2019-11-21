import Label from "./label";

class StringLabel extends Label {

    identifier: 'string';
    values: string[];

    constructor(private inpValues: any[], {reverse}: {reverse?: boolean} = {}) {
        super();
        this.identifier = 'string';
        this.reverse = reverse || false;
        this.values = this.toLabel();
    }

    toLabel(): string[] {
        let values: string[] = [];
        for(let val of this.inpValues) {
            values.push(val.toString());
        }
        if(this.reverse) {
            return values.reverse();
        }
        return values;
    }

}

export default StringLabel;