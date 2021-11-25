import assert from 'assert';
import { prng_alea } from 'esm-seedrandom';
import { randomProp, evalProp, truthTable } from './fase0.js';
import { randomTruthTable, fitness, randomSearch } from './fase1.js';
import { assessPopulation, initialPopulation, selection, evolutionStrategy } from './fase2.js';
import { Conjuncion, Negacion, Variable } from './prop.js';
import { printHeader } from './utils.js';

var rng2 = prng_alea("test2");
var rng3 = prng_alea("test3");
var rng4 = prng_alea("test4");

var vars2 = ['a', 'b'];
var vars3 = ['a', 'b', 'c'];
var vars4 = ['a', 'b', 'c', 'd'];

var maxHeight = 4;
var minHeight = 3;
let arbol = randomProp(rng2, vars2, maxHeight, minHeight);
let nodos = arbol.flatten();
let altura = 0;
let tablaVerdad = truthTable(arbol, vars2);
describe(" ", function() {
    printHeader('[SEMILLA:test2] #VARS:2 - FASE 0');
    describe('randomProp() generado con 2 vars, minHeight 3, maxHeight 4 ', function() {
      for (let nodo of nodos) {if (nodo[1] > altura) altura = nodo[1]}; 
      it('la altura del arbol generado debe ser 3 ', function() {
          assert.equal(altura, 3);
      });
    });
    describe('evalProp(): ((b ↔ a) ∨ ¬a) ∨ ((b ∨ a) → (b ↔ a)) CON a:false, b:false', function() { 
      it('la expresion debe retornar "true" para la expresion dada ', function() {
          assert.equal(evalProp(arbol, { 'a': false, 'b': false}), true);
      });
    });
    describe('truthTable() ', function() { 
      it('la tabla de verdad debe tener 8 renglones/listas', function() {
        assert.equal( tablaVerdad.length, 4);
      });
    });
  }); 

// printHeader("truthTable");
// console.log(truthTable(arbol, vars2));