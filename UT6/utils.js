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