export class Prop {

    /**
     * Retorna cada nodo del árbol y su altura en una lista. 
     * Ejemplo: 
     * Para (a ∧ ¬b) retorna la siguiente lista:
     * [
     *     [Conjuncion, 0],
     *     [Variable, 1],
     *     [Negacion, 1],
     *     [Variable, 2]
     * ]
     * @param {number} height La altura del nodo actual, utilizada para calcular la altura de los hijos.
     * @returns La lista de nodos con sus alturas.
     */
    flatten(height = 0) {
        let result = [[this, height]];
        if (this.left) {
            let leftChildren = this.left.flatten(height + 1);
            result = result.concat(leftChildren);
        }
        if (this.right) {
            let rightChildren = this.right.flatten(height + 1);
            result = result.concat(rightChildren);
        }
        if (this.prop) {
            let child = this.prop.flatten(height + 1);
            result = result.concat(child);
        }
        return result;
    }

    /**
     * Reeplaza un subárbol por otro reconstruyendo el árbol recursivamente.
     * (Gracias programación funcional por la idea).
     * @param {Prop} search La raiz del subarbol a buscar para ser reemplazado.
     * @param {Prop} replace La raiz del nuevo subarbol que tomará su lugar.
     * @returns El mismo árbol [search] reemplazado por [replace].
     */
    searchAndReplace(search, replace) {
        if (this === search) {
            return replace;
        }
        if (this.left) {
            this.left = this.left.searchAndReplace(search, replace);
        }
        if (this.right) {
            this.right = this.right.searchAndReplace(search, replace);
        }
        if (this.prop) {
            this.prop = this.prop.searchAndReplace(search, replace);
        }
        return this;
    }

    /**
     * Evalúa la expresión con los valores del contexto para cada variable.
     * @param {object} ctx Objeto con los nombres y valores de cada variable.
     * @returns {boolean}
     */
    evaluate(ctx) {
    }

    /**
     * Retorna la representación matemática de la proposición.
     * @returns {string}
     */
    toString() {
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
