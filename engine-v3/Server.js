Server = class {
  constructor(id) {
    this.id = id;
    this.entities = {};
    this.clients = {};
    this.Collision = new Collision();
  }

  HandleConnection(callback) {
    var id = Math.round(Math.random()*100);
    var client = new ClientHandle(this, id);
    this.clients[id] = client;
    callback({id: "join", client_id: id});
  }

  CreateEntity(options) {
    options = options || {};

    var entity = new Entity(this);
    entity.server = this;

    if(options.id != undefined) {
      entity.id = options.id;
    } else {
      var id = 0;
      for (var entity_id in this.entities) {
        if(this.entities[entity_id].id != id) { break; }
        id++;
      }
      entity.id = id;
    }

    if(options.position != undefined) {
      entity.position.x = options.position.x;
      entity.position.y = options.position.y;
    }
    entity.collision.position.x = entity.position.x;
    entity.collision.position.y = entity.position.y;
    this.entities[entity.id] = entity;
    return entity;
  }

  Tick(dt) {
    this.Collision.Update(dt);
    for (var entity_id in this.entities) { this.entities[entity_id].Update(dt, this); }

    return

    for (var entity_id in this.entities) {
      this.entities[entity_id].Update(dt);
    }

    for (var client_id in this.clients) {
      for (var entity_id in this.entities) {
        var entity = this.entities[entity_id];
        if(!this.clients[client_id].entities_data[entity.id]) {
          this.clients[client_id].entities_data[entity.id] = [];
        }

        this.clients[client_id].entities_data[entity.id].push({t: Date.now()-this.clients[client_id].lastSent, position: {x: entity.position.x, y: entity.position.y}});
      }
    }
  }
}
