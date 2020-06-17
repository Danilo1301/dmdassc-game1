Button = class {
  constructor(text, x, y, width, height) {
    this.text = text;
    this.position = {x: x, y: y};
    this.width = width;
    this.height = height;

    this.onClick_fn = null;
    this.selected = false;
    this.isMouseOver = false;
  }

  onMouseState(state) {
    if(state == MOUSE_STATE.DOWN && this.isMouseOver) {
      this.selected = true;
    }

    if(state == MOUSE_STATE.UP) {
      if(this.selected && this.onClick_fn && this.isMouseOver) { this.onClick_fn(); }
      this.selected = false;
    }
  }

  onClick(fn) {
    this.onClick_fn = fn;
  }

  update() {
    this.isMouseOver = Utils.isPointInsideRect(Mouse.position, {x: this.position.x, y: this.position.y, width: this.width, height: this.height});
  }

  draw() {
    if(this.isMouseOver) {
      Render.setAttribute("fillStyle", this.selected ? "#626477" : "#7882E2");
    } else {
      Render.setAttribute("fillStyle", "#ffffff");
    }

    Render.fillRect(this.position.x, this.position.y, this.width, this.height);

    Render.ctx.textAlign = "center";
    Render.ctx.fillStyle = "black";
    Render.fillText(this.text, this.position.x + this.width/2, this.position.y + this.height/2+5)
  }
}
