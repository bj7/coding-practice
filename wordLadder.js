const beginWord = "hit"
const endWord = "cog"
const wordList = ["hot",
    "dot", 
    "dog",
    "lot",
    "log",
    "cog"]

function distToEnd (a, b) {
    if (b === undefined) {
        return 0;
    } else {
        let c = a.value.length;
        for (let i in a.value) {
            if (a.value[i] == b.value[i]) {
                c--;
            }
        }
        return c;
    }
}

function dist (a, b, end) {
    let ret = null;
    if (Object.prototype.toString.call(b) == '[object Array]') {
        const l = a.value.length;
        // loop through the array
        for (let i in b) {
            // TODO - need better heuristic.
            b[i].dist = l + distToEnd(b[i], end);
            // test each character
            for (let j in b[i].value) {
                if (a.value[j] == b[i].value[j]) {
                    b[i].dist--;
                }
            }
        }
        ret = b;
    } else {
        let d = a.value.length;
        for (let i in b.value) {
            if (a.value[i] == b.value[i]) {
                d--;
            }
        }
        ret = d;
    }
    return ret;
}

function minDist (a) {
    let min = {
        dist: Infinity,
    };
    let index = 0;
    for (let i in a) {
        if (a[i].dist < min.dist) {
            min = a[i];
            index = i;
        }
    }
    return min;
}

function neighbor(a, b, end) {
    let n = [];
    for (let i in b) {
        if (b[i].value != a.value && dist(a, b[i]) <= 1) {
            console.log(b[i], dist(a, b[i]));
            n.push(b[i]);
        }
    }
    return n;
}

function pop (a, b) {
    for (let i in b) {
        if (a.value == b[i].value) {
            b.splice(i, 1);
            break;
        }
    }
}

function Dijkstra(G, start, end) {
    let unvisited = [];
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
    for (let i in G) {
        unvisited.push({
            value: G[i],
            dist: Infinity,
            prev: null,
        });
    };
    // set distance of all unvisited
    unvisited = dist(start, unvisited, end);
    while (unvisited.length > 0) {
        let u = minDist(unvisited);
        let n = neighbor(u, unvisited, end);
        for (let i in n) {
            console.log(u, n, dist(u, n[i], end))
            if ((u.dist + dist(u, n[i], end)) < n[i].dist) {
                n[i].dist = u.dist + dist(u, n[i], end);
                n[i].prev = u;
            }
        }
        pop(u, unvisited);
        if (u.value == end.value) {
            return u;
        }
    }
}



(function wordLadder(beginWord, endWord, wordList) {
    let o = Dijkstra(wordList, beginWord, endWord);
    let a = [];
    while (o) {
        a.push(o);
        o = o.prev;
    }
    console.log(a, a.length);
})(beginWord, endWord, wordList);