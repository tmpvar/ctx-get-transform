var test = require('tape');
var wrap = require('./ctx-get-transform');
var vec2 = require('gl-vec2');

function noop(){}

test('scale', function(t) {
  var ctx = wrap({ scale : noop });

  ctx.scale(5, 2);
  var m3 = ctx.getTransform();
  var v = [1, 1];
  var r = [0, 0];

  vec2.transformMat3(r, v, m3);

  t.deepEqual(r, [5, 2]);
  t.end();
});

test('scale from origin', function(t) {
  var ctx = wrap({ scale : noop });

  ctx.scale(5, 2);
  var m3 = ctx.getTransform();
  var v = [0, 0];
  var r = [0, 0];

  vec2.transformMat3(r, v, m3);

  t.deepEqual(r, [0, 0]);
  t.end();
});

test('translate', function(t) {
  var ctx = wrap({ translate : noop });

  ctx.translate(10, 50);
  var m3 = ctx.getTransform();
  var v = [0, 0];
  var r = [0, 0];

  vec2.transformMat3(r, v, m3);

  t.deepEqual(r, [10, 50]);
  t.end();
});

test('translate + scale', function(t) {
  var ctx = wrap({ translate : noop, scale: noop});

  ctx.translate(10, 50);
  ctx.scale(5, 5);

  var m3 = ctx.getTransform();
  var v = [0, 0];
  var r = [0, 0];

  vec2.transformMat3(r, v, m3);

  t.deepEqual(r, [10, 50]);
  t.end();
})

test('scale + translate', function(t) {
  var ctx = wrap({ translate : noop, scale: noop});

  ctx.scale(5, 5);
  ctx.translate(10, 50);

  var m3 = ctx.getTransform();
  var v = [0, 0];
  var r = [0, 0];

  vec2.transformMat3(r, v, m3);

  t.deepEqual(r, [50, 250]);
  t.end();
})

test('rotate', function(t) {
  var ctx = wrap({ rotate : noop });

  ctx.rotate(Math.PI/2);
  var m3 = ctx.getTransform();
  var v = [10, 0];
  var r = [0, 0];

  vec2.transformMat3(r, v, m3);

  t.deepEqual(r, [6.123031769111886e-16, 10]);
  t.end();
});
