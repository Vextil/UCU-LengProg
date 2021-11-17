import { prng_alea } from 'esm-seedrandom';
import { randomProp, evalProp, truthTable } from './fase0.js';
import { randomTruthTable, fitness, randomSearch } from './fase1.js';

var rng = prng_alea("sddsf");

var arbol = randomProp(rng, ['a', 'b', 'c'], 3, 5);
console.log(arbol.toString());
console.log(evalProp(arbol, { 'a': true, 'b': false, 'c': true }))
console.log(truthTable(arbol, ['a', 'b', 'c']));

console.log("Random: ", randomTruthTable(rng, ['a', 'b', 'c']));