'use strict';

/**
 * token
 *     type
 *     lexicon
 *
 * token_class <array>
 *           type
 *           regular
 *
 *      [{
 *           type: 'identify',
 *           regular: /[a-zA-Z]+/
 *       }, {
 *           type: 'number',
 *           regular: /[0-9]+/
 *       }, {
 *           type: 'whitespace',
 *           regular: /\s+/
 *       }]
 */
let lookAheads = (token_class, txt, steps, filter) => {
    steps = steps || 1;
    let source = txt;
    let results = [];
    for (let i = 0; i < steps; i++) {
        if (!source) return results;
        let arr = fetchToken(token_class, source);
        source = arr.next;
        if (typeof filter === 'function') {
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

/**
 * get a token from txt
 *
 * 1. get all matches from txt, you may got more than one, because the bunch of token types
 * 2. chose one
 *    (1) long matching principle
 *    (2) first one principle
 */
let fetchToken = (token_class, txt) => {
    let matches = getMatchs(token_class, txt);
    if (matches.length === 0) {
        throw new Error('unExpected token at the head of ' + txt);
    }
    let token = choseMatched(matches);
    return {
        token,
        next: txt.substring(token.lexicon.length)
    };
};

/**
 * chose one from matches
 *    (1) long matching principle
 *    (2) first one principle
 *
 * ## test
 * [
 *      [[[{type:'a', lexicon: 'aa'}, {type:'b', lexicon: 'bbbb'}]], {type: 'b', lexicon: 'bbbb'}],
 *      [[[{type:'a', lexicon: 'aa'}, {type:'b', lexicon: 'bb'}]], {type: 'a', lexicon: 'aa'}]
 * ]
 */
let choseMatched = (matches) => {
    let token = matches[0];
    for (let i = 1; i < matches.length; i++) {
        // > not >=, because the first one principle
        if (matches[i].lexicon.length > token.lexicon.length) {
            token = matches[i];
        }
    }
    return token;
};

/**
 *  find all matched token, these tokens satisfied:
 *  (i) start from txt
 *  (ii) satisfied one of token_class
 *
 *  ## test
 *  [
 *      [[[{type: 'identity', regular: /[a-z]+/}], 'hello world'], [{
 *          type: 'identity',
 *          lexicon: 'hello'
 *      }]],
 *      [[[{type: 'identity', regular: /[a-z]+/}, {type: 'any', regular: /.+/}], 'hello world'], [{
 *          type: 'identity',
 *          lexicon: 'hello'
 *      }, {
 *          type: 'any',
 *          lexicon: 'hello world'
 *      }]]
 *  ]
 */
let getMatchs = (token_class, txt) => {
    let matches = [];
    for (let i = 0; i < token_class.length; i++) {
        let item = token_class[i];
        let arr = item.regular.exec(txt);
        if (arr && arr.index === 0) {
            matches.push({
                type: item.type,
                lexicon: arr[0]
            });
        }
    }
    return matches;
};

/**
 *
 * ## test
 * [
 *      [[[]], true],
 *      [[[{type: 'identity', regular: /[a-z]+/}]], true],
 *      [[[{}]], new Error("Expect type not empty string. but got undefined")]
 * ]
 */
let validate = (token_class) => {
    check(token_class, isArray, 'array');
    for (let i = 0; i < token_class.length; i++) {
        let item = token_class[i];
        check(item, isObject, 'object');
        check(item.type, notEmptyString, 'not empty string');
        check(item.regular, isRegular, 'regular');
    }
    return true;
};

let check = (v, type, name) => {
    if (!type(v)) {
        throw new TypeError('Expect type ' + name + '. but got ' + v);
    }
    return true;
};

let isArray = v => v && typeof v === 'object' &&
    typeof v.length === 'number';

let isObject = v => v && typeof v === 'object';

let notEmptyString = v => v && typeof v === 'string';

let isRegular = v => v && v instanceof RegExp;

module.exports = (token_class) => {
    token_class = token_class || [];
    validate(token_class);
    return (txt) => {
        let next = () => {
            if (!txt) return null;
            let arr = fetchToken(token_class, txt);
            txt = arr.next;
            return arr.token;
        };
        return {
            next,
            isEmpty: () => !txt,
            lookAheads: (steps, filter) => lookAheads(token_class, txt, steps, filter),
            lookAhead: () => lookAheads(token_class, txt)[0]
        };
    };
};

;(function () {
        var __exportsVariable = require('/Users/yuer/workspaceforme/opensource/tokenspliter/node_modules/defcomment/src/runUnit').exportsVariable;
        __exportsVariable('/Users/yuer/workspaceforme/opensource/tokenspliter/test/unit/ret/tokenspliter.js', 'choseMatched', choseMatched);
__exportsVariable('/Users/yuer/workspaceforme/opensource/tokenspliter/test/unit/ret/tokenspliter.js', 'getMatchs', getMatchs);
__exportsVariable('/Users/yuer/workspaceforme/opensource/tokenspliter/test/unit/ret/tokenspliter.js', 'validate', validate);
    })();
    