import { varPermutations } from "./utils.js"
import { Prop } from "./prop.js";

/**
 * Calcula una tabla de verdad aleatoria para poder probar la búsqueda.
 * @param {prng_alea} rng Generador de números aleatorios.
 * @param {String[]} vars Lista de nombres de variables.
 * @returns {array}
 */
export function randomTruthTable(rng, vars) {
    return varPermutations(vars).map(p => [p, !!Math.round(rng())]);
}

/**
 * Calcula la proporción de casos en los que la evaluación de la proposición dada coincide con la tabla de verdad dada.
 * @param {Prop} prop Proposición Prop a evaluar.
 * @param {array} truthTable Lista de pares (valores, resultado).
 * @returns {number}
 */
export function fitness(prop, truthTable) {
    return truthTable.filter(t => prop.evaluate(t[0]) === t[1]).length / truthTable.length;
}

/**
 * Ejecuta la búsqueda aleatoria, retornando la primera expresión encontrada con un fitness de 1.
 * @param {seedrandom} rng Generador de números aleatorios.
 * @param {array} truthTable Lista de pares (valores, resultado).
 * @param {number} count Cantidad de expresiones aleatorias a generar y probar.
 * @param {number} maxHeight Altura máxima del árbol de expresión resultante
 * @param {object} propArgs es el conjunto de argumentos a usar en la generación aleatoria de expresiones: vars, maxHeight y minHeight.
 * @returns {Prop}
 */
export function randomSearch(rng, truthTable, count, propArgs) {

}
