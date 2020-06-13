ScreenMain = class extends Screen {
  static start() {
    Fade.in(500);

    Gui.createButton("Singleplayer", Render.resolution.w/2 - 800/2, 300, 800, 60).onClick(() => {

    });

    Gui.createButton("Multiplayer", Render.resolution.w/2 - 800/2, 400, 800, 60).onClick(() => {
      Gui.destroyButtons();
      Screens.setCurrentScreen(ScreenLoading);

      Net.connect(() => {

        GoogleApi.load(() => {
          Screens.setCurrentScreen(ScreenGoogleLogin);
        });

        //Screens.setCurrentScreen(ScreenServersList)
      });

    });
  }

  static update(delta) {}

  static render() {
    Render.fillBackground(Assets.get("bg_main_menu_1"));

    Gui.render();
    Fade.render();
  }
}
