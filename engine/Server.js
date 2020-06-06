Server = class {
  constructor(id) {
    this.id = id;
    this.entities = {};
    this.clients = {};
  }

  Update(dt) {
    for (var entity_id in this.entities) { this.entities[entity_id].Update(dt); }
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
