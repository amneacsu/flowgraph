export default class Node {
  constructor(stage, params) {
    this.x = params.x;
    this.y = params.y;
    this.width = params.width;
    this.height = params.height;

    stage.listen('click', {
      x1: params.x,
      y1: params.y,
      x2: params.x + params.width,
      y2: params.y + params.height,
    }, (x, y) => {
      console.log(`click box at ${x}, ${y}`);
    });
  }

  render(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
