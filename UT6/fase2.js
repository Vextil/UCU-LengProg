import { randomProp } from "./fase0.js";
import { fitness } from "./fase1.js";
import { PropArgs, Prop } from "./prop.js";

/**
 * Calcula los individuos con los cuales inicia algoritmo evolutivo.
 * @param {prng_alea} rng Generador de números aleatorios.
 * @param {String[]} vars Lista de nombres de variables.
 * @param {number} count Cantidad de expresiones aleatorias a generar y probar.
 * @returns {array}
 */
export function initialPopulation(rng, vars, count) {
    let result = [];
    let minHeight = 1;
    let maxHeight = vars.length + 1;
    for (let i = 0; i < count; i++) {
        result.push(randomProp(rng, vars, maxHeight, minHeight))
    }
    return result;
}

/**
 * Agrega la aptitud a cada individuo en la población.
 * @param {Prop[]} population Población del algoritmo evolutivo.
 * @param {array} truthTable Lista de pares (valores, resultado).
 * @return {array} Población con la aptitud calculada.
 */
export function assessPopulation(population, truthTable) {
    return population.map(p => [p, fitness(p, truthTable)]);
}

/**
 * Selecciona individuos de la población aleatoriamente, con una
 * probabilidad proporcional a la aptitud del individuo.
 * @param {prng_alea} rng Generador de números aleatorios a usar.
 * @param {array} population Población del algoritmo evolutivo.
 * @param {number} count Cantidad de individuos a seleccionar.
 * @returns {array}
 */
export function selection(rng, population, count) {
    if (count > population.length) {
        return Error('Count no puede ser más grande que la población.');
    }
    let totalFitness = population.reduce((a, [p, f]) => a + f, 0);
    let result = [];
    for (let i = 0; i < count; i++) {
        let randomFitness = Math.trunc(rng() * totalFitness);
        let accumulatedFitness = 0;
        for (let [index, [p, f]] of population.entries()) {
            accumulatedFitness += f;
            if (accumulatedFitness >= randomFitness) {
                result.push(p);
                population.splice(index, 1);
                totalFitness -= f;
                break;
            }
        }
    }
    if (result.length < count) {
        return Error('Esto no debería pasar, el método selection quedó roto... tenemos que aprender a programar.');
    }
    return result;
}

/**
 * Calcula una nueva expresión como modificación por una expresión dada. 
 * Se toma un nodo del árbol de expresión al azar y se lo reemplaza por un subárbol generado al azar.
 * @param {prng_alea} rng Generador de números aleatorios a usar.
 * @param {Prop} prop  Expresión Prop a mutar.
 * @param {PropArgs} propArgs Conjunto de argumentos a usar en la generación aleatoria de expresiones
 * @returns {array}
 */
 export function mutation(rng, prop, propArgs) {
    let nodes = prop.flatten();
    let randomIndex = Math.round(rng() * (nodes.length - 1));
    let [search, height] = nodes[randomIndex];
    let maxHeight = propArgs.maxHeight - height;
    let minHeight = Math.min(0, propArgs.minHeight - height);
    let replace = randomProp(rng, propArgs.vars, maxHeight, minHeight);
    return prop.searchAndReplace(search, replace);
}

/**
 * Ejecuta la evolución por mutación, retornando el mejor individuo.
 * @param {prng_alea} rng Generador de números aleatorios a usar.
 * @param {array} truthTable Tabla de verdad de referencia.
 * @param {number} steps Cantidad máxima de pasos a ejecutar.
 * @param {number} count Cantidad de individuos de la población.
 * @param {PropArgs} propArgs Conjunto de argumentos a usar en la generación aleatoria de expresiones: vars, maxHeight y minHeight.
 * @returns {array}
 */
export function evolutionStrategy(rng, truthTable, steps, count, propArgs) {

    let population = initialPopulation(rng, propArgs.vars, count);
    let populationAssessed = assessPopulation(population, truthTable);
    let best = populationAssessed.reduce((a, b) => a && a[1] > b[1] ? a : b);
    let bestFitness = best[1];
    let step = 0;
    while (bestFitness < 1 && step < steps) {
        step++;
        let selected = selection(rng, populationAssessed, count);
        population = selected.map(s => mutation(rng, s, propArgs));
        populationAssessed = assessPopulation(population, truthTable);
        best = populationAssessed.reduce((a, b) => a && a[1] > b[1] ? a : b);
        bestFitness = best[1];
    }

    return best;
}

