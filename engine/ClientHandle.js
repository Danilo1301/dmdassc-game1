ClientHandle = class {
  constructor(socket, master) {
    this.master = master;
    this.id = socket.id;
    this.socket = socket;

    socket.on("data", this.OnReceiveData.bind(this));
  }

  OnReceiveData(data, callback) {
    if(data.id == "join_server") {
      this.master.ConnectPlayer(this, data.server_id);
    }

    if(data.id == "local_info") {
      console.log(data)
      setTimeout(() => {
        callback({info: this.GetServerInfo()});
      },350)

    }
  }

  GetServerInfo() {
    var info = {entities: {}};

    for (var entity_id in this.server.entities) {
      info.entities[entity_id] = {
        position: this.server.entities[entity_id].position,
        size: this.server.entities[entity_id].size
      }
    }

    return info;
  }
}
