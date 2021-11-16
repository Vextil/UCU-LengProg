import { prng_alea } from 'esm-seedrandom';
import { randomProp, evalProp, truthTable } from './fase0.js';

var random = prng_alea("sddsf");

var arbol = randomProp(random, ['a', 'b', 'c'], 3, 5);
console.log(arbol.toString());
console.log(evalProp(arbol, { 'a': true, 'b': false, 'c': true }))
console.log(truthTable(arbol, ['a', 'b', 'c']));