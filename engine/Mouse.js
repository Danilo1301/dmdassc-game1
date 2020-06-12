MOUSE_STATE = {UP: 0, DOWN: 1};

Mouse = class {
  static position = {x: 0, y: 0};
  static isDown = false;
  static isLocked = false;

  static load() {
    window.addEventListener("mousemove", e => {
      var rect = Render.canvas.getBoundingClientRect();

      if(this.isLocked) {
        this.position.x += e.movementX;
        this.position.y += e.movementY;
      } else {
        this.position.x = (e.clientX - rect.left) / Render.scale.x,
        this.position.y = (e.clientY - rect.top) / Render.scale.y
      }

      this.position.x = this.position.x.clamp(0, Render.resolution.w);
      this.position.y = this.position.y.clamp(0, Render.resolution.h);
    });

    window.addEventListener("mouseup", e => {
      Gui.onMouseState(MOUSE_STATE.UP);
      this.isDown = false;
    });

    window.addEventListener("mousedown", e => {
      Gui.onMouseState(MOUSE_STATE.DOWN);
      this.isDown = true;
    });
  }
}
