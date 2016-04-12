
    try {
        require('/Users/yuer/workspaceforme/opensource/tokenspliter/test/unit/ret/tokenspliter.js');
        var runUnit = require('/Users/yuer/workspaceforme/opensource/tokenspliter/node_modules/defcomment/src/runUnit').runUnit;
        try{
        runUnit('/Users/yuer/workspaceforme/opensource/tokenspliter/test/unit/ret/tokenspliter.js', 'choseMatched', [
[[[{type:'a', lexicon: 'aa'}, {type:'b', lexicon: 'bbbb'}]], {type: 'b', lexicon: 'bbbb'}],
[[[{type:'a', lexicon: 'aa'}, {type:'b', lexicon: 'bb'}]], {type: 'a', lexicon: 'aa'}]
]);
        } catch(err) {
            console.log('[31m', '[error happened when test method "choseMatched"]', '[0m');
            console.log('[33m', 'test sample is:' + "[\n[[[{type:'a', lexicon: 'aa'}, {type:'b', lexicon: 'bbbb'}]], {type: 'b', lexicon: 'bbbb'}],\n[[[{type:'a', lexicon: 'aa'}, {type:'b', lexicon: 'bb'}]], {type: 'a', lexicon: 'aa'}]\n]", '[0m');
            console.log(err.stack);
    }
try{
        runUnit('/Users/yuer/workspaceforme/opensource/tokenspliter/test/unit/ret/tokenspliter.js', 'getMatchs', [
[[[{type: 'identity', regular: /[a-z]+/}], 'hello world'], [{
type: 'identity',
lexicon: 'hello'
}]],
[[[{type: 'identity', regular: /[a-z]+/}, {type: 'any', regular: /.+/}], 'hello world'], [{
type: 'identity',
lexicon: 'hello'
}, {
type: 'any',
lexicon: 'hello world'
}]]
]);
        } catch(err) {
            console.log('[31m', '[error happened when test method "getMatchs"]', '[0m');
            console.log('[33m', 'test sample is:' + "[\n[[[{type: 'identity', regular: /[a-z]+/}], 'hello world'], [{\ntype: 'identity',\nlexicon: 'hello'\n}]],\n[[[{type: 'identity', regular: /[a-z]+/}, {type: 'any', regular: /.+/}], 'hello world'], [{\ntype: 'identity',\nlexicon: 'hello'\n}, {\ntype: 'any',\nlexicon: 'hello world'\n}]]\n]", '[0m');
            console.log(err.stack);
    }
try{
        runUnit('/Users/yuer/workspaceforme/opensource/tokenspliter/test/unit/ret/tokenspliter.js', 'validate', [
[[[]], true],
[[[{type: 'identity', regular: /[a-z]+/}]], true],
[[[{}]], new Error("Expect type not empty string. but got undefined")]
]);
        } catch(err) {
            console.log('[31m', '[error happened when test method "validate"]', '[0m');
            console.log('[33m', 'test sample is:' + "[\n[[[]], true],\n[[[{type: 'identity', regular: /[a-z]+/}]], true],\n[[[{}]], new Error(\"Expect type not empty string. but got undefined\")]\n]", '[0m');
            console.log(err.stack);
    }
    } catch(err) {
        console.log('[31m', '[error happened when run unit case]', '[0m');
        console.log(err.stack);
    }
    