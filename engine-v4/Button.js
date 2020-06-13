Button = class {
  constructor(text, x, y, width, height) {
    this.text = text;
    this.position = {x: x, y: y};
    this.width = width;
    this.height = height;

    this.onClick_fn = null;
    this.selected = false;

    Gui.buttons.push(this);
  }

  OnMouseState(state) {
    if(state == MOUSE_STATE.DOWN && this.isMouseOver) { this.selected = true; }

    if(state == MOUSE_STATE.UP) {
      if(this.selected && this.onClick_fn && this.isMouseOver) { this.onClick_fn(); }
      this.selected = false;
    }
  }

  OnClick(fn) {
    this.onClick_fn = fn;
  }

  Update() {
    this.isMouseOver = Utils.isPointInsideRect(Input.mouse.position, {x: this.position.x, y: this.position.y, width: this.width, height: this.height});
  }

  Draw() {
    if(this.isMouseOver) {
      Render.SetAttribute("fillStyle", this.selected ? "#626477" : "#7882E2");
    } else {
      Render.SetAttribute("fillStyle", "#8793FF");
    }

    Render.FillRect(this.position.x, this.position.y, this.width, this.height);

    Render.ctx.textAlign = "center";
    Render.ctx.fillStyle = "black";
    Render.FillText(this.text, this.position.x + this.width/2, this.position.y + this.height/2+5)
  }
}
