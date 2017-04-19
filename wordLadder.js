var beginWord = "hot"
var endWord = "dog"
var wordList = ["hot",
 "dog",]

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

function neighbor(a, b, end) {
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

function Dijkstra(G, start, end) {
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
    };
    // set distance of all unvisited
    // unvisited = dist(start, unvisited, end);
    unvisited.push(start);
    while (unvisited.length > 0) {
        var u = minDist(unvisited);
        // if smallest distance is Infinity, there is no path
        if (u.dist == Infinity) {
            return 0;
        }
        var n = neighbor(u, unvisited);
        for (var i in n) {
            console.log(u, n[i], dist(u, n[i]));
            if ( ( u.dist + dist(u, n[i]) ) < n[i].dist ) {
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



function wordLadder(beginWord, endWord, wordList) {
    if (beginWord.length <= 1) {
        return 2;
    }
    var o = Dijkstra(wordList, beginWord, endWord);
    var a = [];
    while (o) {
        a.push(o);
        o = o.prev;
    }
    console.log(a, a.length);
    return a.length;
}
wordLadder(beginWord, endWord, wordList);