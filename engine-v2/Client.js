renderingViewOf = 1;

Client = class {
  static loaded = false;

  static Load() {
    this.Log("Loading...");
    Render.Load();
    this.loaded = true;

    this.Log(`Connecting to single player...`);
    Engine.servers["single-player"].HandleConnection(function(id) {
      console.log(`Connected as ${id}`);
    });

  }

  static Tick(dt) {
    if(!this.loaded) { return; }

    var server = renderingViewOf == 0 ? Engine.servers["single-player"] : Engine.servers["local"];

    Render.Resize();

    //Render server
    Render.FillBackground("white");
    Render.Translate(Render.resolution.w/2, Render.resolution.h/2);

    if(server) {

      //Update
      for (var entity of server.entities) {
        entity.Update(dt)
      }
      //--





      for (var entity of server.entities) {
        Render.ctx.fillStyle = "red";
        Render.FillRect(entity.position.x-25, entity.position.y-25, 50, 50);
      }
    }



  }

  static Log(text) {
    var args = [`[Client]`];
    for (var a of arguments) { args.push(a); }
    console.log.apply(null, args);
  }
}
