Entity = class {
  constructor() {
    this.id = null;
    this.position = {x: Math.round(Math.random()*200), y: Math.round(Math.random()*200)}
    this.size = 128;
    this.input_keys = {};
    this.walkSpeed = 10;
  }

  update(delta) {
    if(this.input_keys[65]) {
      this.position.x += this.walkSpeed*delta;
    }
    if(this.input_keys[68]) {
      this.position.x -= this.walkSpeed*delta;
    }
    if(this.input_keys[87]) {
      this.position.y += this.walkSpeed*delta;
    }
    if(this.input_keys[83]) {
      this.position.y -= this.walkSpeed*delta;
    }
  }

  draw(x, y) {
    Render.translate(x, y);

    Render.ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    Render.fillRect(-this.size/2, -this.size/2, this.size, this.size);
    Render.ctx.fillStyle = "black"
    Render.fillText(`Entity.${this.id}`, 0, 0);

    Render.translate(-x, -y);
  }
}

EntityPlayer = class extends Entity {

}

EntityMob = class extends Entity {

}
