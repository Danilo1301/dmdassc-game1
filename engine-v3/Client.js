renderingView = 0;


Client = class {
  constructor(engine) {
    this.engine = engine;
    this.id = null;

    this.rendering = false;

    Render.Load();
    Input.Load();



    var button1 = new Button("Test server", 20, 80, 500, 80);
    button1.OnClick((() => {
      Gui.Hide();
      this.rendering = true;
      var server = this.engine.CreateServer("local");

      var enitiyA = server.CreateEntity({position: {x: -100, y: 0}});
      var enitiyB = server.CreateEntity({position: {x: 100, y: 0}});

      enitiyA.ApplyForce(8, 0);
      enitiyB.ApplyForce(-8, 0);


    }).bind(this));

    var button2 = new Button("Online", 20, 180, 500, 80);
    button2.OnClick(() => { console.log("online"); });

    //this.engine.CreateServer("local");

    //this.ConnectToServer('server-1');
  }

  ConnectToServer(id) {
    var self = this;
    console.log(`Connecting to server ${id}..`);
    engineServer.servers["server-1"].HandleConnection(function (data) {
      self.client_id = data.client_id;
      console.log(`Connected`, self.client_id);

      self.engine.CreateServer("local");

      self.RequestServerData();
    });
  }

  ProcessInfo(data) {
    this.delay = Date.now() - this.lastReceived;
    this.lastReceived = Date.now();

    var server = this.engine.servers["local"];

    var entities_created = [];

    for (var entity_id in data.info.entities) {
      var entity = data.info.entities[entity_id];

      if(server.entities[entity_id] == undefined) {
        var new_entity = server.CreateEntity(0, 0);
      }

      server.entities[entity.id].processingFrames = {started: Date.now(), current: 0};
      server.entities[entity.id].frames = entity.data;

      //server.entities[entity.id].position.x = entity.position.x;
      //server.entities[entity.id].position.y = entity.position.y;
      //console.log(entity.data.length)
    }

  }

  RequestServerData() {
    var self = this;
    setTimeout(() => {
      engineServer.servers["server-1"].clients[this.client_id].OnReceiveData({id: "info"}, function (info) {
        self.ProcessInfo(info);
        self.RequestServerData();
      });
    }, Math.random()*80+700)
  }

  Update(dt) {
    Gui.Update();
  }

  Render() {
    Render.Resize();

    Render.ctx.save();

    if(this.rendering) {
      Render.FillBackground("white");

      var server = this.engine.servers["local"];

      Render.Translate(Render.resolution.w/2, Render.resolution.h/2);

      for (var entity_id in server.entities) {
        var entity = server.entities[entity_id];
        if(entity.moving) {
          Render.ctx.fillStyle = "gray";
        } else {
          Render.ctx.fillStyle = "black";
        }

        if(entity.coliding) {
          Render.ctx.fillStyle = "red";
        }

        Render.FillRect(entity.position.x-(entity.size/2), entity.position.y-(entity.size/2), entity.size, entity.size);
        Render.ctx.fillStyle = "red";
        Render.FillRect(entity.target_position.x-5, entity.target_position.y-5, 10, 10);
        Render.ctx.fillStyle = "blue";
        Render.FillRect(entity.move_to.x-5, entity.move_to.y-5, 10, 10);
      }

      for (var body of server.Collision.bodies) {
        for (var part of body.parts) {
          if(body.isColliding) {
            Render.ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
          } else {
            Render.ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
          }
          Render.FillRect(body.position.x + part.x, body.position.y + part.y, part.width, part.height);

        }
      }
    } else {
      Render.FillBackground("#212121");
    }

    Gui.Render();

    Render.ctx.restore();

    Render.ctx.textAlign = "left";
    Render.ctx.fillStyle = "black";
    Render.FillText(`${this.fps} FPS`, 20, 30);

  }

  Tick(dt) {
    this.Update(dt);
    this.Render();



    return


    if(!engineServer) { return }

    Render.FillBackground("white");

    var server = renderingView == 0 ? this.engine.servers["local"] : engineServer.servers["server-1"];

    if(server) {
      Render.FillBackground(renderingView == 0 ? "pink" : "#3e25a5");

      Render.ctx.fillStyle = "black";
      Render.FillText(`${this.fps} FPS ; ${this.delay}ms (${renderingView == 0 ? "CLIENT" : "SERVER"})`, 10, 20)

      Render.Translate(Render.resolution.w/2, Render.resolution.h/2);

      for (var entity_id in server.entities) {
        var entity = server.entities[entity_id];
        Render.ctx.fillStyle = "black";
        Render.FillRect(entity.position.x-25, entity.position.y-25, 50, 50);
        Render.ctx.fillStyle = "red";
        Render.FillRect(entity.target_position.x-5, entity.target_position.y-5, 10, 10);
        Render.ctx.fillStyle = "blue";
        Render.FillRect(entity.move_to.x-5, entity.move_to.y-5, 10, 10);
      }
    }
  }
}
