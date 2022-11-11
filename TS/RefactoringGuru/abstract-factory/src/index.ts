enum FactoryEnum {
    ConcreteFactory1 = 'ConcreteFactory1',
    ConcreteFactory2 = 'ConcreteFactory2',
}

type FactoryType = {
    [name: string]: new () => AbstractFactory;
}

interface AbstractFactory {
    createProductA(): AbstractProductA;
    createProductB(): AbstractProductB;
}

interface AbstractProductA {
    usefulFunctionA(): string;
}

interface AbstractProductB {
    usefulFunctionB(): string;
    anotherUsefulFinctionB(collaborator: AbstractProductA): string;
}

class ConcreteFactory1 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA1();
    }

    public createProductB(): AbstractProductB {
        return new ConcreteProductB1();
    }
}

class ConcreteFactory2 implements AbstractFactory {
    public createProductA(): AbstractProductA {
        return new ConcreteProductA2();
    }

    public createProductB(): AbstractProductB {
        return new ConcreteProductB2();
    }
}

const factories: FactoryType = {
    [FactoryEnum.ConcreteFactory1]: ConcreteFactory1,
    [FactoryEnum.ConcreteFactory2]: ConcreteFactory2,
}

class ConcreteProductA1 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A1.';
    }
}

class ConcreteProductA2 implements AbstractProductA {
    public usefulFunctionA(): string {
        return 'The result of the product A2.';
    }
}

class ConcreteProductB1 implements AbstractProductB {
    public usefulFunctionB(): string {
        return 'The result of the product B1.';
    }

    public anotherUsefulFinctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the B1 collaborating with the (${result})`;
    }
}

class ConcreteProductB2 implements AbstractProductB {
    public usefulFunctionB(): string {
        return 'The result of the product B2.';
    }

    public anotherUsefulFinctionB(collaborator: AbstractProductA): string {
        const result = collaborator.usefulFunctionA();
        return `The result of the B2 collaborating with the (${result})`
    }
}

function clientCode(factory: AbstractFactory) {
    const productA = factory.createProductA();
    const productB = factory.createProductB();

    console.log(productB.usefulFunctionB());
    console.log(productB.anotherUsefulFinctionB(productA));
}

function factoryExists(factoryName: string): boolean {
    return factoryName in factories;
}

function createFactory(factoryName: string): AbstractFactory {
    if (!factoryExists(factoryName)) {
        throw new Error(`Factory '${factoryName}' does not exist!`);
    }

    return new factories[factoryName]();
}

console.log('Client: Testing client code with the first factory type...');
clientCode(createFactory('ConcreteFactory1'));

console.log('');

console.log('Client: Testing the same client code with the second factory type...');
clientCode(createFactory('ConcreteFactory2'));