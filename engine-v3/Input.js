MOUSE_STATE = {UP: 0, DOWN: 1};

Input = class {
  static mouse = {position: {x: 0, y: 0}, isDown: false};
  static keys = {};

  static Load() {
    window.addEventListener("mousemove", e => {
      var rect = Render.canvas.getBoundingClientRect();

      this.mouse.position.x = (e.clientX - rect.left) / Render.scale.x,
      this.mouse.position.y = (e.clientY - rect.top) / Render.scale.y
    });

    window.addEventListener("mouseup", e => {
      Gui.OnMouseState(MOUSE_STATE.UP);
      this.mouse.isDown = false;
    });
    window.addEventListener("mousedown", e => {
      Gui.OnMouseState(MOUSE_STATE.DOWN);
      this.mouse.isDown = true;
    });

    window.addEventListener("keydown", e => { this.keys[e.keyCode] = true; });
    window.addEventListener("keyup", e => { delete this.keys[e.keyCode]; });
  }

  static IsKeyDown(keyCode) {
    return this.keys[keyCode] != undefined;
  }
}
