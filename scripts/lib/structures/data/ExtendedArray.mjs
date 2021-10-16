
export class ExtendedArray extends Array {
    constructor(...items) {
        super();

        this.push(...items);
    }

    remove(item) {
        const itemIndex = this.findIndex(i => i === item);
        if(itemIndex) this.splice(itemIndex, 1);
    }

    removeAt(index) {
        this.splice(index, 1);
    }
}



// UNIT TEST
function test() {
    const arr = new ExtendedArray(1, 2, 3, 4);
    console.log(arr);
    arr.remove(2);
    console.log(arr);
}

// test();