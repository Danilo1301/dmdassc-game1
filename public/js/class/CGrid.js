class CGrid {
  static blocks = [];

  static position = {x: 0, y: 0};

  static Initializate() {
    this.view = {w: CScreen.resolution.w, h: CScreen.resolution.h}

    var dfx = Math.round((this.view.w/2)/128);
    var dfy = Math.round((this.view.h/2)/128);

    var limit = {x: dfx*128, y: dfy*128};

    //console.log(limit)

    for (var x = -dfx -2; x < dfx+2; x++) {
      for (var y = -dfy -2; y < dfy+2; y++) {
        var block = new this.Block(x*128, y*128);
        block.tile = {x: x, y: y};
        this.blocks.push(block);
      }
    }

    console.log(this.view);
  }

  static Draw() {


    for (var block of this.blocks) {
      var px = Math.round((CGame.camera_pos.x+64)/128);
      var py = Math.round((CGame.camera_pos.y+64)/128);

      block.position.x = block.initialPosition.x + px*128;
      block.position.y = block.initialPosition.y + py*128;
      block.Draw();

      CScreen.SetAttribute("fillStyle", "white");
      CScreen.FillText(`${block.tile.x + px}, ${block.tile.y + py}`, block.position.x-20, block.position.y);
    }


    return

    var difference = {x: CGame.camera_pos.x - this.position.x, y: CGame.camera_pos.y - this.position.y};
    this.position = {x: CGame.camera_pos.x, y: CGame.camera_pos.y};

    var dfx = Math.round((this.view.w/2)/128);
    var dfy = Math.round((this.view.h/2)/128);

    var max_x = (dfx+1)*128;
    var max_y = (dfy+1)*128;

    for (var block of this.blocks) {
      block.x += difference.x;
      block.y += difference.y;

      while(block.x > max_x) { block.x -= max_x*2 + 128*2 }
      while(block.x < -max_x-128) { block.x += max_x*2 + 128*2 }

      while(block.y > max_y) { block.y -= max_y*2 + 128*2 }
      while(block.y < -max_y-128) { block.y += max_y*2 + 128*2 }

      block.Draw();
    }
  }
}

CGrid.Block = class {
  constructor(x, y) {
    this.initialPosition = {x: x, y: y};
    this.position = {x: x, y: y};
    this.asset = CAssets.Get("block_0");
  }

  Draw() {
    CScreen.DrawImage(this.asset, this.position.x-64, this.position.y-64, 128, 128);
  }
}
