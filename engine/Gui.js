Gui = class {
  static buttons = [];
  static messageBoxes = [];
  static visible = true;

  static createMessageBox(title, message) {
    var msgbox = new MessageBox(title, message);
    this.messageBoxes.push(msgbox);
    return msgbox;
  }

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
    for (var msgbox of this.messageBoxes) { msgbox.update(); }
  }

  static render() {
    if(!this.visible) { return }
    for (var button of this.buttons) { button.draw(); }
    for (var msgbox of this.messageBoxes) { msgbox.draw(); }
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
