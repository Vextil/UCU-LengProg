import { prng_alea } from 'esm-seedrandom';
import { randomProp, evalProp, truthTable } from './fase0.js';
import { randomTruthTable, fitness, randomSearch } from './fase1.js';
import { assessPopulation, initialPopulation, selection, evolutionStrategy } from './fase2.js';
import { Bicondicional, Conjuncion, Negacion, Variable } from './prop.js';
import { printHeader, describe, it, assertEquals, assertNotEquals, assertTrue, assertFalse } from './utils.js';

var rng3 = prng_alea("test3");
var rng4 = prng_alea("test4");

var vars2 = ['a', 'b'];
var vars3 = ['a', 'b', 'c'];
var vars4 = ['a', 'b', 'c', 'd'];

var maxHeight = 4;
var minHeight = 3;
var rng = prng_alea("test2");
let arbol = randomProp(rng, vars2, maxHeight, minHeight);
let nodos = arbol.flatten();
let altura = 0;
let tablaVerdad = truthTable(arbol, vars2);
describe('randomProp() generado con 2 vars, minHeight 3, maxHeight 4 ', function () {
  for (let nodo of nodos) { if (nodo[1] > altura) altura = nodo[1] };
  it('la altura del arbol generado debe ser 3 ', function () {
    assertEquals(altura, 3);
  });
});
describe('evalProp(): ((b ↔ a) ∨ ¬a) ∨ ((b ∨ a) → (b ↔ a)) CON a:false, b:false', function () {
  it('la expresion debe retornar "true" para la expresion dada ', function () {
    assertEquals(evalProp(arbol, { 'a': false, 'b': false }), true);
  });
});
describe('truthTable() ', function () {
  it('la tabla de verdad debe tener 8 renglones/listas', function () {
    assertEquals(tablaVerdad.length, 4);
  });
});


describe('Prop.flatten', () => {
  it('retorna el array esperado', () => {
    const prop = new Conjuncion(new Variable('a'), new Negacion(new Variable('b')));
    const flat = prop.flatten();
    const expected = [
      [prop, 0],
      [prop.left, 1],
      [prop.right, 1],
      [prop.right.prop, 2]
    ]
    assertEquals(expected, flat);
  })
  it('retorna un array de un elemento', () => {
    const prop = new Variable('a');
    const flat = prop.flatten();
    const expected = [
      [prop, 0]
    ]
    assertEquals(expected, flat);
  })
});

describe('Prop.searchAndReplace', () => {
  let prop = new Conjuncion(new Variable('a'), new Negacion(new Variable('b')));
  const search = prop.right.prop;
  const replace = new Bicondicional(new Negacion(new Variable('c')), new Variable('d'));
  it('no contiene el bicondicional originalmente', () => {
    assertNotEquals(replace, prop.right.prop);
  })
  prop = prop.searchAndReplace(search, replace);
  const flatReplaced = prop.flatten();
  it('contiene el bicondicional', () => {
    assertEquals(replace, prop.right.prop);
  })
  it('contiene el subarbol completo', () => {
    const expected = new Conjuncion(new Variable('a'), new Negacion(new Bicondicional(new Negacion(new Variable('c')), new Variable('d'))));
    assertEquals(expected.flatten(), flatReplaced);
  })
});

describe('evalProp', () => {
  let proposicion = randomProp(prng_alea("sddsf"), ['a'], 4, 2);
  let verdadero = evalProp(proposicion, { 'a': false });
  it('La expresión dio como resultado Verdadero para a = true.', () => {
    assertEquals(true, verdadero);
  });
});

describe('truthTable', () => {
  let proposicion = randomProp(prng_alea("sddsf"), ['a'], 4, 2);
  tablaVerdad = truthTable(proposicion, ['a']);
  it('La tabla de la verdad contiene todas las permutaciones de 1 variable', () => {
    let expected = [
      { a: false },
      { a: true }
    ];
    expected.forEach((value, index) => {
      assertEquals(value, tablaVerdad[index][0], 'fila ' + index);
    });
  });
});

describe('fitness', () => {
  let proposicion = randomProp(prng_alea("sddsf"), ['a'], 4, 2);
  tablaVerdad = truthTable(proposicion, ['a']);
  let fitnessRandom = fitness(proposicion, tablaVerdad);
  it('La tabla de verdad se adecúa a la proposición completamente', () => {
    assertEquals(1, fitnessRandom)
  })
});

describe('randomTruthTable - 1 variable', () => {
  let tablaVerdadRandom = randomTruthTable(prng_alea("sddsf"), ['a']);
  it('La tabla de la verdad contiene todas las permutaciones de 1 variable', () => {
    let expected = [
      { a: false },
      { a: true }
    ];
    expected.forEach((value, index) => {
      assertEquals(value, tablaVerdadRandom[index][0], 'fila ' + index);
    });
  });
});

describe('randomTruthTable - 2 variables', () => {
  let tablaVerdadRandom = randomTruthTable(prng_alea("sddsf"), ['a', 'b']);
  it('La tabla de la verdad contiene todas las permutaciones de 2 variables', () => {
    let expected = [
      { a: false, b: false },
      { a: false, b: true },
      { a: true, b: false },
      { a: true, b: true }
    ];
    expected.forEach((value, index) => {
      assertEquals(value, tablaVerdadRandom[index][0], 'fila ' + index);
    });
  });
});

describe('selection - 2 variables - Count mayor que población', () => {
  let proposicion = new Conjuncion(new Bicondicional(new Variable('b'), new Variable('a')), new Variable('b'));
  let tablaVerdad = truthTable(proposicion, ['a', 'b']);
  let pop = initialPopulation(prng_alea("sddsf"), ['a', 'b'], 1);
  let population = assessPopulation(pop, tablaVerdad);
  let sel = selection(prng_alea("sddsf"), population, 2);
  let expected = "Error: Count no puede ser más grande que la población.";
  it('No puede ejecutar dado que count es más grande que la población creada.', () => {
    assertException(sel, expected);
  });
});

describe('selection - 2 variables - 1 Prop devuelta', () => {
  let proposicion = new Conjuncion(new Bicondicional(new Variable('b'), new Variable('a')), new Variable('b'));
  let tablaVerdad = truthTable(proposicion, ['a', 'b']);
  let pop = initialPopulation(prng_alea("sddsf"), ['a', 'b'], 1);
  let population = assessPopulation(pop, tablaVerdad);
  let sel = selection(prng_alea("sddsf"), population, 1);
  let expected = proposicion.toString();
  it('Selecciona una proposición aleatoria', () => {
    assertEquals(expected, sel.toString());
  });
});