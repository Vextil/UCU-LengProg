const seedrandom = require('seedrandom');

class Prop {

    evaluate(ctx) {
    }
    
}

/**
 * Clase representativa de una variable.
 */
class Variable extends Prop {
    
    constructor(varName){
        super();
        this.varName = varName;
    }

    evaluate(ctx) {
        return ctx[this.varName];
    }

    toString() {
        return this.varName;
    }
    
}

/**
 * Clase representativa de una negación.
 */
class Negacion extends Prop {

    constructor(prop) {
        super();
        this.prop = prop;
    }

    evaluate(ctx) {
        return !this.prop.evaluate(ctx);
    }

    toString() {
        return "¬" + this.prop.toString();
    }
    
}

/**
 * Clase representativa de una conjunción.
 */
class Conjuncion extends Prop {

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    evaluate(ctx) { 
        return this.left.evaluate(ctx) && this.right.evaluate(ctx);
    }

    toString() {
        return "(" + this.left.toString() + " ∧ " + this.right.toString() + ")";
    }

}

/**
 * Clase representativa de una disjunción.
 */
class Disjuncion extends Prop {

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    evaluate(ctx) { 
        return this.left.evaluate(ctx) || this.right.evaluate(ctx);
    }

    toString(){
        return "(" + this.left.toString() + " ∨ " + this.right.toString() + ")";
    }

}

/**
 * Clase representativa de una proposición condicional.
 */
class Condicional extends Prop {

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    evaluate(ctx) { 
        return !this.left.evaluate(ctx) || this.right.evaluate(ctx);
    }

    toString(){
        return "(" + this.left.toString() + " → " + this.right.toString() + ")";
    }

}

/**
 * Clase representativa de una proposición bicondicional.
 */
class Bicondicional extends Prop {

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    evaluate(ctx) {
        return this.left.evaluate(ctx) && this.right.evaluate(ctx) ||  !this.left.evaluate(ctx) && !this.right.evaluate(ctx);
    }

    toString() {
        return "(" + this.left.toString() + " ↔ " + this.right.toString() + ")";
    }
}


function randomProp(rng, vars, maxHeight, minHeight) {
    let num = rng() * 6;
    if (minHeight > 1) {
        // Ignoramos la variable para que la altura del arbol siga creciendo.
        num = rng() * 5 + 1;
    }
    if (maxHeight == 1) {
        num = 0;
    }

    if (num < 1) {
        let varNum = Math.round(rng() * (vars.length - 1));
        return new Variable(vars[varNum]);
    } else if (num < 2) {
        return new Negacion(randomProp(rng, vars, maxHeight - 1, minHeight - 1));
    } else if (num < 3) {
        return new Conjuncion(randomProp(rng, vars, maxHeight - 1, minHeight - 1), randomProp(rng, vars, maxHeight - 1, minHeight - 1));
    } else if (num < 4) {
        return new Disjuncion(randomProp(rng, vars, maxHeight - 1, minHeight - 1), randomProp(rng, vars, maxHeight - 1, minHeight - 1));
    } else if (num < 5) {
        return new Condicional(randomProp(rng, vars, maxHeight - 1, minHeight - 1), randomProp(rng, vars, maxHeight - 1, minHeight - 1));
    } else {
        return new Bicondicional(randomProp(rng, vars, maxHeight - 1, minHeight - 1), randomProp(rng, vars, maxHeight - 1, minHeight - 1));
    }

}

function evalProp(prop, value) {
    return prop.evaluate(value);
}


// const Fase0 = require("./fase0");

var random = seedrandom("sddsf");

// var fase = new Fase0();
var arbol = randomProp(random, ['a', 'b', 'c'], 3, 5);
console.log(arbol.toString());
console.log(evalProp(arbol, {'a': true, 'b': false, 'c': true}))