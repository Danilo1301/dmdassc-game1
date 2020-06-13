MOUSE_STATE = {UP: 0, DOWN: 1};

Input = class {
  static mouse = {position: {x: 0, y: 0}, isDown: false};
  static keys = {};
  static history = [];
  static client;

  static Load(client) {
    this.client = client;

    window.addEventListener("mousemove", e => {
      var rect = Render.canvas.getBoundingClientRect();

      this.mouse.position.x = (e.clientX - rect.left) / Render.scale.x,
      this.mouse.position.y = (e.clientY - rect.top) / Render.scale.y
    });

    window.addEventListener("mouseup", e => {
      Gui.OnMouseState(MOUSE_STATE.UP);
      this.mouse.isDown = false;
    });
    window.addEventListener("mousedown", e => {
      Gui.OnMouseState(MOUSE_STATE.DOWN);
      this.mouse.isDown = true;

      //this.RecordInput({mouse_down: true});
    });

    window.addEventListener("keydown", e => {
      this.keys[e.keyCode] = true;
      this.RecordInput({key: e.keyCode, down: true});
    });
    window.addEventListener("keyup", e => {
      delete this.keys[e.keyCode];
      this.RecordInput({key: e.keyCode, down: false});
    });
  }

  static RecordInput(type) {
    var input = {t: Date.now()};
    input = Object.assign(input, type);
    this.client.servers["local"].entities[client.connectedToServer.entity_id].inputs.push(input);
    this.history.push(input);
  }

  static Update(lastUpdated) {
    for (var h of this.history) {
      if(Date.now() > h.t + 1000) {
        this.history.splice(this.history.indexOf(h), 1);
      }
    }
  }

  static IsKeyDown(keyCode) {
    return this.keys[keyCode] != undefined;
  }
}
