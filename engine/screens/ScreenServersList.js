DEV_RENDER_CLIENT_VIEW = true;


ScreenServersList = class extends Screen {
  static servers_list = {};
  static buttons = {};

  static start() {
    Gui.show();
    this.getServersList(() => {
      console.log("got", this.servers_list)
    });
    //this.joinServer("server-1")
  }

  static getServersList(callback) {
    Net.emit({id: "servers_list"}, (servers) => {
      this.servers_list = servers;
      callback();
    });
  }

  static update(delta) {
    for (var server_id in this.servers_list) {
      if(!this.buttons[server_id]) {
        this.buttons[server_id] = Gui.createButton(server_id, 50, 50, Render.resolution.w-100, 50);
        this.buttons[server_id].onClick(() => {
          this.joinServer(server_id);
        });
      }
    }
  }

  static joinServer(server_id) {
    Gui.destroyButtons();
    Screens.setCurrentScreen(ScreenLoading);

    Net.emit({id: "join_server", server_id: server_id}, (info) => {
      Game.server = new Server();
      Screens.setCurrentScreen(ScreenGameRender);
      Game.serverInfo = info;

  

      Gui.createButton("Change view", 50, 50, 200, 30).onClick(() => {
        DEV_RENDER_CLIENT_VIEW = !DEV_RENDER_CLIENT_VIEW;
      });

    });
  }

  static render() {
    Render.fillBackground("black");

    Gui.render();
    Fade.render();
  }
}
