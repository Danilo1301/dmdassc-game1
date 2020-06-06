Net = class {
  static id = null;

  static Connect(callback) {
    Engine.OnConnection();
    callback();
  }

  static OnReceiveData(data) {
    //console.log(`[Net] Received data from server:`, data);
    if(data.id == "join") {
      this.id = data.player_id;
      Client.server = new Server("local");
    }

    if(data.id == "events") {
      for (var e of data.events) {
        var entity = e.entity;
        if(Client.server.entities[entity.id] == undefined) {
          Client.server.entities[entity.id] = new Entity();
        }
      }
    }

  };

  static SendData(data) {
    console.log("send")
    Engine.clients[this.id].OnReceiveData(data);
  };
}
