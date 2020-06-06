Server = class {
  constructor(id) {
    this.id = id;
    this.entities = [];
    this.clients = {};
  }

  HandleConnection(callback) {
    var id = Math.round(Math.random()*100);
    var client = new ClientHandle(id);
    this.clients[id] = client;

    client.player_entity = this.CreateEntity(0, 0);

    callback(id);
  }

  CreateEntity(x, y) {
    var entity = new Entity(this.entities.length, x, y);
    this.entities.push(entity);
    entity.Log("Created");
    return entity;
  }

  Log(text) {
    var args = [`[Server : ${this.id}]`];
    for (var a of arguments) { args.push(a); }
    console.log.apply(null, args);
  }
}
