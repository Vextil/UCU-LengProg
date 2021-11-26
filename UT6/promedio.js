import { prng_alea } from 'esm-seedrandom';
import { randomProp, evalProp, truthTable } from './fase0.js';
import { randomTruthTable, fitness, randomSearch } from './fase1.js';
import { assessPopulation, initialPopulation, selection, evolutionStrategy } from './fase2.js';
import { Conjuncion, Negacion, PropArgs, Variable } from './prop.js';
import { printHeader } from './utils.js';

var rng = prng_alea("promedio1");
var args1 = new PropArgs(['a'], 4, 3);
var args2 = new PropArgs(['a','b'], 4, 3);


export function pruebaRandomSearch(rng, propArgs) {
    let rTruthTable = randomTruthTable(rng, propArgs.vars);
    let fitness_ = 0
    let count = 0 
    while (fitness_ < 1) {
        let prop = randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight)
        fitness_ = fitness(prop, rTruthTable);
        count++
    }
    return count;
}

export function pruebaEvolutionStrategyh(rng, propArgs) {
    let rTruthTable = randomTruthTable(rng, propArgs.vars);
    let fitness_ = 0
    let poblacion = 100
    let steps = 1
    while (fitness_ < 1) {
        let best = evolutionStrategy(rng, rTruthTable, steps, poblacion, propArgs)
        fitness_ = best[1]
        steps++
    }
    return steps;
}

printHeader("Promedio randomSearch - 1 variable ")
let veces = 100;
let total = 0;
for (let i = 0; i < veces ; i++) { 
    total += pruebaRandomSearch(rng, args1); 
}
console.log(total/veces);

printHeader("Promedio randomSearch - 2 variables ")
veces = 10000;
total = 0;
for (let i = 0; i < veces ; i++) { 
    total += pruebaRandomSearch(rng, args2); 
}
console.log(total/veces);


printHeader("Promedio evolutionStrategyh - 1 variable ")
veces = 100;
total = 0;
for (let i = 0; i < veces ; i++) { 
    total += pruebaEvolutionStrategyh(rng, args1); 
}
console.log(total/veces);

printHeader("Promedio evolutionStrategyh - 2 variables ")
veces = 10000;
total = 0;
for (let i = 0; i < veces ; i++) { 
    total += pruebaEvolutionStrategyh(rng, args2); 
}
console.log(total/veces);


