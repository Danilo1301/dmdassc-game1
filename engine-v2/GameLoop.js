GameLoop = class {
  static tickFunction;
  static bind;
  static lastTick = null;
  static _frames = 0;
  static lastFpsCheckTime = null;
  static serverMode = false;

  static Initialize(serverMode, tickFunction) {
    this.serverMode = serverMode;
    this.tickFunction = tickFunction;

    if(serverMode) {


      setInterval(() => {
        this.CalculateFPS();
      }, 10)
    } else {
      this.Loop();
    }




  }

  static CalculateFPS() {
    if(Date.now() - this.lastFpsCheckTime > 1000) {
      this.lastFpsCheckTime = Date.now();
      this.fps = this._frames;
      this._frames = 0;
    }
    this._frames++;
    this.tickFunction.bind(this.bind)((Date.now() - (this.lastTick || Date.now())) / 60);
    this.lastTick = Date.now();
  }

  static Loop() {
    this.CalculateFPS();


    if(this.serverMode == true) {
      setTimeout(() => { this.Loop() }, 1);
    } else {
      window.requestAnimationFrame(this.Loop.bind(this));
    }
  }
}
