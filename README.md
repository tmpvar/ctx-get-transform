# ctx.getTransform()

`cxt.getTransform()` is one of the missing bits of functionality in `CanvasRenderingContext2D`.  This module will monkey patch a `ctx` to track the current transformation stack and allows retrieval of the current matrix.

## install

`npm install ctx-get-transform`

## use

```javascript


var canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');

require('ctx-get-transform')(ctx);

console.log(ctx.getTransform) // outputs: function tGetTransform() ...

ctx.getTransform() // returns a gl-matrix style mat3

```

### api surface

there is only a single method added to the passed `ctx`, but every method that manipulates the transformation matrix is wrapped.

The awesome method (and purpose of this library):

`ctx.getTransform` - return a [gl-matrix style mat3](http://glmatrix.net/docs/2.2.0/symbols/mat3.html) (just a 9 element `Array` or `TypedArray`)

_note_: the returned array is not a copy of the tracked matrix.  Changing it can result in weird issues! Utilize `mat3.clone(ctx.getTransform())` if you need a copy.

# license

MIT (see [LICENSE.txt](LICENSE.txt))


