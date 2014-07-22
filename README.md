#where

parses constraints to create a predicate for filtering

##Intro

`where` takes a spec object and returns a _testSpec_ function.  The _testSpec_ function will return
`true` if it is passed a matching test object, otherwise it returns false.

This pattern can be used to filter objects in arrays or object streams.  Primitives as spec objects
will perform a strict (`===`) equals check against the test object.

```javascript
var arr = [{x: 2, y: 1}, {x: 10, y: 2}, {x: 8, y: 3}, {x: 9, y: 4}];
arr.filter( where( {x: 10} ) ); //=> [{x: 10, y: 2}]
arr.filter( where( {x: function ( val ) { return val % 2 === 0;}} ) ).length; //-> 3
[1, 2, null, 3].some( where( null ) ); //=> true
[1, 2, null, 3].some( where( Infinity ) ); //=> false
```

