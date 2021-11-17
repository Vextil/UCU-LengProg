/**
 * Genera una tabla con todas las permutaciones de true/false para cierta cantidad de elementos.
 * @param {number} varCount Cantidad de elementos a permutar.
 * @returns {array}
 */
export function inputPermutations(varCount) {
    let permutations = [];
    for (let i = 0; i < (1 << varCount); i++) {
        let permutation = [];
        for (let j = varCount - 1; j >= 0; j--) {
            permutation.push(Boolean(i & (1 << j)));
        }
        permutations.push(permutation);
    }
    return permutations;
}