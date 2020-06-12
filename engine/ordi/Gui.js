Gui = class {
  static buttons = [];
  static visible = true;

  static Update() {
    if(!this.visible) { return }
    for (var button of this.buttons) { button.Update(); }
  }

  static Render() {
    if(!this.visible) { return }
    for (var button of this.buttons) { button.Draw(); }
  }

  static OnMouseState(state) {
    if(!this.visible) { return }
    for (var button of this.buttons) { button.OnMouseState(state); }
  }

  static Hide() {
    this.visible = false;
  }
}
