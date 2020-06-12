Fade = class {
  static mode = 0;
  static time = 1000;
  static current = null;
  static callback = null;
  static color = [0, 0, 0];

  static out(time, callback) {
    this.time = time;
    this.mode = 0;
    this.current = 0;
    this.callback = callback;
  }

  static in(time, callback) {
    this.time = time;
    this.mode = 1;
    this.current = 1;
    this.callback = callback;
  }

  static update(delta) {
    if(this.current == null) { return }

    this.current += (this.mode == 0 ? 1 : -1) * delta/this.time;

    if(this.mode == 0 && this.current > 1) { return this.end(); }
    if(this.mode == 1 && this.current < 0) { return this.end(); }
  }

  static end() {
    this.current = null;
    if(this.callback) {
      this.callback();
    }
  }

  static render() {
    if(this.current == null) { return }
    Render.fillBackground(`rgba(${this.color[0]}, ${this.color[1]}, ${this.color[2]}, ${this.current})`)
  }
}
