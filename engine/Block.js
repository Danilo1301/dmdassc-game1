Block = class {
  constructor(id) {
    this.id = id;
    this.tile = {x: 0, y: 0}
    this.key = "";
    this.position = {x: 0, y: 0};
    this.neighbours = [];

    this.asset = Assets.get("block_" + this.id);
  }

  update(delta, server) {
    this.neighbours = []

    var test = `${this.tile.x}:${this.tile.y-1}`;

    if(server.blocks[test]) {
      if(server.blocks[test].id == this.id) {
        this.neighbours.push([0, -1]);
      }
    }


  }

  draw(x, y) {
    Render.translate(x, y);

    Render.drawImage(this.asset, 0, -this.asset.image.height+128, 128, this.asset.image.height)









    //Render.fillText(`${this.perlin_2.toFixed(2)}`, 20, 40);


    Render.translate(-x, -y);
  }
}
