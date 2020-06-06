Server = class {
  constructor(name) {
    this.name = name;
    this.clients = {};
    this.entities = {};


    if(name != "local") {
      var animal0 = this.CreateEntity("Animal.0");
      var animal1 = this.CreateEntity("Animal.1");

      setInterval(() => {
        animal0.MoveToPosition(Math.random()*500-250, Math.random()*500-250);
      }, 3000)

      setInterval(() => {
        animal1.MoveToPosition(Math.random()*800-400, Math.random()*800-400);
      }, 5000)
    }


  }

  HandleConnection(clientHandle) {
    this.clients[clientHandle.id] = clientHandle;
    clientHandle.server = this;
  }

  CreateEntity(id, x, y) {
    var entity = new Entity(id);
    entity.position.x = x;
    entity.position.y = y;
    this.entities[id] = entity;
    return entity;
  }

  Update(dt) {
    for (var entity_id in this.entities) {
      this.entities[entity_id].Update(dt);
    }
  }
}
