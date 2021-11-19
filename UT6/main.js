import { prng_alea } from 'esm-seedrandom';
import { randomProp, evalProp, truthTable } from './fase0.js';
import { randomTruthTable, fitness, randomSearch } from './fase1.js';
import { printHeader } from './utils.js';

var rng = prng_alea("sddsf");

var vars = ['a', 'b', 'c'];
var maxHeight = 4;
var minHeight = 3;

printHeader("randomProp ")
var arbol = randomProp(rng, vars, maxHeight, minHeight);
console.log(arbol.toString());

printHeader("evalProp");
console.log("Eval prop: ", evalProp(arbol, { 'a': true, 'b': false, 'c': true }))

printHeader("truthTable");
console.log(truthTable(arbol, vars));

printHeader("randomTruthTable & fitness");
var randomTable = randomTruthTable(rng, vars);
console.log("Random truth table: ", randomTable);
console.log("Fitness: ", fitness(arbol, randomTable));

printHeader("randomSearch ");
var bestRandomProp = randomSearch(rng, randomTable, 5, {vars, maxHeight, minHeight});
console.log("Best prop: ", bestRandomProp, fitness(bestRandomProp, randomTable));