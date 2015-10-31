/**
 * token
 *     type
 *     lexicon
 *
 * token_class <array>
 *           type
 *           regular
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var fetchToken = function fetchToken(token_class, txt) {
    var matches = getMatchs(token_class, txt);
    if (matches.length === 0) {
        throw new Error("unExpected token for at the head of " + txt);
    }
    // max match principle
    var token = {
        lexicon: ""
    };
    for (var i = 0; i < matches.length; i++) {
        // > not >=, because the list first principle
        if (matches[i].lexicon.length > token.lexicon.length) {
            token = matches[i];
        }
    }
    return {
        token: token,
        next: txt.substring(token.lexicon.length)
    };
};
var getMatchs = function getMatchs(token_class, txt) {
    var matches = [];
    for (var i = 0; i < token_class.length; i++) {
        var item = token_class[i];
        var type = item.type;
        var regular = item.regular;
        var arr = regular.exec(txt);
        if (arr && arr.index === 0) {
            matches.push({
                type: type,
                lexicon: arr[0]
            });
        }
    }
    return matches;
};

var validate = function validate(token_class) {
    if (!isArray(token_class)) {
        throw new TypeError("Expect array. " + token_class);
    }
    for (var i = 0; i < token_class.length; i++) {
        var item = token_class[i];
        if (!item || typeof item !== "object") {
            throw new TypeError("Expect object. " + item);
        }
        if (!item.type || typeof item.type !== "string") {
            throw new TypeError("Expect string. " + item.type);
        }
        if (!item.regular || !item.regular instanceof RegExp) {
            throw new TypeError("Expect regular. " + item.regular);
        }
    }
};

var isArray = function isArray(v) {
    return v && typeof v === "object" && typeof v.length === "number";
};

exports["default"] = function (token_class) {

    validate(token_class);

    return function (txt) {
        var next = function next() {
            if (!txt) return null;
            var arr = fetchToken(token_class, txt);
            txt = arr.next;
            return arr.token;
        };
        var lookAhead = function lookAhead() {
            if (!txt) return null;
            var arr = fetchToken(token_class, txt);
            return arr.token;
        };
        var lookAheads = function lookAheads(steps, filter) {
            if (steps === undefined) steps = 1;

            var source = txt;
            var results = [];
            for (var i = 0; i < steps; i++) {
                if (!source) return results;
                var arr = fetchToken(token_class, source);
                source = arr.next;
                if (typeof filter === "function") {
                    if (filter(arr.token)) {
                        results.push(arr.token);
                    } else {
                        i--;
                    }
                } else {
                    results.push(arr.token);
                }
            }
            return results;
        };
        var isEmpty = function isEmpty() {
            if (!txt) return true;
            return false;
        };
        return {
            next: next,
            isEmpty: isEmpty,
            lookAhead: lookAhead,
            lookAheads: lookAheads
        };
    };
};

module.exports = exports["default"];