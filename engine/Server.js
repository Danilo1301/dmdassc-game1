Server = class {
  constructor() {
    this.entities = {};
  }

  update(delta) {
    for (var entity_id in this.entities) {
      this.entities[entity_id].update(delta);
    }
  }

  onPlayerConnect(clientHandle, callback) {
    var entity = this.createEntity(EntityPlayer);

    if(clientHandle == null) {
      //Game.entity_player = entity;
      ScreenGameRender.player = entity;
    } else {
      console.log(`${clientHandle.uid} connected to server`)
    }



    console.log(entity)

    callback({player_entity_id: entity.id});
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
