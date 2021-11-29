import { prng_alea } from 'esm-seedrandom';
import { randomProp, evalProp, truthTable } from './fase0.js';
import { randomTruthTable, fitness, randomSearch } from './fase1.js';
import { assessPopulation, initialPopulation, selection, evolutionStrategy } from './fase2.js';
import { Conjuncion, Negacion, PropArgs, Variable } from './prop.js';
import { printHeader } from './utils.js';

var rng = prng_alea("promedio1");
var args1 = new PropArgs(['a'], 4, 3);
var args2 = new PropArgs(['a', 'b'], 4, 3);
var args3 = new PropArgs(['a', 'b', 'c'], 4, 3);


function pruebaRandomSearch(rng, propArgs) {
    let rTruthTable = randomTruthTable(rng, propArgs.vars);
    let fitness_ = 0
    let prop = randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight)
    fitness_ = fitness(prop, rTruthTable);
    if (fitness_ === 1) {
        return 1;
    }
    return 0;
}

function pruebaEvolutionStrategy(rng, propArgs) {
    let rTruthTable = randomTruthTable(rng, propArgs.vars);
    let poblacion = 100;
    let steps = 1;
    let best = evolutionStrategy(rng, rTruthTable, steps, poblacion, propArgs)
    if (best[1] === 1) {
        return 1;
    }
    return 0;
}

printHeader("Promedio randomSearch - 1 variable ")
let veces = 1000;
let total = 0;
for (let i = 0; i < veces; i++) {
    total += pruebaRandomSearch(rng, args1);
}
console.log(100 / veces * total + "%", total + "/" + veces);

printHeader("Promedio randomSearch - 2 variables ")
veces = 10000;
total = 0;
for (let i = 0; i < veces; i++) {
    total += pruebaRandomSearch(rng, args2);
}
console.log(100 / veces * total + "%", total + "/" + veces);

printHeader("Promedio evolutionStrategy - 1 variable ")
veces = 100;
total = 0;
for (let i = 0; i < veces; i++) {
    total += pruebaEvolutionStrategy(rng, args1);
}
console.log(100 / veces * total + "%", total + "/" + veces);

printHeader("Promedio evolutionStrategy - 2 variables ")
veces = 10000;
total = 0;
for (let i = 0; i < veces; i++) {
    total += pruebaEvolutionStrategy(rng, args2);
}
console.log(100 / veces * total + "%", total + "/" + veces);


printHeader("Promedio evolutionStrategy - 3 variables ")
veces = 100;
total = 0;
for (let i = 0; i < veces; i++) {
    total += pruebaEvolutionStrategy(rng, args3);
}
console.log(100 / veces * total + "%", total + "/" + veces);
