KEY_STATE = {UP: 0, DOWN: 1};

Input = class {
  static keys = {};
  static events = [];

  static load() {
    window.addEventListener("keydown", e => {
      this.events.push({state: KEY_STATE.DOWN, keyCode: e.keyCode});
    });

    window.addEventListener("keyup", e => {
      this.events.push({state: KEY_STATE.UP, keyCode: e.keyCode});
    });
  }

  static isKeyDown(keyCode) {
    return this.keys[keyCode] != undefined;
  }
}
