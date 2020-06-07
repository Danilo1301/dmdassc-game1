GameLoop = class {
  constructor(fn, useAnimFrame) {
    this.tickFunction = fn;
    this.useAnimFrame = useAnimFrame;
  }

  Start() {
    this.Loop();
  }

  ProcessFPS() {
    this.lastFpsCheckTime = this.lastFpsCheckTime || Date.now();
    this._frames = this._frames || 0;
    this.fps = this.fps || 0;
    if(Date.now() - this.lastFpsCheckTime > 1000) {
      this.lastFpsCheckTime = Date.now();
      this.fps = this._frames;
      this._frames = 0;
    }
    this._frames++;
  }

  Loop() {
    this.ProcessFPS();

    this.tickFunction((Date.now() - (this.lastTick || Date.now())) / 60);

    this.lastTick = Date.now();

    if(this.useAnimFrame) {
      window.requestAnimationFrame(this.Loop.bind(this));
    } else {
      setTimeout(() => { this.Loop() }, 10);
    }
  }
}
