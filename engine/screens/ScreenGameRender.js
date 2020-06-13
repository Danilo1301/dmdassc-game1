ScreenGameRender = class extends Screen {
  static start() {

  }

  static update(delta) {

  }

  static render() {
    Render.fillBackground("#000628");

    Gui.render();
    Fade.render();
  }
}
