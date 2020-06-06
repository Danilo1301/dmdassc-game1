ClientHandle = class {
  constructor(id) {
    this.id = id;
    this.keys_pressed = {};
    this.events = [];
  }

  OnReceiveData(data) {
    if(data.id == "join_server") {
      console.log(`[Client ${this.id}] Requested to join ${data.server_name}`);

      Engine.servers[data.server_name].HandleConnection(this);
    }

    if(data.id == "local_info") {

      for (var entity_id in this.server.entities) {
        var e = this.server.entities[entity_id];
        this.events.push({id: "update_entity", entity: {id: e.id, position: e.position}});
      }

      this.SendData({id: "events", events: this.events});
      this.events = [];
    }


  }

  SendData(data) {
    Net.OnReceiveData(data);
  }
}
