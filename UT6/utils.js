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
 * @param {Im} title 
 */
export function printHeader(title) {
    const filler = "=";
    const desiredLength = 60;
    const sideLength = Math.floor((desiredLength - title.length) / 2);
    const realLength = title.length + (sideLength * 2);
    console.log('');
    console.log(filler.repeat(realLength).black.bgBlue);
    console.log(title.padStart(sideLength + title.length, ' ').padEnd(realLength, ' ').black.bgBlue);
    console.log(filler.repeat(realLength).black.bgBlue);
    console.log('');
}
