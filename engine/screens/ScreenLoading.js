ScreenLoading = class extends Screen {
  static spinner_angle = 0;

  static start() {

  }

  static update(delta) {
    this.spinner_angle += 0.05;
  }

  static render() {
    Render.fillBackground("black");
    //Render.fillBackground("loading_1");
    //Render.fillBackground("cursor");

    Render.ctx.save();
    Render.translate(Render.resolution.w/2, Render.resolution.h/2);
    Render.ctx.rotate(this.spinner_angle);
    Render.drawImage(Assets.get("loading_1"), -25, -25, 50, 50)
    Render.ctx.restore();


    Gui.render();
    Fade.render();
  }
}
