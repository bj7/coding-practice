var beginWord = "hot";
var endWord = "dog";
var wordList = ["hot",
 "dog",];

const minQueue = require('../priorityQueue/priorityQueue.js');

// es5 min priority queue
var minQueue1 = function (item, priority) {
    var queue = [];
    if (item !== undefined && priority !== undefined)
        queue.push({
            i: item,
            p: priority,
        });

    /**
     * Merge routine for mergesort.
     * @param {number|Array} l1 - the left side of the array to merge.
     * @param {number|Array} l2 - the right side of the array to merge
     * @return {Array} Returns sorted array.
     */
    var merge = function (l1, l2) {
        var c = [];
        while (l1.length > 0 && l2.length > 0) {
            if (l1[0].p > l2[0].p) {
                c.push(l2[0]);
                l2.splice(0, 1);
            } else {
                c.push(l1[0]);
                l1.splice(0, 1);
            }
        }

        while (l1.length > 0) {
            c.push(l1[0]);
            l1.splice(0, 1);
        }

        while (l2.length > 0) {
            c.push(l2[0]);
            l2.splice(0, 1);
        }

        return c;
    };

    /**
     * Split routine of mergesort.
     * @param {Array} q - Array to sort.
     * @return {Array} Returns sorted array.
     */
    var mergeSort = function (q) {
        if (q.length <= 1) return q;

        var l1 = q.splice(0, (q.length / 2));
        var l2 = q;

        l1 = mergeSort(l1);
        l2 = mergeSort(l2);

        return merge(l1, l2);
    };

    /**
     * Adds the item with the specified priority.
     * @param {any} i - Identifier of the item in the queue
     * @param {number} p - Priority of item.
     */
    var add_with_priority = function (i, p, e) {
        queue.push({
            i: i,
            p: p,
            e: e,
        });
        queue = mergeSort(queue);
    };

    /**
     * Decreases the priority of the specified item
     * @param {any} i - Identifier
     * @param {number} p - Priority value
     */
    var decrease_priority = function (i, p) {
        var index = queue.length - 1;
        while (index >= 0) {
            if (queue[index].i == i) {
                queue[index].p = p;
                index = -0;
            }
            index--;
        }
        queue = mergeSort(queue);
    };

    return ({
        push: function (i, p, e) {
            add_with_priority(i, p, e);
        },
        decrease_priority: function (i, p) {
            decrease_priority(i, p);
        },
        print: function () {
            console.log(queue);
        },
        pop: function () {
            var ret = queue.splice(0, 1);
            return ret[0];
        },
        length: function () {
            return queue.length;
        },
        list: function () {
            var q = [];
            for (var i = 0; i < queue.length; i++) {
                q[i] = queue[i];
            }
            return q;
        },
    });
};

function distToEnd (a, b) {
    if (b === undefined) {
        return 0;
    } else {
        var c = a.value.length;
        for (var i in a.value) {
            if (a.value[i] == b.value[i]) {
                c--;
            }
        }
        return c;
    }
}

function dist (a, b, end) {
    var ret = null;
    if (Object.prototype.toString.call(b) == '[object Array]') {
        var l;
        // loop through the array
        for (var i in b) {
            l = a.value.length
            // test each character to determine if they are the same
            for (var j in b[i].value) {
                if (a.value[j] == b[i].value[j]) {
                    l--;
                }
            }
            // if the words differ by one char, we can travel, else we can't
            if (l <= 1) {
                b[i].dist = l + distToEnd(b[i], end);
            } else {
                b[i].dist = Infinity;
            }
        }
        ret = b;
    } else {
        var d = a.value.length;
        for (var i in b.value) {
            if (a.value[i] == b.value[i]) {
                d--;
            }
        }
        // if the value we are testing against is the end value and we are
        // within 1 step, then shrink the step to be the best possible.
        if (end !== undefined && (b.value == end.value) && d <= 1) {
            d = -1;
        }
        ret = d;
    }
    return ret;
}

function minDist (a) {
    var min = {
        dist: Infinity,
    };
    var index = 0;
    for (var i in a) {
        if (a[i].dist < min.dist) {
            min = a[i];
            index = i;
        }
    }
    return min;
}

function neighbor (a, b, end) {
    var n = [];
    for (var i in b) {
        if (b[i].value != a.value && dist(a, b[i]) <= 1) {
            n.push(b[i]);
        }
    }
    return n;
}

function pop (a, b) {
    for (var i in b) {
        if (a.value == b[i].value) {
            b.splice(i, 1);
            break;
        }
    }
}

function DijkstraWithMinQueue (u, start, end) {
    // setup Q as a min priority queue
    var Q = minQueue.queue();
    // var Q = minQueue1();
    for (var i in u) {
        if (u.hasOwnProperty(i)) {
            Q.push(u[i].value, u[i].dist, u[i]);
        }
    }

    var list = [];
    var c = null;
    var n = null;
    var alt = null;
    while (Q.length() > 0) {
        c = Q.pop();
        // generate list that's digestable by the neighbor function
        list = Q.list();
        for (var i = 0; i < list.length; i++) {
            if (list.hasOwnProperty(i)) {
                list[i] = list[i].e;
            }
        }

        console.log(c.e.value, list);
        n = neighbor(c.e, list);
        for (var i = 0; i < n.length; i++) {
            alt = c.e.dist + dist(c.e, n[i], end);
            if (alt < n[i].dist) {
                n[i].dist = alt;
                n[i].prev = c.e;
                Q.decrease_priority(n[i].value, alt);
            }
        }
        if (end.value == c.e.value && c.e.dist !== Infinity) {
            return c.e;
        }
    }
    return 0;
}

function Dijkstra (G, start, end, shouldUsePriorityQueue) {
    var unvisited = [];
    // convert input into more easily handed data structures
    // and assign needed properties
    start = {
        value: start,
        dist: 0,
        prev: null,
    };
    end = {
        value: end,
        dist: Infinity,
        prev: null,
    };
    for (var i in G) {
        unvisited.push({
            value: G[i],
            dist: Infinity,
            prev: null,
        });
    }

    // set distance of all unvisited
    // unvisited = dist(start, unvisited, end);
    unvisited.push(start);
    if (shouldUsePriorityQueue) {
        return DijkstraWithMinQueue(unvisited, start, end);
    }
    while (unvisited.length > 0) {
        var u = minDist(unvisited);
        // if smallest distance is Infinity, there is no path
        if (u.dist == Infinity) {
            return 0;
        }
        var n = neighbor(u, unvisited);
        for (var i in n) {
            if ((u.dist + dist(u, n[i])) < n[i].dist) {
                n[i].dist = u.dist + dist(u, n[i]);
                n[i].prev = u;
            }
        }
        pop(u, unvisited);
        if (u.value == end.value) {
            return u;
        }
    }
    return 0;
}



function wordLadder (beginWord, endWord, wordList) {
    if (beginWord.length <= 1) {
        return 2;
    }
    var o = Dijkstra(wordList, beginWord, endWord, true);
    var a = [];
    while (o) {
        a.push(o);
        o = o.prev;
    }
    console.log(a, a.length);
    return a.length;
}
wordLadder(beginWord, endWord, wordList);