import { prng_alea } from 'esm-seedrandom';
import { randomProp, evalProp, truthTable } from './fase0.js';
import { randomTruthTable, fitness, randomSearch } from './fase1.js';

var rng = prng_alea("sddsf");

var arbol = randomProp(rng, ['a', 'b', 'c'], 3, 5);
console.log("Random prop: ", arbol.toString());
console.log("Eval prop: ", evalProp(arbol, { 'a': true, 'b': false, 'c': true }))
console.log("Truth table: ", truthTable(arbol, ['a', 'b', 'c']));

var randomTable = randomTruthTable(rng, ['a', 'b', 'c']);
console.log("Random truth table: ", randomTable);
console.log("Fitness: ", fitness(arbol, randomTable));