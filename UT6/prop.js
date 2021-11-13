class Prop {

    evaluate(ctx) {

    }
    
}

/**
 * Clase representativa de una variable.
 */
class Variable extends Prop {
    
    constructor(varName){
        this.varName = varName;
    }

    evaluate(ctx) {
        return ctx[varName];
    }

    toString() {
        return "(" + varName + ")";
    }
    
}

/**
 * Clase representativa de una negación.
 */
class Negacion extends Prop {

    constructor(prop) {
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
        this.left = left;
        this.right = right;
    }

    evaluate(ctx) { 
        return this.left.evaluate(ctx) && this.right.evaluate(ctx);
    }

    toString() {
        return "(" + this.left.toString() + " && " + this.right.toString() + ")";
    }

}

/**
 * Clase representativa de una disjunción.
 */
class Disjuncion extends Prop {

    constructor(left, right) {
        this.left = left;
        this.right = right;
    }

    evaluate(ctx) { 
        return this.left.evaluate(ctx) || this.right.evaluate(ctx);
    }

    toString(){
        return "(" + this.left.toString() + " | " + this.right.toString() + ")";
    }

}

/**
 * Clase representativa de una proposición condicional.
 */
class Condicional extends Prop {

    constructor(left, right) {
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
