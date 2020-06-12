Gui = class {
  static buttons = [];
  static visible = true;

  static createButton(text, x, y, width, height) {
    var button = new Button(text, x, y, width, height);
    this.buttons.push(button);
    return button;
  }

  static destroyButtons() {
    this.buttons = [];
  }

  static update() {
    this.updatePointerLock();

    if(!this.visible) { return }
    for (var button of this.buttons) { button.update(); }
  }

  static render() {
    if(!this.visible) { return }
    for (var button of this.buttons) { button.draw(); }
  }

  static onMouseState(state) {
    if(!this.visible) { return }
    for (var button of this.buttons) { button.onMouseState(state); }

    if(state = MOUSE_STATE.DOWN) {
      Render.canvas.requestPointerLock()
    }
  }

  static updatePointerLock() {
    Mouse.isLocked = (document.pointerLockElement === Render.canvas || document.mozPointerLockElement === Render.canvas);
  }

  static hide() {
    this.visible = false;
  }
}
