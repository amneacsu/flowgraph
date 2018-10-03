import Mouse from './mouse.js';

const listeners = [];

export default class Stage {
  constructor() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = 1000;
    canvas.height = 800;

    this.element = canvas;
    this.context = context;

    document.body.appendChild(canvas);

    this.mouse = new Mouse();
    this.mouse.attach(canvas);
  }

  listen(type, area, cb) {
    return this.mouse.listen(type, area, cb);
  }
}
