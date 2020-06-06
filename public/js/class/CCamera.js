class CCamera {
  static mouse = {
    screenPosition: {},
    isDown: false
  }

  static Initializate() {}

  static Update() {
    this.mouse.screenPosition = {x: CInput.mouse.position.x, y: CInput.mouse.position.y};
    this.mouse.worldPosition = this.ScreenToWorld(this.mouse.screenPosition.x, this.mouse.screenPosition.y);
    this.mouse.isDown = CInput.mouse.isDown;
  }

  static ScreenToWorld(x, y) {
    return {
      x: x,
      y: y
    };
  }
}
