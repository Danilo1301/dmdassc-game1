Input = class {
  static keys = {};

  static load() {
    window.addEventListener("keydown", e => {
      this.keys[e.keyCode] = true;
    });

    window.addEventListener("keyup", e => {
      delete this.keys[e.keyCode];
    });
  }

  static isKeyDown(keyCode) {
    return this.keys[keyCode] != undefined;
  }
}
