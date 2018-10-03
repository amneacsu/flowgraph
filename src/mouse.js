const listeners = [];

let mousex, mousey;

const handle = h => {
  return e => {
    const x = e.offsetX;
    const y = e.offsetY;
    h(x, y);
    mousex = x;
    mousey = y;
  };
};

const hasType = type => {
  return sub => {
    return sub.type === type;
  };
};

const contains = (x, y) => {
  return sub => {
    return x >= sub.area.x1 && x <= sub.area.x2 && y >= sub.area.y1 && y <= sub.area.y2;
  };
};

const enteredAt = (x, y) => {
  return sub => {
    return !contains(mousex, mousey)(sub.area) && contains(x, y)(sub.area);
  };
};

const leftAt = (x, y) => {
  return sub => {
    return contains(mousex, mousey)(sub.area) && !contains(x, y)(sub.area);
  };
};

const trigger = (type, check, x, y) => {
  listeners.filter(hasType(type)).filter(check(x, y)).forEach(triggerAt(x, y));
};

const triggerAt = (x, y) => {
  return sub => sub.cb(x, y);
};

const move = (x, y) => {
  trigger('move', contains, x, y);
  trigger('enter', enteredAt, x, y);
  trigger('leave', leftAt, x, y);
};

const point = type => {
  return (x, y) => {
    trigger(type, contains, x, y);
  };
};

export default class Mouse {
  attach(element) {
    element.addEventListener('mousemove', handle(move));
    element.addEventListener('click', handle(point('click')));
    element.addEventListener('mousedown', handle(point('down')));
    element.addEventListener('mouseup', handle(point('up')));
  }

  listen(type, area, cb) {
    const sub = { type, area, cb };

    listeners.push(sub);

    return () => {
      const index = listeners.indexOf(sub);
      listeners.splice(index, 1);
    };
  }
}
