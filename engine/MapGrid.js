MapGrid = class {
  static blocks = {};
  static view_area = {w: 1280, h: 720};
  static position = {x: 0, y: 0};
  static blockSize = 128;
  static gridSize = {x: 0, y: 0}
  static extraSides = {x: 0, y: 0}

  static setViewArea(w, h) {
    this.view_area.w = w;
    this.view_area.h = h;
  }

  static checkGridSize(current, viewarea) {
    var extra = 0;
    if((current*2+1)*this.blockSize - viewarea > this.blockSize) {
      extra += 1;
    }
    return extra;
  }

  static updateGrid() {
    var gridSize = this.gridSize;

    this.blocks = {};

    var blocks_side = {x: Math.ceil(gridSize.x/2), y: Math.ceil(gridSize.y/2)}

    blocks_side.x += this.extraSides.x = this.checkGridSize(blocks_side.x, MapGrid.view_area.w);
    blocks_side.y += this.extraSides.y = this.checkGridSize(blocks_side.y, MapGrid.view_area.h);

    console.log(blocks_side)

    for (var tile_x = -blocks_side.x; tile_x <= blocks_side.x; tile_x++) {

      for (var tile_y = -blocks_side.y; tile_y <= blocks_side.y; tile_y++) {

        var key = `${tile_x}:${tile_y}`;

        var block = {
          tile: {x: tile_x, y: tile_y},
          initial_position: {x: tile_x*this.blockSize - this.blockSize/2, y: tile_y*this.blockSize - this.blockSize/2}
        }
        block.position = {x: block.initial_position.x, y: block.initial_position.y};
        this.blocks[key] = block;
      }
    }
  }

  static update() {
    this.position.x = Camera.position.x;
    this.position.y = Camera.position.y;

    var old_gridSize = {x: this.gridSize.x, y: this.gridSize.y};

    this.gridSize = {
      x: Math.ceil(MapGrid.view_area.w/MapGrid.blockSize),
      y: Math.ceil(MapGrid.view_area.h/MapGrid.blockSize)
    };

    if(old_gridSize.x != this.gridSize.x || old_gridSize.y != this.gridSize.y) {
      console.log("Updating grid")
      this.updateGrid();
    }

    var gridwidth = (this.gridSize.x + (this.extraSides.x*2));
    var gridheigth = (this.gridSize.y + (this.extraSides.y*2));

    var blocks_side = {x: Math.ceil(this.gridSize.x/2) + this.extraSides.x, y: Math.ceil(this.gridSize.y/2) + this.extraSides.y}

    for (var block_key in this.blocks) {
      var block = this.blocks[block_key];


      if((block.initial_position.x + this.position.x) < -(blocks_side.x+1)*this.blockSize) {
        block.initial_position.x += (blocks_side.x*2 + 1)*this.blockSize;
        block.tile.x += (blocks_side.x*2+1);
      }

      if((block.initial_position.x + this.position.x) > (blocks_side.x)*this.blockSize) {
        block.initial_position.x -= (blocks_side.x*2 + 1)*this.blockSize;
        block.tile.x -= (blocks_side.x*2+1);
      }

      if((block.initial_position.y + this.position.y) < -(blocks_side.y+1)*this.blockSize) {
        block.initial_position.y += (blocks_side.y*2 + 1)*this.blockSize;
        block.tile.y += (blocks_side.y*2+1);
      }

      if((block.initial_position.y + this.position.y) > (blocks_side.y)*this.blockSize) {
        block.initial_position.y -= (blocks_side.y*2 + 1)*this.blockSize;
        block.tile.y -= (blocks_side.y*2+1);
      }

      block.position.x = block.initial_position.x + this.position.x;
      block.position.y = block.initial_position.y + this.position.y;

      block.chunk = {x: Math.ceil((block.tile.x-10)/21), y: Math.ceil((block.tile.y-10)/21)}
    }
  }

  static render() {
    //Render.fillBackground("black");



    Render.translate(Render.resolution.w/2, Render.resolution.h/2);


    for (var block_key in this.blocks) {
      var block = this.blocks[block_key];

      var x = block.position.x;
      var y = block.position.y;

      Render.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
      Render.fillRect(x, y, this.blockSize, this.blockSize);
      Render.ctx.fillStyle = "black";
      Render.fillText(`${block.chunk.x}, ${block.chunk.y}`, x+20, y+20);
      Render.fillText(`calaio`, x+20, y+40);
    }



    Render.translate(-Render.resolution.w/2, -Render.resolution.h/2);


  }
}
