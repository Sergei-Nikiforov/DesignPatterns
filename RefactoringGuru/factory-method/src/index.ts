enum CreatorEnum {
    ConcreteCreator1 = 'ConcreteCreator1',
    ConcreteCreator2 = 'ConcreteCreator2',
}

interface Product {
    operation(): string;
}

type CreatorType = {
    [name: string]: new () => Creator;
}

abstract class Creator {
    public abstract factoryMethod(): Product;

    public someOperation(): string {
        const product = this.factoryMethod();
        console.log('this_creator!!', this);
        return `Creator: The same creator's code has just worked with ${ product.operation() }`;
    }
}

class ConcreteCreator1 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

const creators: CreatorType = {
    [CreatorEnum.ConcreteCreator1]: ConcreteCreator1,
    [CreatorEnum.ConcreteCreator2]: ConcreteCreator2,
}

class ConcreteProduct1 implements Product {
    public operation(): string {
        console.log('this_product!!', this);
        return `{Result of the ConcreteProduct1}`;
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return `{Result of the ConcreteProduct2}`
    }
}

function clientCode(creator: Creator) {
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
}

function createCreator(creatorName: string): Creator {
    if (!creatorExists(creatorName)) {
        throw new Error(`Creator '${creatorName}' does not exist!`);
    }

    return new creators[creatorName]();
}

function creatorExists(creatorName: string): boolean {
    return creatorName in creators;
}

console.log('App: Launched with the ConcreteCreator1.');
clientCode(createCreator('ConcreteCreator1'));
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(createCreator('ConcreteCreator2'));