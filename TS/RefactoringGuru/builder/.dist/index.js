"use strict";
class ConcreteBuilder1 {
    constructor() {
        this.reset();
    }
    reset() {
        this.product = new Product1();
    }
    producePartA() {
        this.product.parts.push('PartA1');
    }
    producePartB() {
        this.product.parts.push('PartB1');
    }
    producePartC() {
        this.product.parts.push('PartC1');
    }
    getProduct() {
        const result = this.product;
        this.reset();
        return result;
    }
}
class Product1 {
    constructor() {
        this.parts = [];
    }
    listParts() {
        console.log(`Product parts: ${this.parts.join(', ')}\n`);
    }
}
class Director {
    setBuilder(builder) {
        this.builder = builder;
    }
    buildMinimalViableProduct() {
        this.builder.producePartA();
    }
    buildFullFeaturedViableProduct() {
        this.builder.producePartA();
        this.builder.producePartB();
        this.builder.producePartC();
    }
}
function clientCodeBuilder(director) {
    const builder = new ConcreteBuilder1();
    director.setBuilder(builder);
    console.log('Standard basic product:');
    director.buildMinimalViableProduct();
    builder.getProduct().listParts();
    console.log('Standard full featured product:');
    director.buildFullFeaturedViableProduct();
    builder.getProduct().listParts();
    // Builder pattern can be used without Director clsss
    console.log('Custom product:');
    builder.producePartA();
    builder.producePartC();
    builder.getProduct().listParts();
}
const director = new Director();
clientCodeBuilder(director);
