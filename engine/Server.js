Server = class {
  constructor() {
    this.entities = {};
    this.blocks = {};
  }

  update(delta) {
    for (var entity_id in this.entities) {
      this.entities[entity_id].update(delta);
    }

    for (var block_id in this.blocks) {
      this.blocks[block_id].update(delta, this);
    }
  }

  onPlayerConnect(clientHandle, callback) {
    var entity = this.createEntity(new EntityPlayer());

    if(clientHandle == null) {
      World.player = entity;
    } else {
      console.log(`${clientHandle.uid} connected to server`)
    }

    callback({player_entity_id: entity.id});
  }

  generateChunk(cx, cy) {



    for (var x = -10+(21*cx); x <= 10+(21*cx); x++) {
      for (var y = -10+(21*cy); y <= 10+(21*cy); y++) {

        var value2 = Math.abs(noise.perlin2((x+100) / 5, (y+100) / 5)) *100;

        var value = Math.abs(noise.perlin2(x / 35, y / 35)) *100;

        // >60 idk
        // >15 grass
        //  grass >20 rock/trees
        // >5 sand
        // water

        var id = 0;

        if(value > 15) {
          id = 1;
        } else if(value > 5) {
          id = 2;
        } else {
          id = 0;
        }

        var block = this.createBlock(x, y, id);

        ///block.perlin = value;
        //block.perlin_2 = value2;
      }
    }
  }

  createDefaultWorld() {

    for (var i = 0; i < 10; i++) {
      this.createEntity(new EntityNPC());
    }

    var size = 100;

    noise.seed(Math.random())

    for (var x = -1; x <= 1; x++) {
      for (var y = -1; y <= 1; y++) {
        this.generateChunk(x, y);
      }
    }

  }

  createBlock(x, y, id) {

    var block = new Block(id);
    block.tile.x = x;
    block.tile.y = y;
    block.key = `${x}:${y}`;

    this.blocks[block.key] = block;
    return block;
  }

  createEntity(entity) {

    var id = Utils.getAvaliableId(this.entities);

    entity.id = id;
    this.entities[id] = entity;
    return entity;
  }
}
