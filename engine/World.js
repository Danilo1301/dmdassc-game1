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

    var drawables = [];

    for (var k in MapGrid.blocks) {
      var tile = `${MapGrid.blocks[k].tile.x}:${MapGrid.blocks[k].tile.y}`

      if(server.blocks[tile]) {
        server.blocks[tile].position.x = MapGrid.blocks[k].initial_position.x;
        server.blocks[tile].position.y = MapGrid.blocks[k].initial_position.y;

        drawables.push({position: {x: server.blocks[tile].position.x, y: server.blocks[tile].position.y}, e: server.blocks[tile] });
      }
    }


    for (var entity_id in server.entities) {
      var entity = server.entities[entity_id];

      drawables.push({position: {x: entity.position.x, y: entity.position.y}, e: entity});
    }

    drawables = drawables.sort((a, b) => {
      return a.position.y - b.position.y
    });

    Render.translate(Camera.position.x, Camera.position.y)

    for (var obj of drawables) {
      obj.e.draw(obj.position.x, obj.position.y);
    }

    Render.translate(-Camera.position.x, -Camera.position.y)






    Render.translate(-Render.resolution.w/2, -Render.resolution.h/2);

    Render.ctx.restore();
  }
}
