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

`npm i tokenspliter --save`

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

- lookAheads

Look ahead more steps.

First parameter is steps, second paramter is filter (optional). If has filter, only when filter returns true, it will count one step ahead.

```js
let t1 = tokenStream.lookAheads(3, (token) => token.type !== 'whitespace');
```

- isEmpty

If token stream comes to end, will return true, otherwise will return false;

```js
tokenStream.isEmpty()
```

## error token

- default handling

Defaultly, throw an exception.

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
let tokenStream = tokenspliter('a09 & bcd 12');
tokenStream.next();
tokenStream.next();
tokenStream.next(); // throw an error
```

- ignore handling

Set tokespliter's second parameter as null, will ignore exception, and when meet unrecoginized token, will return it as error token. The data structure of error token is:

```
{
    type: 'error_type',
    lexcion: 'some characters'
}
```

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
let tokenStream = tokenspliter('a09 & bcd 12', null); // null
tokenStream.next();
tokenStream.next();
tokenStream.next(); // {type: 'error_type', lexion: '&'}
```
