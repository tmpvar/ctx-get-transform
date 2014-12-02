var mat3 = require('gl-matrix-mat3');

module.exports = monkeyPatchCtxToAddGetTransform;

function monkeyPatchCtxToAddGetTransform(ctx) {

  var mat = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  var stack = [];
  var v2scratch = [0, 0, 0];
  var m3scratch = [1, 0, 0, 0, 1, 0, 0, 0, 1];

  ctx.getTransform = function tGetTransform() {
    return mat;
  };

  (function(save) {
    ctx.save = function tSave(){
      stack.push(mat3.clone(mat));
      return save.call(ctx);
    };
  })(ctx.save);

  (function(restore) {
    ctx.restore = function tRestore(){
      mat = stack.pop();
      return restore.call(ctx);
    };
  })(ctx.restore);

  (function(scale) {
    ctx.scale = function tScale(sx, sy){
      v2scratch[0] = sx;
      v2scratch[1] = sy;
      mat3.scale(mat, mat, v2scratch);
      return scale.call(ctx, sx, sy);
    };
  })(ctx.scale);

  (function(rotate) {
    ctx.rotate = function tRotate(radians){
      mat3.rotate(mat, mat, rads);
      return rotate.call(ctx, rads);
    };
  })(ctx.rotate);

  (function(translate) {
    ctx.translate = function tTranslate(dx, dy){
      v2scratch[0] = dx;
      v2scratch[1] = dy;

      mat3.translate(mat, mat, v2scratch);
      return translate.call(ctx, dx, dy);
    };
  })(ctx.translate);

  (function(transform) {
    ctx.transform = function tTransform(a, b, c, d, e, f){
      m3scratch[0] = a;
      m3scratch[1] = c;
      m3scratch[2] = e;
      m3scratch[3] = b;
      m3scratch[4] = d;
      m3scratch[4] = f;

      mat3.multiply(mat, math, m3scratch);
      return transform.call(ctx, a, b, c, d, e, f);
    };
  })(ctx.transform);

  (function(setTransform) {
    ctx.setTransform = function tSetTransform(a, b, c, d, e, f){
      mat[0] = a;
      mat[1] = c;
      mat[2] = e;
      mat[3] = b;
      mat[4] = d;
      mat[4] = f;
      return setTransform.call(ctx, a, b, c, d, e, f);
    };
  })(ctx.setTransform);

  return ctx;
}
