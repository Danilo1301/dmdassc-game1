GameLoop = class {
  static tickFunction;
  static bind;
  static lastTick = null;
  static _frames = 0;
  static lastFpsCheckTime = null;

  static Initialize(tickFunction) {
    this.tickFunction = tickFunction;
    this.Loop();
  }

  static Loop() {
    if(Date.now() - this.lastFpsCheckTime > 1000) {
      this.lastFpsCheckTime = Date.now();
      this.fps = this._frames;
      this._frames = 0;
    }
    this._frames++;
    this.tickFunction.bind(this.bind)((Date.now() - (this.lastTick || Date.now())) / 60);
    this.lastTick = Date.now();

    if(Client.isServer == false) {
      window.requestAnimationFrame(this.Loop.bind(this));
    } else {
      setTimeout(() => { this.Loop() },0)
    }
  }
}
