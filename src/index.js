import Stage from './Stage.js';
import Node from './Node.js';

const stage = new Stage();

const state = {
  nodes: [],
  draggingOutputNodeId: null,
  draggingOutputIndex: null,
};

const addNode = (params) => {
  const node = new Node(stage, params);

  state.nodes.push(node);
};

addNode({
  x: 100,
  y: 100,
  width: 200,
  height: 127,
});

const tick = () => {
  state.nodes.forEach(node => node.render(stage.context));

  window.requestAnimationFrame(tick);
};

tick();
