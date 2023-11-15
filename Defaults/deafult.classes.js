class string {
    constructor() {
        this.type = "string";
        return "string";
    }
}

class array {
    constructor() {
        this.type = "array";
        return [];
    }
}

class number {
    constructor() {
        this.type = "number";
        return 0;
    }
}

class object {
    constructor() {
        this.type = "object";
        return {};
    }
}

class boolean {
    constructor() {
        this.type = "boolean";
        return false;
    }
}

module.exports = {
    string,
    array,
    number,
    object,
    boolean,
}