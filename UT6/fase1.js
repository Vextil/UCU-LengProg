import { inputPermutations } from "./utils.js"

/**
 * Calcula una tabla de verdad aleatoria para poder probar la búsqueda.
 * @param {prng_alea} rng Generador de números aleatorios.
 * @param {String[]} vars Lista de nombres de variables.
 * @returns {array}
 */
export function randomTruthTable(rng, vars) {
    return inputPermutations(vars.length).map(p => [p, !!Math.round(rng())]);
}

/**
 * Calcula la proporción de casos en los que la evaluación de la proposición dada coincide con la tabla de verdad dada.
 * @param {Prop} prop Proposición Prop a evaluar.
 * @returns {number}
 */
export function fitness(prop, truthTable) {

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
