# tokenspliter

Token spliter used to split tokens from text.

## exmaple

```js
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
let t1 = tokenStream.next(); // {type: 'identity', 'lexion': 'a09'}
let t2 = tokenStream.next(); // {type: 'whitespace', 'lexion': ' '}
```

## install

`npm i tokenspliter`

## usage

### initial tokenspliter

```js
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
```

Initial a token spliter, by pass an array which item contains a type and a regular expression.

### accept text

```js
let tokenStream = tokenspliter('a09 bcd 12');
```

### operate token stream

- next

Move to next, and return next token.

```js
let t1 = tokenStream.next(); // {type: 'identity', 'lexion': 'a09'}
```

- lookAhead

Look ahead one step, and return next token, but token stream will hold.

```js
let t1 = tokenStream.lookAhead(); // {type: 'identity', 'lexion': 'a09'}
```

- isEmpty

If token stream comes to end, will return true, otherwise will return false;

```js
tokenStream.isEmpty()
```
