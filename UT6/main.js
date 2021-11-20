import { prng_alea } from 'esm-seedrandom';
import { randomProp, evalProp, truthTable } from './fase0.js';
import { randomTruthTable, fitness, randomSearch } from './fase1.js';
import { assessPopulation, initialPopulation, selection, evolutionStrategy } from './fase2.js';
import { printHeader } from './utils.js';

var rng = prng_alea("sddsf");

var vars = ['a', 'b', 'c'];
var maxHeight = 4;
var minHeight = 3;

printHeader("randomProp ")
let arbol = randomProp(rng, vars, maxHeight, minHeight);
console.log(arbol.toString());

printHeader("evalProp");
console.log("Eval prop: ", evalProp(arbol, { 'a': true, 'b': false, 'c': true }))

printHeader("truthTable");
console.log(truthTable(arbol, vars));

printHeader("randomTruthTable & fitness");
let randomTable = randomTruthTable(rng, vars);
console.log("Random truth table: ", randomTable);
console.log("Fitness: ", fitness(arbol, randomTable));

printHeader("randomSearch");
let bestRandomProp = randomSearch(rng, randomTable, 5, {vars, maxHeight, minHeight});
console.log("Best prop: ", bestRandomProp, fitness(bestRandomProp, randomTable));

printHeader("initialPopulation");
let population = initialPopulation(rng, ['a', 'b', 'c'], 10);
console.log(population);

printHeader("assessPopulation");
let assessedPopulation = assessPopulation(population, randomTable);
console.log(assessedPopulation);

printHeader("selection");
let selectedPopulation = selection(rng, assessedPopulation, 4);
console.log(selectedPopulation);

printHeader("evolutionStrategy");
let evolution = evolutionStrategy(rng, randomTable, 100, 100, {vars, maxHeight, minHeight});
console.log(evolution);