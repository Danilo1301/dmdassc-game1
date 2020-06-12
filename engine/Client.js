Client = class {
  constructor() {
    this.onLoadingScreen = false;
    this.onServersScreen = false;
    this.serverList = {};
  }

  onFinishLoad() {
    Gui.createButton("Singleplayer", Render.resolution.w/2 - 800/2, 300, 800, 60).onClick(() => {
      console.log("Singleplayer");
    });

    Gui.createButton("Multiplayer", Render.resolution.w/2 - 800/2, 400, 800, 60).onClick(() => {
      console.log("Multiplayer");

      Gui.destroyButtons();
      Fade.in(500, () => {

      });
      this.onLoadingScreen = true;
      Net.connect((info) => {
        this.onLoadingScreen = false;
        this.onServersScreen = true;
        Net.getServersList();
      });

    });



    Fade.in(500);
  }

  update(delta) {
    Gui.update(delta);
    Fade.update(delta);

    this.render();
  }

  render() {
    Assets.processAssets();

    Render.fillBackground(Assets.get("bg_main_menu_1"))

    this.drawLoadingScreen();
    this.drawServersScreen();

    Gui.render();
    Fade.render();
    Game.drawFPS(10, 20);
    Game.drawCursor();


    //Render.ctx.globalAlpha = "0.2";
    //Render.ctx.drawImage(Assets.get("bg_main_menu_1"), 0, 0);

  }

  drawLoadingScreen() {
    if(!this.onLoadingScreen) { return }

    Render.fillBackground("black")

    Render.ctx.textAlign = "left";
    Render.ctx.fillStyle = "white";
    Render.fillText(`Connecting to server...`, 10, Render.resolution.h-30);
  }

  drawServersScreen() {
    if(!this.onServersScreen) { return }

    Render.fillBackground(Assets.get("bg_servers_menu_1"));

    var i = 0;
    for (var server_id in this.serverList) {
      Render.ctx.fillStyle = "white";
      Render.fillRect(77, 117 + (i*50), 870, 40)
      Render.ctx.fillStyle = "black";
      Render.fillText(`${server_id} | ${0} players`, 90, 117 + (i*50) + 25);
      i++;
    }

    //Render.ctx.textAlign = "left";
    //Render.ctx.fillStyle = "white";
    //Render.fillText(`Connecting to server...`, 10, Render.resolution.h-30);
  }
}
