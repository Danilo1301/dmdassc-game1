Server = class {
  constructor(id) {
    this.id = id;
    this.entities = {};
    this.clients = {};
  }

  Update(dt) {
    for (var entity_id in this.entities) { this.entities[entity_id].Update(dt); }

    for (var client_id in this.clients) {
      var client = this.clients[client_id];

      for (var entity_id in this.entities) {
        var entity = this.entities[entity_id];

        if(!client.entity_history[entity_id]) {
          client.entity_history[entity_id] = {};
        }

        client.entity_history[entity_id].position = client.entity_history[entity_id].position || [];

        client.entity_history[entity_id].position.push({t: Date.now() - client.lastUpdated, x: entity.position.x, y: entity.position.y});
      }
    }


  }

  HandleConnection(callback) {
    var id = Utils.AvaliableId(this.clients);
    var client = new ClientHandle(id);
    client.playerEntity = this.CreateEntity();
    this.clients[id] = client;
    callback({id: id, playerEntity: client.playerEntity.id});
  }

  CreateEntity(options) {
    options = options || {};

    var entity = new Entity();
    entity.server = this;

    if(options.id != undefined) {
      entity.id = options.id;
    } else {
      entity.id = Utils.AvaliableId(this.entities);
    }

    if(options.position != undefined) {
      entity.position.x = options.position.x;
      entity.position.y = options.position.y;
    }

    if(options.size != undefined) {
      entity.size = options.size;
    }

    entity.CreateColision();

    this.entities[entity.id] = entity;
    return entity;
  }
}
