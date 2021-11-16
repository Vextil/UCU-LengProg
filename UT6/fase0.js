import {
    Prop,
    Variable,
    Negacion,
    Conjuncion,
    Disjuncion,
    Condicional,
    Bicondicional
} from './prop.js'


/**
 * Calcula una Prop aleatoria [Genera]
 * @param {seedrandom} rng - Generador de números aleatorios cuya semilla se debe controlar
 * @param {list} vars - Lista de nombres de variables
 * @param {number} maxHeight - Altura máxima del árbol de expresión resultante
 * @param {number} maxHeight - Altura mínima del árbol de expresión resultante
 */
export function randomProp(rng, vars, maxHeight, minHeight) {
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

export function evalProp(prop, value) {
    return prop.evaluate(value);
}

export function truthTable(prop, vars) {
    // Creamos un array con todas las permutaciones de valores para las variables.
    let permutations = [];
    for (let i = 0; i < (1 << vars.length); i++) {
        let permutation = [];
        for (let j = vars.length - 1; j >= 0; j--) {
            permutation.push(Boolean(i & (1 << j)));
        }
        permutations.push(permutation);
    }

    // Ejecutamos la prop para cada permutación de valores.
    let result = [];
    for (let permutation of permutations) {
        let varsWithValues = Object.fromEntries(vars.map((v, i) => [v, permutation[i]]));
        let propResult = prop.evaluate(varsWithValues);
        result.push([permutation, propResult])
    }
    return result;
}




/**
 * Calcula una Prop aleatoria [Genera]
 * @param {seedrandom} rng - Generador de números aleatorios cuya semilla se debe controlar
 * @param {list} vars - Lista de nombres de variables
 * @param {number} maxHeight - Altura máxima del árbol de expresión resultante
 * @param {number} maxHeight - Altura mínima del árbol de expresión resultante
 */
function randomPropAna(rng, vars, maxHeight, minHeight) {
    let val = null;
    let der = null;
    let izq = null;
    var aleatorio = Math.round(rng() * vars.length());


    if (maxHeight == 1 && minHeight == 1) {
        val = new Variable();
        return val;
    } else {
        var num = rng() * 6;
        if (num < 1 && aleatorio <= 1) {
            izq = randomProp(rng, vars, maxHeight - 1, minHeight - 1);
        } else if (num < 1 && aleatorio > 1) {
            der = randomProp(rng, vars, maxHeight - 1, minHeight - 1);
        } else {
            // hijo izq : 
            izq = randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            // hijo der:
            der = randomProp(rng, vars, maxHeight - 1, minHeight - 1);
        }
        
        if (0 <= num && num < 1) {
            val = new Variable(vars[aleatorio]);
        } else if (num < 2 && aleatorio <= 1 ) {
            val = new Negacion(izq);
        } else if (num < 2 && aleatorio > 1 ) {
            val = new Negacion(der);
        } else if (num < 3) {
            val = new Conjuncion(izq,der);
        } else if (num < 4) {
            val = new Disjuncion(izq, der);
        } else if (num < 5) {
            val = new Condicional(izq, der);
        } else {
            val = new Bicondicional(izq,der);
        }
    }
    return val;
}