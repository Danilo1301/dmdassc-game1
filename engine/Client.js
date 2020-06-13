

Client = class {
  constructor() {
    Game.DEMO_SERVER = true;
  }

  onFinishLoad() {
    Screens.setCurrentScreen(ScreenMain);
    MasterServer.start();
  }

  tick(delta) {
    Screens.update(delta);

    this.update(delta);
    this.render();
  }

  update(delta) {
    Gui.update(delta);
    Fade.update(delta);
  }

  render() {
    Assets.processAssets();
    Render.fillBackground("black");

    Screens.render();

    Game.drawFPS(10, 20);
    Game.drawCursor();
  }
}
