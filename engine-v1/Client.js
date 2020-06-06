var lastSendData = Date.now();
var sendDataInterval = 250;

Client = class {

  static Initialize() {
    Screen.Initialize();
    Input.Initialize();

    if(!this.isServer) {
      Net.Connect(function() {
        Net.SendData({id: "join_server", server_name: "server-1"});
      });
    }
  }


  static Tick(dt) {
    this.Update(dt);

    Engine.Update(); //remove from here

    if(this.isServer) {
      //Engine.Update();
    } else {
      Screen.Resize();
      this.Render();
    }
  }

  static Update(dt) {
    if(!this.isServer) {
      if(Date.now() > lastSendData + sendDataInterval) {
        lastSendData = Date.now();
        Net.SendData({id: "local_info", info: Input.keys});
      }
    }
  }

  static Render() {
    Screen.FillBackground("white");

    Screen.Translate(Screen.resolution.w/2, Screen.resolution.h/2)

    for (var entity of Client.server.entities) {
      Screen.SetAttribute("fillStyle", "red");
      Screen.FillRect(entity.position.x-25, entity.position.y-25, 50, 50);
    }

    console.log("render end")
  }
}
