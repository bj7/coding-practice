var words = ["This",
 "is", 
 "an", 
 "example", 
 "of", 
 "text", 
 "justification."];
var L = 16;

function textJustification (words, L) {
    if (L == 1) return words;
    var o = [];
    var s = 0;
    var i = 0;
    var t = [];
    while (i < words.length) {
        s += words[i].length;
        if (s == L) {
            t = words.splice(0, i + 1);
            o.push(t.join(" "));
            s = 0;
            i = 0;
            if (words.length <= 0) return o;
        } else if (s < L) {
            s++;
            i++;
        }
        if (s > L || i >= words.length) {
            t = words.splice(0, i);
            var wl = words[0] === undefined ? 0 : words[0].length;
            s -= (wl + t.length);
            var numspaces = L - s;
            var l; // = t.length - 1 || 1;
            l = numspaces % t.length;
            if (l <= 0) l = t.length === 0 ? 1 : t.length;
            if (l == t.length && i < words.length) l--;
            while (numspaces > 0) {
                for (var j = 0; j < l; j++) {
                    if (numspaces > 0) {
                        t[j] += " ";
                        numspaces--;
                    } else {
                        break;
                    }
                }
            }
            o.push(t.join(""));
            i = 0;
            s = 0;
        }
    }
    return o;
}
console.log(textJustification(words, L));
