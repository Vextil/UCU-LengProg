import {
    Prop,
    Variable,
    Negacion,
    Conjuncion,
    Disjuncion,
    Condicional,
    Bicondicional,
    XOR
} from './prop.js'
import { varPermutations } from './utils.js';


/**
 * Calcula una Prop aleatoria [Genera]
 * @param {seedrandom} rng Generador de números aleatorios cuya semilla se debe controlar
 * @param {String[]} vars Lista de nombres de variables
 * @param {number} maxHeight Altura máxima del árbol de expresión resultante
 * @param {number} minHeight Altura mínima del árbol de expresión resultante
 * @returns {Prop}
 */
export function randomProp(rng, vars, maxHeight, minHeight) {
    let num = rng() * 7;
    if (minHeight > 1) {
        // Generamos un número random entre 1 y 6 para ignorar la Prop Variable.
        // Esto permite que la altura del arbol siga creciendo.
        num = rng() * 6 + 1;
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
    } else if (num < 6) {
        return new Bicondicional(randomProp(rng, vars, maxHeight - 1, minHeight - 1), randomProp(rng, vars, maxHeight - 1, minHeight - 1));
    } else {
        return new XOR(randomProp(rng, vars, maxHeight - 1, minHeight - 1), randomProp(rng, vars, maxHeight - 1, minHeight - 1));
    }

}

/**
 * Evalúa una Prop dado valores para sus variables.
 * @param {Prop} prop Una Prop a evaluar.
 * @param {array} value Mapa de nombres de variables a valores de verdad.
 * @returns {boolean}
 */
export function evalProp(prop, value) {
    return prop.evaluate(value);
}

/**
 * Genera la tabla de verdad de una Prop, i.e. una lista de pares (valores, resultado).
 * @param {Prop} prop Una Prop a evaluar.
 * @param {String[]} vars Lista de nombres de variables.
 * @returns {array}
 */
export function truthTable(prop, vars) {
    let permutations = varPermutations(vars);
    let result = [];
    for (let permutation of permutations) {
        let propResult = prop.evaluate(permutation);
        result.push([permutation, propResult])
    }
    return result;
}