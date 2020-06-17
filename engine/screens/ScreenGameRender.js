ScreenGameRender = class extends Screen {
  static start() {
    Fade.in(500)
    MapGrid.setViewArea(1280, 720);
  }

  static update(delta) {
    World.update(delta);
    Camera.update();
    MapGrid.update();
  }

  static render() {
    Render.fillBackground("#000628");

    Render.translate(((1-Camera.dev_zoom)*Render.resolution.w)/2, ((1-Camera.dev_zoom)*Render.resolution.h)/2);
    Render.ctx.scale(Camera.dev_zoom, Camera.dev_zoom);
    
    MapGrid.render();
    World.render();

    Gui.render();
    Fade.render();
  }
}
