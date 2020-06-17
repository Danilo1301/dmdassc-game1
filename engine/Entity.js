Entity = class {
  constructor() {
    this.id = null;
    this.position = {x: 0, y: 0}
    this.size = 40;
    this.keys = {};
    this.mouse = {position: {x: 0, y: 0}, isDown: false};
    this.walkSpeed = 100;
    this.color = [255, 255, 255];
  }

  update(delta) {
    if(this.keys[65]) {
      this.position.x += this.walkSpeed * delta;
    }
    if(this.keys[68]) {
      this.position.x -= this.walkSpeed * delta;
    }

    if(this.keys[87]) {
      this.position.y += this.walkSpeed * delta;
    }
    if(this.keys[83]) {
      this.position.y -= this.walkSpeed * delta;
    }

  }

  draw(x, y) {
    Render.translate(x, y);

    Render.imageSmoothingEnabled = false
    Render.drawImage(Assets.get("player"), -(this.size*3)/2, -this.size*3, this.size*3, this.size*3);
    Render.imageSmoothingEnabled = true

    Render.ctx.fillStyle = `rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, 0.3)`;
    Render.fillRect(-this.size/2, -this.size/2, this.size, this.size);
    Render.ctx.fillStyle = "black"
    Render.fillText(`${Math.round(this.position.x)}, ${Math.round(this.position.y)}`, 0, 0);


    Render.translate(-x, -y);
  }
}

EntityPlayer = class extends Entity {
  constructor() {
    super();

    this.walkSpeed = 400;
  }
}

EntityMob = class extends Entity {
  constructor() {
    super();

    this.color = [0, 0, 0];


    setInterval(() => {
      this.color = [Math.random()*255, Math.random()*255, Math.random()*255];
    },2000)

    setInterval(() => {
      this.keys[65] = Math.random()>0.5 ? true : false;
      this.keys[68] = Math.random()>0.5 ? true : false;
      this.keys[83] = Math.random()>0.5 ? true : false;
      this.keys[87] = Math.random()>0.5 ? true : false;
    },500)
  }
}
