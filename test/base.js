'use strict';

let assert = require('assert');
let Tokenspliter = require('../index');

describe('base', () => {
    it('next', () => {
        let tokenspliter = Tokenspliter([{
            type: 'identify',
            regular: /[a-zA-Z][a-zA-Z0-9]*/
        }, {
            type: 'number',
            regular: /[0-9]+/
        }, {
            type: 'whitespace',
            regular: /\s+/
        }]);
        let tokenStream = tokenspliter('a09 bcd 12');
        let t1 = tokenStream.next();
        let t2 = tokenStream.next();
        assert.equal(t1.lexicon, 'a09');
        assert.equal(t1.type, 'identify');
        assert.equal(t2.lexicon, ' ');
        assert.equal(t2.type, 'whitespace');
    });

    it('lookAhead', () => {
        let tokenspliter = Tokenspliter([{
            type: 'identify',
            regular: /[a-zA-Z][a-zA-Z0-9]*/
        }, {
            type: 'number',
            regular: /[0-9]+/
        }, {
            type: 'whitespace',
            regular: /\s+/
        }]);
        let tokenStream = tokenspliter('a09 bcd 12');
        let t1 = tokenStream.lookAhead();
        let t2 = tokenStream.next();
        assert.equal(t1.lexicon, 'a09');
        assert.equal(t1.type, 'identify');
        assert.equal(t2.lexicon, 'a09');
        assert.equal(t2.type, 'identify');
    });

    it('lookAheads', () => {
        let tokenspliter = Tokenspliter([{
            type: 'identify',
            regular: /[a-zA-Z][a-zA-Z0-9]*/
        }, {
            type: 'number',
            regular: /[0-9]+/
        }, {
            type: 'whitespace',
            regular: /\s+/
        }]);
        let tokenStream = tokenspliter('a09 bcd 12 32798');
        let t1 = tokenStream.lookAheads(3, (token) => token.type !== 'whitespace');
        assert.equal(t1[0].lexicon, 'a09');
        assert.equal(t1[1].lexicon, 'bcd');
        assert.equal(t1[2].lexicon, '12');
        let t2 = tokenStream.next();
        assert.equal(t2.lexicon, 'a09');
    });

    it('null', () => {
        let tokenspliter = Tokenspliter([{
            type: 'identify',
            regular: /[a-zA-Z][a-zA-Z0-9]*/
        }, {
            type: 'number',
            regular: /[0-9]+/
        }, {
            type: 'whitespace',
            regular: /\s+/
        }]);
        let tokenStream = tokenspliter('a09 bcd 12');
        tokenStream.next();
        tokenStream.next();
        tokenStream.next();
        tokenStream.next();
        tokenStream.next();
        let t6 = tokenStream.next();

        assert.equal(t6, null);
    });

    it('isEmpty', () => {
        let tokenspliter = Tokenspliter([{
            type: 'identify',
            regular: /[a-zA-Z][a-zA-Z0-9]*/
        }, {
            type: 'number',
            regular: /[0-9]+/
        }, {
            type: 'whitespace',
            regular: /\s+/
        }]);
        let tokenStream = tokenspliter('a09 bcd 12');
        tokenStream.next();
        tokenStream.next();
        tokenStream.next();
        tokenStream.next();
        assert.equal(tokenStream.isEmpty(), false);
        tokenStream.next();
        assert.equal(tokenStream.isEmpty(), true);
    });

    it('error', () => {
        let tokenspliter = Tokenspliter([{
            type: 'identify',
            regular: /[a-zA-Z][a-zA-Z0-9]*/
        }, {
            type: 'number',
            regular: /[0-9]+/
        }, {
            type: 'whitespace',
            regular: /\s+/
        }]);
        let tokenStream = tokenspliter('a09 & bcd 12', null);
        tokenStream.next();
        tokenStream.next();
        let t = tokenStream.next();
        assert.equal(t.type, 'error_type');
        assert.equal(t.lexicon, '&');
    });
});
