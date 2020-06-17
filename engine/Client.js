Client = class {
  constructor() {
    Game.DEMO_SERVER = true;
  }

  onFinishLoad() {
    Screens.setCurrentScreen(ScreenMain);
    MasterServer.start();
  }

  processInputs() {
    if(Mouse.events.length > 0) {
      do {
        var e = Mouse.events.splice(0, 1)[0];
        Gui.onMouseState(e.state);
        Mouse.isDown = e.state;
      } while(Mouse.events.length > 0);
    }

    if(Input.events.length > 0) {
      do {
        var e = Input.events.splice(0, 1)[0];
        Input.keys[e.keyCode] = e.state;
      } while(Input.events.length > 0);
    }

  }

  tick(delta) {
    this.update(delta);
    this.render();
  }

  update(delta) {
    this.processInputs();

    Screens.update(delta);

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
