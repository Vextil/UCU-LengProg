export class Prop {

    evaluate(ctx) {
    }

}

export class PropArgs {

    /**
     * @param {String[]} vars 
     * @param {number} maxHeight 
     * @param {number} minHeight 
     */
    constructor(vars, maxHeight, minHeight) {
        this.vars = vars;
        this.maxHeight = maxHeight;
        this.minHeight = minHeight;
    }
}

/**
 * Clase representativa de una variable.
 */
export class Variable extends Prop {

    constructor(varName) {
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
export class Negacion extends Prop {

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
export class Conjuncion extends Prop {

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
export class Disjuncion extends Prop {

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    evaluate(ctx) {
        return this.left.evaluate(ctx) || this.right.evaluate(ctx);
    }

    toString() {
        return "(" + this.left.toString() + " ∨ " + this.right.toString() + ")";
    }

}

/**
 * Clase representativa de una proposición condicional.
 */
export class Condicional extends Prop {

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    evaluate(ctx) {
        return !this.left.evaluate(ctx) || this.right.evaluate(ctx);
    }

    toString() {
        return "(" + this.left.toString() + " → " + this.right.toString() + ")";
    }

}

/**
 * Clase representativa de una proposición bicondicional.
 */
export class Bicondicional extends Prop {

    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    evaluate(ctx) {
        return this.left.evaluate(ctx) && this.right.evaluate(ctx) || !this.left.evaluate(ctx) && !this.right.evaluate(ctx);
    }

    toString() {
        return "(" + this.left.toString() + " ↔ " + this.right.toString() + ")";
    }
}
