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


    Net.emit({id: "login", id_token: GoogleApi.auth2.currentUser.get().getAuthResponse().id_token}, (user) => {
      console.log(user)
      if(user) {
        return Screens.setCurrentScreen(ScreenServersList);
      }
      Gui.createMessageBox("Info", 'Invalid id token');
      Screens.setCurrentScreen(ScreenMain);
    });
    Screens.setCurrentScreen(ScreenLoading);


    return;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/tokensignin');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      Gui.createMessageBox("Info", 'Signed in as: ' + xhr.responseText);
      Screens.setCurrentScreen(ScreenServersList);
    };
    xhr.send('idtoken=' + id_token);

    return

    //Gui.createMessageBox("Info", `Welcome, ${GoogleApi.auth2.currentUser.get().getBasicProfile().getName()}!`);
  }

  static update(delta) {

  }

  static render() {
    Render.fillBackground("black");


    Gui.render();
    Fade.render();
  }
}
