Block = class {
  constructor() {
    this.position = {x: 0, y: 0};
  }

  draw(x, y) {
    Render.translate(x, y);

    Render.ctx.fillStyle = `rgb(255, 255, 255)`;
    Render.fillRect(0, 0, 128, 128);
    //Render.ctx.fillStyle = "black"
    //Render.fillText(`${Math.round(this.position.x)}, ${Math.round(this.position.y)}`, 0, 0);


    Render.translate(-x, -y);
  }
}
