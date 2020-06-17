Server = class {
  constructor() {
    this.entities = {};
    this.blocks = {};
  }

  update(delta) {
    for (var entity_id in this.entities) {
      this.entities[entity_id].update(delta);
    }
  }

  onPlayerConnect(clientHandle, callback) {
    var entity = this.createEntity(EntityPlayer);

    if(clientHandle == null) {
      World.player = entity;
    } else {
      console.log(`${clientHandle.uid} connected to server`)
    }

    callback({player_entity_id: entity.id});
  }

  createDefaultWorld() {
    for (var i = 0; i < 10; i++) {
      this.createEntity(EntityMob);
    }

    for (var x = -20; x < 5; x++) {
      for (var y = -5; y < 5; y++) {
        this.createBlock(x, y, 0);
      }
    }

  }

  createBlock(x, y, id) {

    var block = new Block();
    block.id = `${x}:${y}`;

    this.blocks[block.id] = block;
    return block;
  }

  createEntity(type) {
    var entity;

    switch (type) {
      case EntityPlayer:
        entity = new EntityPlayer();
        break;
      case EntityMob:
        entity = new EntityMob();
        break;
      default:
        entity = new Entity();
    }

    var id = Utils.getAvaliableId(this.entities);

    entity.id = id;
    this.entities[id] = entity;
    return entity;
  }
}
