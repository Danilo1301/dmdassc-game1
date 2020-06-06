GameLoop = class {
  static onTick = null;

  constructor(isServer, fn) {
    this.lastTick = null;
    this._frames = 0;
    this.lastFpsCheckTime = null;
    this.onTick = fn;
    this.isServer = isServer;
  }

  Start() {
    this.Loop();
  }

  ProcessFPS() {
    if(Date.now() - this.lastFpsCheckTime > 1000) {
      this.lastFpsCheckTime = Date.now();
      this.fps = this._frames;
      this._frames = 0;
    }
    this._frames++;
  }

  Loop() {
    this.ProcessFPS();

    this.onTick((Date.now() - (this.lastTick || Date.now())) / 60);

    this.lastTick = Date.now();

    if(this.isServer == false) {
      window.requestAnimationFrame(this.Loop.bind(this));
    } else {
      setTimeout(() => { this.Loop() }, 0);
    }
  }
}
