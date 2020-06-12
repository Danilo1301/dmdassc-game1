renderingClientView = true;

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
    Input.Load(this);
  }

  SendData(data, callback) {
    //this.socket.emit("data", data);
    setTimeout(() => { masterServer.clients["LOCAL_CLIENT"].OnData(data, callback); }, Math.random()*0+200)

    //console.log(`[Client-send]`, data);
  }

  OnData(data) {
    //console.log(`[Client-get]`, data);

    if(data.id == "joined") {
      console.log("You have joined", data)
      var server = this.CreateServer("local");
      this.connectedToServer = data;
      this.SendEvents();
    }


  }

  SendEvents() {
    this.latency = Date.now() - this.lastUpdated;

    var inputs = [];

    if(this.lastUpdated) {
      for (var h of Input.history) {
        h.t = h.t - this.lastUpdated;
        inputs.push(h);
      }
    }

    this.lastUpdated = Date.now();

    this.SendData({id: "events", inputs: inputs}, ((data) => {

      var server = client.servers["local"];

      for (var entity_id in data.events.entities) {

        if(!server.entities[entity_id]) {
          server.CreateEntity({id: entity_id, position: {x: 0, y: 0}});
        }

        var info = data.events.entities[entity_id].info;

        var entity = server.entities[entity_id];
        if(client.connectedToServer.entity_id == entity_id) {
          entity.isPlayerEntity = true;
        }

        entity.ApplyInfo(info);
      }

      //console.log("EVENTS", data);

      this.SendEvents();

    }).bind(this));
  }

  StartMenu() {
    var button1 = new Button("Test server", 20, 80, 500, 80);
    button1.OnClick(this.CreateSingleplayer.bind(this));

    var button2 = new Button("Online", 20, 180, 500, 80);
    button2.OnClick(() => { this.ConnectOnline(); });

    var button3 = new Button("Demo server", 20, 280, 500, 80);
    button3.OnClick((() => {

      Gui.buttons.splice(0,Gui.buttons.length);

      var button1 = new Button("toggle render", 20, 60, 200, 40);
      button1.OnClick((function() {
        renderingClientView = !renderingClientView;
        console.log("toggle", renderingClientView)
      }).bind(this));



      //Gui.Hide();

      console.log("connecing to socket...");
      masterServer.OnConnection();

      this.SendData({id: "join_server", server_id: "server-1"});
    }).bind(this));
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
      client.latency = Date.now() - client.lastUpdated;
      entity.lastUpdated = Date.now();




    }
  }

  Update(dt) {
    Input.Update(this.lastUpdated);

    //if(this.recorded_mouse != undefined) {
      //this.recorded_mouse.push({t: Date.now() - this.lastUpdated, x: Input.mouse.position.x - Render.resolution.w/2, y: Input.mouse.position.y - Render.resolution.h/2});
    //}
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
    Render.FillText(`${this.gameLoop.fps} FPS ; ${(this.latency) || 0} ms`, 20, 30);
  }

  RenderServer() {
    var server = renderingClientView ? this.servers["local"] : masterServer.servers["server-1"];
    Render.FillBackground(renderingClientView ? "pink" : "gray");

    if(!server) { return; }

    Render.Translate(Render.resolution.w/2, Render.resolution.h/2);

    for (var entity_id in server.entities) { server.entities[entity_id].Draw(); }

    Render.Translate(-Render.resolution.w/2, -Render.resolution.h/2);
  }

  CreateSingleplayer() {
    //alert("Click on the button below pls :v")
    //return

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
