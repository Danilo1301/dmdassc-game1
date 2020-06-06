Input = class {
  static mouse = {position: {x: 0, y: 0}, isDown: false};
  static keys = {};

  static Initialize() {
    window.addEventListener("mousemove", e => {
      var rect = Screen.canvas.getBoundingClientRect();

      this.mouse.position.x = (e.clientX - rect.left) / Screen.scale.x,
      this.mouse.position.y = (e.clientY - rect.top) / Screen.scale.y
    });

    window.addEventListener("mouseup", e => { this.mouse.isDown = false; });
    window.addEventListener("mousedown", e => { this.mouse.isDown = true; });
    window.addEventListener("keydown", e => { this.keys[e.keyCode] = true; });
    window.addEventListener("keyup", e => { delete this.keys[e.keyCode]; });
  }

  static IsKeyDown(keyCode) {
    return this.keys[keyCode] != undefined;
  }
}
