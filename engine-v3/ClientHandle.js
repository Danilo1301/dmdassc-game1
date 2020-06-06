ClientHandle = class {
  constructor(server, id) {
    this.id = id;
    this.server = server;
    this.entities_data = {};
    this.lastSent = Date.now();
  }

  GetInfo() {
    var info = {entities: {}};

    for (var entity_id in this.server.entities) {
      var entity = this.server.entities[entity_id];
      info.entities[entity_id] = {id: entity.id, position: entity.position, data: this.entities_data[entity.id]};
      this.entities_data = {};
    }

    return info;
  }

  OnReceiveData(data, callback) {
    setTimeout(() => {
      this.lastSent = Date.now();
      callback({id: "info", info: this.GetInfo()});
    }, Math.random()*80+200)
  }


}
