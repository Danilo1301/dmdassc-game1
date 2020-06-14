ScreenGameRender = class extends Screen {
  static player = null;

  static start() {
    Fade.in(500)
    MapGrid.setViewArea(1280, 720);


  }

  static update(delta) {
    this.processInput(delta);

    Camera.update(delta);

    //Camera.position.x = Game.entity_player.position.x;
    //Camera.position.y = Game.entity_player.position.y;

    MapGrid.update();
  }

  static processInput(delta) {
    if(this.player) {
      this.player.input_keys = Input.keys;
    }
  }

  static render() {
    Render.fillBackground("#000628");

    Render.ctx.save();

    Render.translate(((1-Camera.dev_zoom)*Render.resolution.w)/2, ((1-Camera.dev_zoom)*Render.resolution.h)/2);
    Render.ctx.scale(Camera.dev_zoom, Camera.dev_zoom);



    MapGrid.render();

    //Render.translate(Game.entity_player.position.x, Game.entity_player.position.y);
    this.renderServer(DEV_RENDER_CLIENT_VIEW ? Game.server : MasterServer.servers["server-1"]);
    //Render.translate(-Game.entity_player.position.x, -Game.entity_player.position.y);



    Render.ctx.restore();



    Gui.render();
    Fade.render();
  }

  static renderServer(server) {
    Render.translate(Render.resolution.w/2, Render.resolution.h/2);

    for (var entity_id in server.entities) {
      var entity = server.entities[entity_id];

      entity.draw(Camera.position.x - entity.position.x, Camera.position.y - entity.position.y);
    }

    Render.translate(-Render.resolution.w/2, -Render.resolution.h/2);
  }
}
