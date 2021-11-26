import { prng_alea } from 'esm-seedrandom';
import { randomProp, evalProp, truthTable } from './fase0.js';
import { randomTruthTable, fitness, randomSearch } from './fase1.js';
import { assessPopulation, initialPopulation, selection, evolutionStrategy } from './fase2.js';
import { printHeader } from './utils.js';
import { createInterface } from 'readline';

let rng = prng_alea("sddsf");

const rl = createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Digite cuántas variables desea utilizar [1,2,3]: ", function (name) {
    if (name === '1') {
        runAll({ 'a': true }, 4, 3);
    } else if (name === '2') {
        runAll({ 'a': true, 'b': false }, 4, 3);
    } else if (name === '3') {
        runAll({ 'a': true, 'b': false, 'c': true }, 4, 3);
    } else {
        console.log("La cantidad no es válida.")
    }
    rl.close();
});

rl.on("close", function () {
    process.exit(0);
});

function runAll(varValues, maxHeight, minHeight) {
    var vars = Object.keys(varValues);

    printHeader("variables")
    console.log(varValues);

    printHeader("randomProp")
    let arbol = randomProp(rng, vars, maxHeight, minHeight);
    console.log(arbol.toString());

    printHeader("evalProp");
    console.log("Eval prop: ", evalProp(arbol, varValues))

    printHeader("truthTable");
    console.log(truthTable(arbol, vars));

    printHeader("randomTruthTable & fitness");
    let randomTable = randomTruthTable(rng, vars);
    console.log("Random truth table: ", randomTable);
    console.log("Fitness: ", fitness(arbol, randomTable));

    printHeader("randomSearch");
    let bestRandomProp = randomSearch(rng, randomTable, 5, { vars, maxHeight, minHeight });
    console.log("Best prop: ", bestRandomProp, fitness(bestRandomProp, randomTable));

    printHeader("initialPopulation");
    let population = initialPopulation(rng, vars, 10);
    console.log(population);

    printHeader("assessPopulation");
    let assessedPopulation = assessPopulation(population, randomTable);
    console.log(assessedPopulation);

    printHeader("selection");
    let selectedPopulation = selection(rng, assessedPopulation, 5);
    console.log(selectedPopulation);

    printHeader("evolutionStrategy");
    let evolution = evolutionStrategy(rng, randomTable, 100, 15, { vars, maxHeight, minHeight });
    console.log(evolution);

}