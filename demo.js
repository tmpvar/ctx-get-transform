var mat3 = require('gl-matrix-mat3');
var vec2 = require('gl-matrix-vec2');
var mouse = vec2.create();
var scale = 1;

var v2scratch = vec2.create();
var m3scratch = mat3.create();

var ctx = require('fc')(function() {
  ctx.fillStyle = "red";
  ctx.clear();
  ctx.save();
    ctx.translate(window.innerWidth/2, window.innerHeight/2);
    ctx.scale(scale, scale);

    // compute where the mouse is in the scene
    var mat = ctx.getTransform();
    mat3.invert(m3scratch, mat)
    vec2.transformMat3(v2scratch, mouse, m3scratch);

    // draw the mouse!
    ctx.fillRect(v2scratch[0] - 5, v2scratch[1] - 5, 10, 10);

  ctx.restore();

}, true);

require('./ctx-get-transform')(ctx);
console.log(ctx.getTransform)
document.addEventListener('mousemove', function(e) {
  mouse[0] = e.x;
  mouse[1] = e.y;
});

document.addEventListener('mousewheel', function(e) {
  scale += e.wheelDeltaY / 100;
  e.preventDefault();
});
