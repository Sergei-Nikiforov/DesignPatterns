"use strict";
class Abstraction {
    constructor(implementation) {
        this.implementation = implementation;
    }
    ;
    operation() {
        const result = this.implementation.operationImplementation();
        return `Abstraction: Base operation with:\n${result}`;
    }
}
class ExtendedAbstraction extends Abstraction {
    operation() {
        const result = this.implementation.operationImplementation();
        return `ExtendedAbstraction: Extended operation with:\n${result}`;
    }
}
class ConcreteImplementationA {
    operationImplementation() {
        return `ConcreteImplementationA: Here\'s the result on the platform A.`;
    }
}
class ConcreteImplementationB {
    operationImplementation() {
        return `ConcreteImplementationB: Here\'s the result on the platform B.`;
    }
}
function clientCode(abstraction) {
    console.log(abstraction.operation());
}
let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);
console.log('');
implementation = new ConcreteImplementationB();
abstraction = new Abstraction(implementation);
clientCode(abstraction);
