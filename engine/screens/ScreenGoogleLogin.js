ScreenGoogleLogin = class extends Screen {
  static start() {
    if(!GoogleApi.isSignedIn) {
      Gui.createButton("Google Login", Render.resolution.w/2-400, Render.resolution.h/2-30, 800, 60).onClick(() => {
        Gui.destroyButtons();
        GoogleApi.signIn(() => {
          Screens.setCurrentScreen(ScreenGoogleLogin);
        });
        Screens.setCurrentScreen(ScreenLoading);
      });
      return
    }

    //Gui.createMessageBox("Info", `Welcome, ${GoogleApi.auth2.currentUser.get().getBasicProfile().getName()}!`);
    Screens.setCurrentScreen(ScreenServersList);
  }

  static update(delta) {

  }

  static render() {
    Render.fillBackground("black");


    Gui.render();
    Fade.render();
  }
}
