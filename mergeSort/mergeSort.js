/**
 * @description Merges the portions of the array in order.
 *
 * @param {Array} a - Portion 1 to merge.
 * @param {Array} b - Portion 2 to merge.
 * @return {Array} - Returns the merged portions of the array in order.
 */
function merge (a, b) {
    var c = [];

    while (a.length > 0 & b.length > 0) {
        if (a[0] > b[0]) {
            c.push(b[0]);
            b.splice(0, 1);
        } else {
            c.push(a[0]);
            a.splice(0, 1);
        }
    }
    while (a.length > 0) {
        c.push(a[0]);
        a.splice(0, 1);
    }
    while (b.length > 0) {
        c.push(b[0]);
        b.splice(0, 1);
    }
    return c;
}

/**
 * @description MergeSort implementation.
 * Runtime O(n lg(n))
 *
 * @param {Array} a - Array to sort
 * @return {Array} - Returns the sorted array.
 */
function mergeSort (a) {
    if (a.length <= 1) return a;
    var l1 = a.splice(0, a.length / 2);
    var l2 = a;

    l1 = mergeSort(l1);
    l2 = mergeSort(l2);

    return merge(l1, l2);
}