var canvas = document.getElementById('canvas'),
ctx = canvasPlus('canvas'),
draw = false,
startX,
startY,
radius,
color = document.getElementById('color'),
size = document.getElementById('size'),
bg = document.getElementById('sketchbg'),
tool = document.getElementById('tool'),
clear = document.getElementById('clear'),
undo = document.getElementById('undo'),
save = document.getElementById('save'),
shapeTools = document.getElementById('shapeTools'),
shapeType = document.getElementById('shapeType'),
shapeFill = document.getElementById('shapeFill');
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
canvas.onmousedown = function (e) {
  draw = true;
  ctx.saveFrame();
  ctx.beginPath();
  ctx.moveTo(ctx.mouseX(e), ctx.mouseY(e));
  if (tool.value !== 'shape') {
  ctx.lineTo(ctx.mouseX(e), ctx.mouseY(e));
  ctx.stroke();
  }
  else {
  ctx.strokeStyle = color.value;
  ctx.fillStyle = color.value;
  startX = ctx.mouseX(e);
  startY = ctx.mouseY(e);
  }
};
canvas.onmouseup = function (e) {
  draw = false;
  if (tool.value === 'shape') {
  ctx.restoreFrame();
  ctx.saveFrame();
  if (shapeType.value === 'rect') {
    ctx.drawRect((shapeFill.value === 'solid' ? 'fill' : 'stroke'), startX, startY, e.offsetX - startX || e.pageX - canvas.offsetLeft - startX, e.offsetY - startY || e.pageY - canvas.offsetTop - startY);
  }
  else if (shapeType.value === 'circle') {
    radius = Math.max(Math.abs(e.offsetX - startX || e.pageX - canvas.offsetLeft - startX), Math.abs(e.offsetY - startY || e.pageY - canvas.offsetTop - startY)) / 2;
    ctx.drawCircle((shapeFill.value === 'solid' ? 'fill' : 'stroke'), Math.min(startX + radius, e.offsetX + radius || e.pageX - canvas.offsetLeft + radius), Math.min(startY + radius, e.offsetY + radius || e.pageY - canvas.offsetTop + radius), radius);
  }
  else if (shapeType.value === 'line') {
    ctx.drawLine(startX, startY, ctx.mouseX(e), ctx.mouseY(e));
  }
  }
};
canvas.onmousemove = function (e) {
  if (draw) {
  if (tool.value !== 'shape') {
    ctx.lineTo(ctx.mouseX(e), ctx.mouseY(e));
    ctx.stroke();
  }
  else {
    ctx.restoreFrame();
    ctx.saveFrame();
    if (shapeType.value === 'rect') {
    ctx.drawRect((shapeFill.value === 'solid' ? 'fill' : 'stroke'), startX, startY, e.offsetX - startX || e.pageX - canvas.offsetLeft - startX, e.offsetY - startY || e.pageY - canvas.offsetTop - startY);
    }
    else if (shapeType.value === 'circle') {
    radius = Math.max(Math.abs(e.offsetX - startX || e.pageX - canvas.offsetLeft - startX), Math.abs(e.offsetY - startY || e.pageY - canvas.offsetTop - startY)) / 2;
    ctx.drawCircle((shapeFill.value === 'solid' ? 'fill' : 'stroke'), Math.min(startX + radius, e.offsetX + radius || e.pageX - canvas.offsetLeft + radius), Math.min(startY + radius, e.offsetY + radius || e.pageY - canvas.offsetTop + radius), radius);
    }
    else if (shapeType.value === 'line') {
    ctx.drawLine(startX, startY, ctx.mouseX(e), ctx.mouseY(e));
    }
  }
  }
};
canvas.onmouseout = function (e) {
  if (tool.value !== 'shape') {
  draw = false;
  }
};
color.onchange = function () {
  ctx.strokeStyle = color.value;
};
size.onchange = function () {
  ctx.lineWidth = Number(size.value);
};
bg.onchange = function () {
  if (bg.value && confirm('Warning: Changing the background color will clear your current drawing.  Continue?')) {
  ctx.fillStyle = bg.value;
  ctx.fillRect(0, 0, 500, 500);
  ctx.fillStyle = color.value;
  }
  else {
  bg.value = '';
  }
};
tool.onchange = function () {
  if (tool.value === 'draw') {
  ctx.strokeStyle = color.value;
  color.disabled = false;
  shapeTools.style.display = 'none';
  }
  else if (tool.value === 'erase') {
  ctx.strokeStyle = bg.value || '#fff';
  color.disabled = true;
  shapeTools.style.display = 'none';
  }
  else if (tool.value === 'shape') {
  ctx.strokeStyle = color.value;
  color.disabled = false;
  shapeTools.style.display = 'block';
  }
};
clear.onclick = function () {
  ctx.clearRect(0, 0, 500, 500);
  ctx.fillStyle = bg.value;
  ctx.fillRect(0, 0, 500, 500);
  ctx.fillStyle = color.value;
};
undo.onclick = function () {
  ctx.restoreFrame();
};
save.onclick = function () {
  window.open(canvas.toDataURL());    
};