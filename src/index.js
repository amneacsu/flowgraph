const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 800;

document.body.appendChild(canvas);

const state = {
  nodes: [],
  draggingOutputNodeId: null,
  draggingOutputIndex: null,
};

const addNode = (node) => {
  state.nodes.push({
    ...node,
    render(context) {
      context.fillRect(this.x, this.y, this.width, this.height);
    },
  });
};

addNode({
  x: 100,
  y: 100,
  width: 200,
  height: 127,
});

canvas.onclick = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;
};

const tick = () => {
  state.nodes.forEach(node => node.render(context));

  window.requestAnimationFrame(tick);
};

tick();
