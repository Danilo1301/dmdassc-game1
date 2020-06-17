World = class {
  static server = null;
  static player = null;

  static update(delta) {
    if(World.player) {
      World.player.keys = Input.keys;
    }


    if(this.server) { this.server.update(delta); }
  }

  static render() {
    this.renderServer(DEV_RENDER_CLIENT_VIEW ? World.server : MasterServer.servers["server-1"]);
  }

  static renderServer(server) {

    if(!server) {
      return console.log("SERVER_NOT_FOUND", server);
    }

    Render.ctx.save();

    Render.translate(Render.resolution.w/2, Render.resolution.h/2);


    for (var k in MapGrid.blocks) {
      var tile = `${MapGrid.blocks[k].tile.x}:${MapGrid.blocks[k].tile.y}`

      if(server.blocks[tile]) {

        var block = server.blocks[tile];

        block.draw(MapGrid.blocks[k].position.x, MapGrid.blocks[k].position.y);
      }
    }


    var entities = [];

    for (var entity_id in server.entities) {
      var entity = server.entities[entity_id];

      entities.push(entity);

    }

    entities = entities.sort((a, b) => {
      return b.position.y - a.position.y
    });

    for (var entity of entities) {
      entity.draw(Camera.position.x - entity.position.x, Camera.position.y - entity.position.y);
    }






    Render.translate(-Render.resolution.w/2, -Render.resolution.h/2);

    Render.ctx.restore();
  }
}
