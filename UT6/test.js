import { prng_alea } from 'esm-seedrandom';
import { randomProp, evalProp, truthTable } from './fase0.js';
import { randomTruthTable, fitness, randomSearch } from './fase1.js';
import { assessPopulation, initialPopulation, selection, evolutionStrategy, mutation } from './fase2.js';
import { Bicondicional, Conjuncion, Negacion, PropArgs, Variable } from './prop.js';
import { printHeader, describe, it, assertEquals, assertNotEquals, assertTrue, assertFalse } from './utils.js';


printHeader("Test: metodos de la clase Prop", "black", "bgWhite");

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


printHeader("Test: metodos de fase 0", "black", "bgWhite");

describe('randomProp() generado con 2 vars, minHeight 3, maxHeight 4 ', function () {
  var rng = prng_alea("test2");
  var vars2 = ['a', 'b'];
  let arbol = randomProp(rng, vars2, 4, 3);
  let nodos = arbol.flatten();
  let altura = 0;
  for (let nodo of nodos) { if (nodo[1] > altura) altura = nodo[1] };
  it('la altura del arbol generado debe ser 3 ', function () {
    assertEquals(altura, 3);
  });
});

describe('evalProp(): ((b ↔ a) ∨ ¬a) ∨ ((b ∨ a) → (b ↔ a))', function () {
  var rng = prng_alea("test2");
  var vars2 = ['a', 'b'];
  let arbol = randomProp(rng, vars2, 4, 3);
  it('la expresion debe retornar "true" CON a:false, b:false ', function () {
    assertEquals(evalProp(arbol, { 'a': false, 'b': false }), true);
  });
  it('la expresion debe retornar "true" CON a:false, b:true ', function () {
    assertEquals(evalProp(arbol, { 'a': false, 'b': true }), true);
  });
  it('la expresion debe retornar "true" CON a:true, b:true ', function () {
    assertEquals(evalProp(arbol, { 'a': true, 'b': true }), true);
  });
  it('la expresion debe retornar "false" CON a:true, b:false ', function () {
    assertEquals(evalProp(arbol, { 'a': true, 'b': false }), false);
  });
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
  let tablaVerdad = truthTable(proposicion, ['a']);
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

describe('truthTable: ((b ↔ a) ∨ ¬a) ∨ ((b ∨ a) → (b ↔ a)) ', function () {
  var rng = prng_alea("test2");
  var vars2 = ['a', 'b'];
  let arbol = randomProp(rng, vars2, 4, 3);
  let tablaVerdad = truthTable(arbol, vars2);
  it('la tabla de verdad contiene todas las permutaciones de 2 variables', function () {
    let expected = [
      { a: false, b: false },
      { a: false, b: true },
      { a: true, b: false },
      { a: true, b: true },
    ];
    expected.forEach((value, index) => {
      assertEquals(value, tablaVerdad[index][0], 'fila ' + index);
    });
  });
  it('la tabla de verdad contiene los resultados correctos', function () {
    let expected = [
      { a: false, b: false },
      { a: false, b: true },
      { a: true, b: false },
      { a: true, b: true },
    ];
    expected.forEach((value, index) => {
      assertEquals(evalProp(arbol, value), tablaVerdad[index][1], 'fila ' + index);
    });
  });
});

printHeader("Test: metodos de fase 1", "black", "bgWhite");

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

describe('fitness', () => {
  let proposicion = randomProp(prng_alea("sddsf"), ['a'], 4, 2);
  let tablaVerdad = truthTable(proposicion, ['a']);
  let fitnessRandom = fitness(proposicion, tablaVerdad);
  it('La tabla de verdad se adecúa a la proposición completamente', () => {
    assertEquals(1, fitnessRandom)
  })
});

describe('randomSearch()', () => {
  var rng = prng_alea("sddsf");
  var vars = ['a', 'b', 'c'];
  let randomTable = randomTruthTable(rng, vars);
  var maxHeight = 4;
  var minHeight = 3;
  let bestRandomProp_1 = randomSearch(rng, randomTable, 1, { vars, maxHeight, minHeight });
  let fitness_1 = fitness(bestRandomProp_1, randomTable);
  let bestRandomProp_2 = randomSearch(rng, randomTable, 2, { vars, maxHeight, minHeight });
  let fitness_2 = fitness(bestRandomProp_2, randomTable);
  let bestRandomProp_3 = randomSearch(rng, randomTable, 3, { vars, maxHeight, minHeight });
  let fitness_3 = fitness(bestRandomProp_3, randomTable);
  it('El fitness obtenido para bestRandomProp con tope 3 intentos debe ser >= que los tres fitness de las tres randomProps generadas en esos intentos', () => {
    assertTrue(fitness_3 >= fitness_1, "fitness_3 es >= a fitness_1");
    assertTrue(fitness_3 >= fitness_2, "fitness_3 es >= a fitness_2");
    assertTrue(fitness_3 >= fitness_3, "fitness_3 es >= a fitness_3");
  });
});

printHeader("Test: metodos de fase 2", "black", "bgWhite");

describe('initialPopulation', () => {
  var rng = prng_alea("sddsf");
  let vars = ['a', 'b', 'c'];
  let population = initialPopulation(rng, vars, 5);
  for (let prop of population) {
    let alturaMaxima = Math.max(...prop.flatten().map((p) => p[1]));
    it('las alturas de la initial population debe ser <= a la altura maxima (3)', () => {
      assertTrue(alturaMaxima <= vars.length);
    });
  };
});

describe('selection - 2 variables - Count mayor que población', () => {
  let proposicion = new Conjuncion(new Bicondicional(new Variable('b'), new Variable('a')), new Variable('b'));
  let tablaVerdad = truthTable(proposicion, ['a', 'b']);
  let pop = initialPopulation(prng_alea("sddsf"), ['a', 'b'], 1);
  let population = assessPopulation(pop, tablaVerdad);
  let sel = selection(prng_alea("sddsf"), population, 2);
  let expected = "Error: Count no puede ser más grande que la población.";
  it('No puede ejecutar dado que count es más grande que la población creada.', () => {
    assertEquals(sel.toString(), expected);
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

describe('assessPopulation', () => {
  it('Una variable (a)', () => {
    const rng = prng_alea("assess_test_1");
    const population = [
      randomProp(rng, ['a'], 3, 2),
      randomProp(rng, ['a'], 3, 2),
      randomProp(rng, ['a'], 3, 2),
      randomProp(rng, ['a'], 3, 2),
      randomProp(rng, ['a'], 3, 2),
    ];
    const truthTable = [
      [{ a: false }, true],
      [{ a: false }, false],
      [{ a: false }, true],
      [{ a: false }, true],
      [{ a: true }, false],
      [{ a: true }, true],
      [{ a: true }, true],
      [{ a: true }, true],
    ];
    const assessment = assessPopulation(population, truthTable);
    assertEquals(assessment, [
      [population[0], 0.5],
      [population[1], 0.5],
      [population[2], 0.75],
      [population[3], 0.75],
      [population[4], 0.75]
    ])
  });

  it('Dos variables (a,b)', () => {
    const rng = prng_alea("assess_test_2");
    const population = [
      randomProp(rng, ['a', 'b'], 3, 2),
      randomProp(rng, ['a', 'b'], 3, 2),
      randomProp(rng, ['a', 'b'], 3, 2),
      randomProp(rng, ['a', 'b'], 3, 2),
      randomProp(rng, ['a', 'b'], 3, 2),
    ];
    const truthTable = [
      [{ a: false, b: false }, true],
      [{ a: false, b: false }, false],
      [{ a: false, b: true }, true],
      [{ a: false, b: true }, true],
      [{ a: true, b: false }, false],
      [{ a: true, b: false }, true],
      [{ a: true, b: true }, true],
      [{ a: true, b: true }, true],
    ];
    const assessment = assessPopulation(population, truthTable);
    assertEquals(assessment, [
      [population[0], 0.5],
      [population[1], 0.5],
      [population[2], 0.75],
      [population[3], 0.5],
      [population[4], 0.75]
    ])
  });

  it('Tres variables (a,b,c)', () => {
    const rng = prng_alea("assess_test_3");
    const population = [
      randomProp(rng, ['a', 'b', 'c'], 3, 2),
      randomProp(rng, ['a', 'b', 'c'], 3, 2),
      randomProp(rng, ['a', 'b', 'c'], 3, 2),
      randomProp(rng, ['a', 'b', 'c'], 3, 2),
      randomProp(rng, ['a', 'b', 'c'], 3, 2),
    ];
    const truthTable = [
      [{ a: false, b: false }, true],
      [{ a: false, b: false, c: true }, false],
      [{ a: false, b: true, c: false }, true],
      [{ a: false, b: true, c: true }, true],
      [{ a: true, b: false, c: false }, false],
      [{ a: true, b: false, c: true }, true],
      [{ a: true, b: true, c: false }, true],
      [{ a: true, b: true, c: true }, true],
    ];
    const assessment = assessPopulation(population, truthTable);
    assertEquals(assessment, [
      [population[0], 0.5],
      [population[1], 0.5],
      [population[2], 0.25],
      [population[3], 0.75],
      [population[4], 0.5]
    ])
  });
});

describe('mutation', () => {
  it('Para un árbol de un nodo, retorna un árbol distinto', () => {
    const rng = prng_alea("mutation_test");
    const prop = new Variable('a');
    const mutated = mutation(rng, prop, new PropArgs(['a'], 1, 1));
    assertTrue(prop !== mutated);
  });
  it('Para un árbol de dos nodos, muta el primero', () => {
    const prop = new Negacion(new Variable('a'));
    const mutated = mutation(() => 0, prop, new PropArgs(['a'], 2, 1));
    assertTrue(prop !== mutated);
  });
  it('Para un árbol de dos nodos, muta el segundo', () => {
    const prop = new Negacion(new Variable('a'));
    const flatProp = prop.flatten();
    const mutated = mutation(() => 1, prop, new PropArgs(['b'], 1, 1));
    const flatMutated = mutated.flatten();
    assertTrue(flatProp[1] !== flatMutated[1]);
  });
  it('Para un árbol más grande, retorna un arbol con alguna modificación', () => {
    const rng = prng_alea("mutation_test");
    const prop = new Conjuncion(new Variable('a'), new Negacion(new Bicondicional(new Negacion(new Variable('b')), new Variable('c'))));
    const flatProp = prop.flatten();
    const mutated = mutation(rng, prop, new PropArgs(['a', 'b', 'c'], 4, 1));
    const flatMutated = mutated.flatten();
    const newNodes = flatMutated.filter(p => !flatProp.includes(p));
    assertTrue(newNodes.length > 0);
  });
  it('Modifica el mismo árbol en lugar de crear uno nuevo', () => {
    const prop = new Negacion(new Variable('a'));
    const mutated = mutation(() => 1, prop, new PropArgs(['b'], 1, 1));
    assertTrue(prop === mutated);
  });
});
