var words = ["This",
 "is", 
 "an", 
 "example", 
 "of", 
 "text", 
 "justification."];
var L = 16;

function textJustification (words, L) {
    var o = [];
    var s = 0;
    var i = 0;
    var t = [];
    while (i < words.length) {
        s += words[i].length;
        if (s == L) {
            t = words.splice(0, 1);
            o.push(t.join(""));
            s = 0;
            i = 0;
        } else if (s < L) {
            s++;
            i++;
        }
        if (s > L || i >= words.length) {
            t = words.splice(0, i);
            var wl = words[0] === undefined ? 0 : words[0].length;
            s -= (wl + t.length);
            var numspaces = L - s;
            var l = t.length - 1 || 1;
            for (var j = 0; j < l; j++) {
                var c = 0;
                while (c < Math.floor(numspaces / l)) {
                    t[j] += "_";
                    c++;
                }
            }
            o.push(t.join(""));
            i = 0;
            s = 0;
        }
    }
    console.log(o);
    return o;
}
console.log(textJustification(words, L));
