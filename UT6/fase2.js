import { randomProp } from "./fase0.js";
import { fitness } from "./fase1.js";

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
    for(let i = 0; i < count; i++) {
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
export function selection(rng, population, count){
    // let totalFitness = population
    //     .map(([p, f]) => f)
    //     .reduce((a, b) => a + b, 0);
    // let probabilities = population.map(([p, f]) => f/totalFitness);
    
    let probabilityList = population.flatMap(([p, fitness], i) => new Array(Math.round(fitness * 10)).fill(i));
    let result = [];
    for (let i = 0; i < count ; i++) {
        let random = Math.round(rng() * probabilityList.length);
        result.push(population[probabilityList[random]][0]);
        probabilityList = probabilityList.filter(p => p !== probabilityList[random]);
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
    /**
     * 
     */
    let minH = propArgs.minHeight;
    let result = prop;
    
    let thisNodo = prop;
    let i = 0
    //busco un nodo
    while ( i < minH) {
        if (typeof(thisNodo) !== Negacion && typeof(thisNodo) !== Variable) {
            num = rng();
            if (num <= 0.5) {
                thisNodo = thisNodo.left;
            } else {
                thisNodo = thisNodo.right;
            }
        }
        i ++ ;
    }
    //hallo la altura del nodo a mutar
    let altura = alturaNodo(thisNodo); 
    let propRnm = randomProp(rng, propArgs.vars, altura, altura);
    


    
}

function alturaNodo(prop) {
    if (typeof(prop) !==  Negacion && typeof(prop) !== Variable) {
        return 1+(Math.max(alturaNodo(prop.left), alturaNodo(prop.right)));
    } else {
        return 1;
    }
}


/**
 * Ejecuta la evolución por mutación, retornando el mejor individuo.
 * @param {prng_alea} rng Generador de números aleatorios a usar.
 * @param {array} truthTable Tabla de verdad de referencia.
 * @param {number} steps Cantidad máxima de pasos a ejecutar
 * @param {number} count Cantidad de individuos de la población.
 * @param {PropArgs} propArgs Conjunto de argumentos a usar en la generación aleatoria de expresiones: vars, maxHeight y minHeight.
 * @returns {array}
 */
export function evolutionStrategy(rng, truthTable, steps, count, propArgs){
    
    let population = initialPopulation(rng, propArgs.vars, count);
    let populationAccessed = assessPopulation(population, truthTable);
    let best = populationAccessed.reduce((a, b) => a && a[1] > b[1] ? a : b);
    let bestFitness = best[1];
    let step = 0;
    while (bestFitness < 1 && step < steps){
        step++;
        let selected = selection(rng, population, count);
        let mutated = selected.map(s => mutation2(rng, s, propArgs));
        population = mutated;
        populationAccessed = assessPopulation(population, truthTable);
        best = populationAccessed.reduce((a, b) => a && a[1] > b[1] ? a : b);
        bestFitness = best[1];
        // let mutation = mutation2(rng, best, propArgs);
        // let mutationFitness = fitness(mutation);
        // if (mutationFitness > bestFitness) {
        //     best = mutation[0];
        //     bestFitness = mutationFitness;
        // }
    }

    return best;
}

export function mutation2 (rng, prop, propArgs){
    return randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
}