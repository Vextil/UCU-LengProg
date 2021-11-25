import * as colors from "colors"; 

/**
 * Genera una tabla con todas las permutaciones de true/false para cierta cantidad de elementos.
 * @param {String[]} vars Lista de nombres de variables.
 * @returns {array}
 */
export function varPermutations(vars) {
    let permutations = [];
    for (let i = 0; i < (1 << vars.length); i++) {
        let permutation = [];
        for (let j = vars.length - 1; j >= 0; j--) {
            let key = vars[vars.length - j - 1];
            let value = Boolean(i & (1 << j));
            permutation.push([key, value]);
        }
        permutations.push(Object.fromEntries(permutation));
    }
    return permutations;
}

/**
 * Imprime un header "con estilo" en la consola. Ejemplo:
 * ===========================================================
 *                            Title
 * ===========================================================
 * @param {string} title 
 */
export function printHeader(title, textColor = 'black', backgroundColor = 'bgBlue', slim = false) {
    const filler = "=";
    const desiredLength = 90;
    const sideLength = Math.floor((desiredLength - title.length) / 2);
    if (!slim) {
        console.log('');
        console.log(filler.repeat(desiredLength)[textColor][backgroundColor]);
    }
    console.log(title.padStart(sideLength + title.length, ' ').padEnd(desiredLength, ' ')[textColor][backgroundColor]);
    if (!slim) {
        console.log(filler.repeat(desiredLength)[textColor][backgroundColor]);
        console.log('');
    }
}

export function describe(name, exec) {
    printHeader('TEST ' + name, 'black', 'bgBrightWhite');
    exec();
}

export function it(name, exec) {
    printHeader(name, 'black', 'bgBrightCyan', true);
    exec();
}

export function assertEquals(expected, result, description = null) {
    if (typeof expected === 'object') {
        expected = JSON.stringify(expected);
    }
    if (typeof result === 'object') {
        result = JSON.stringify(result);
    }
    if (expected === result){
        printHeader('PASSED' + (description ? ' - ' + description : ''), 'black', 'bgGreen', true);
    } else {
        printHeader('FAILED' + (description ? ' - ' + description : ''), 'black', 'bgRed', true);
        printHeader('EXPECTED', 'black', 'bgWhite', true);
        printHeader('' + expected, 'black', 'bgWhite', true)
        printHeader('ACTUAL', 'black', 'bgWhite', true);
        printHeader('' + result, 'black', 'bgWhite', true);
    }
}