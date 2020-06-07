Client = class extends Engine {
  constructor() {
    super();

    this.StartGameLoop(true);
    this.Load();
    this.StartMenu();
  }

  Load() {
    Utils.Load();
    Render.Load();
    Input.Load();
  }

  StartMenu() {
    var button1 = new Button("Test server", 20, 80, 500, 80);
    button1.OnClick(this.CreateSingleplayer.bind(this));

    var button2 = new Button("Online", 20, 180, 500, 80);
    button2.OnClick(() => { this.ConnectOnline(); });
  }


  ConnectOnline() {
    console.log("online");
    this.socket = io();
    this.socket.emit("data", {id: "join_server", server_id: "server-1"});

    this.socket.on("data", this.OnReceiveData.bind(this));
  }

  OnReceiveData(data) {
    if(data.id == "joined") {
      Gui.Hide();
      var server = this.CreateServer("local");

      this.SendLocalInfo();
    }

  }

  SendLocalInfo() {
    this.socket.emit("data", {id: "local_info", info: {mouse: this.recorded_mouse}}, (data) => {
      this.ProcessServerInfo(data.info);
      this.SendLocalInfo();
    });
    this.recorded_mouse = [];
    this.lastUpdated = Date.now();
  }

  ProcessServerInfo(info) {
    var server = client.servers["local"];

    for (var entity_id in info.entities) {
      if(!server.entities[entity_id]) {
        server.CreateEntity({id: entity_id, position: {x: 0, y: 0}});
      }
      var entity = server.entities[entity_id];
      entity.history = info.entities[entity_id].position;
      entity.lastUpdated = Date.now();



    }
  }

  Update(dt) {
    if(this.recorded_mouse != undefined) {
      this.recorded_mouse.push({t: Date.now() - this.lastUpdated, x: Input.mouse.position.x - Render.resolution.w/2, y: Input.mouse.position.y - Render.resolution.h/2});
    }
    Gui.Update(dt);
  }

  Render() {
    if(!Render.loaded) { return; }
    Render.Resize();
    Render.FillBackground("white");
    this.RenderServer();
    Gui.Render();

    Render.ctx.textAlign = "left";
    Render.ctx.fillStyle = "black";
    Render.FillText(`${this.gameLoop.fps} FPS ; ${(Date.now() - client.lastUpdated) || 0} ms`, 20, 30);
  }

  RenderServer() {
    var server = this.servers["local"];

    if(!server) { return; }

    Render.Translate(Render.resolution.w/2, Render.resolution.h/2);

    for (var entity_id in server.entities) { server.entities[entity_id].Draw(); }

    Render.Translate(-Render.resolution.w/2, -Render.resolution.h/2);
  }

  CreateSingleplayer() {
    alert("Click on the button below pls :v")
    return

    Gui.Hide();
    var server = this.CreateServer("local");


    //server.HandleConnection(((info) => {
    //  this.connectedToServer = info;
    //}).bind(this));



    var enitiyA = server.CreateEntity({position: {x: Math.random()*500-250, y: Math.random()*500-250}});
    var enitiyB = server.CreateEntity({position: {x: Math.random()*500-250, y: Math.random()*500-250}});

    enitiyA.ApplyForce(30, 0);
    enitiyB.ApplyForce(-8, 0);

    for (var i = 0; i < 20; i++) {
      server.CreateEntity({position: {x: Math.random()*500-250, y: Math.random()*500-250}});
    }
  }
}
