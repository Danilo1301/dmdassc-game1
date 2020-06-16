ScreenMain = class extends Screen {
  static start() {
    Fade.in(500);

    Gui.createButton("Singleplayer", Render.resolution.w/2 - 800/2, 300, 800, 60).onClick(() => {
      this.joinSinglePlayer();
    });

    Gui.createButton("Multiplayer", Render.resolution.w/2 - 800/2, 400, 800, 60).onClick(() => {
      this.joinMultiplayer();
    });

    //this.joinSinglePlayer();
    //this.joinMultiplayer();
  }

  static joinSinglePlayer() {
    Gui.destroyButtons();
    Screens.setCurrentScreen(ScreenGameRender);

    Game.server = new Server();
    Game.server.createEntity(EntityMob);
    Game.server.onPlayerConnect(null, (a) => {
      console.log(a)
    });

    Gui.createButton("Set camera to follow", 50, 50, 200, 30).onClick(() => {
      Camera.followEntity(Camera.entity_following == null ? ScreenGameRender.player : null)
    });
  }

  static joinMultiplayer() {
    Gui.destroyButtons();
    Screens.setCurrentScreen(ScreenLoading);

    Net.connect(() => {
      GoogleApi.load(() => { Screens.setCurrentScreen(ScreenGoogleLogin); });
    });
  }

  static update(delta) {}

  static render() {
    Render.fillBackground(Assets.get("bg_main_menu_1"));

    Gui.render();
    Fade.render();
  }
}
