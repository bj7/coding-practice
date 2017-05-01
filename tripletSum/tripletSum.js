var a = [1, 1, 2, 5, 3,];
var x = 8;

function merge (a, b) {
    var c = [];

    while (a.length > 0 && b.length > 0) {
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
    c;
    return c;
}

function mergeSort (a) {
    if (a.length <= 1) return a;
    var l = a.splice(0, a.length / 2);
    var r = a;

    l = mergeSort(l);
    r = mergeSort(r);

    return merge(l, r);
}

function tripletSum (x, a) {
    a = mergeSort(a);

    var l = 0;
    var e = 0;
    for (var i = 0; i < a.length - 2; i++) {
        l = i + 1;
        e = a.length - 1;
        while (l < e) {
            if (x == (a[i] + a[l] + a[e])) {
                console.log(x, a[i], a[l], a[e]);
                return true;
            } else if ((a[i] + a[l] + a[e]) < x) {
                l++;
            } else {
                e--;
            }
        }
    }
    return false;
}

var out = tripletSum(x, a);
console.log(out);
