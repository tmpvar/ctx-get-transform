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

`ctx.getTransform` - return a [gl-matrix style mat3](http://glmatrix.net/docs/2.2.0/symbols/mat3.html) (just a 9 element `Array`)

_note_: the returned array is not a copy of the tracked matrix.  Changing it can result in weird issues! Utilize `mat3.clone(ctx.getTransform())` if you need a copy.

`ctx.pointToWorld(out, point)` - project a point (`[0, 0]`) (e.g. mouse position) into world coords.  `out` needs to be a 2 component array and the result of the operation will be applied to it.

# license

MIT (see [LICENSE.txt](LICENSE.txt))


