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

/**
 * @description Tests how many missing ints there are for the array to be
 * consecutive.
 * Runtime is O(nlg(n)) + O(n^2) - MergeSort runs in O(n lg(n)) but the
 * then the final determination runs in O(n) outer loop with the potential
 * of O(n) inner loop, since the gap between items might be n.
 *
 * @param {Array} statues - The array to test.
 * @return {number} Returns the number of missing consecutive elements.
 */
function makeArrayConsecutive2 (statues) {
    var s = mergeSort(statues);

    var c = 0;
    for (var i = 0; i < s.length; i++) {
        if (s[i + 1] !== undefined) {
            if (Math.abs(s[i] - s[i + 1]) > 1) {
                for (var j = s[i] + 1; j < s[i + 1]; j++) {
                    c++;
                }
            }
        }
    }
    s;
    c;
    return c;
}

var statues = [6, 2, 3, 8];
makeArrayConsecutive2(statues);
