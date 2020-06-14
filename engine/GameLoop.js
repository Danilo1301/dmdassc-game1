GameLoop = class {
  constructor() {
    this.onTick = null;
    this.useInterval = false;
    this.intervalDelay = 0;

    this.fps = 0;

    this.frames = 0;
    this.lastFpsCheckTime = Date.now();

    try { window; } catch (e) { this.useInterval = true;}

    //this.useInterval = false;
  }

  start() {
    this.loop();
  }

  updateFPS() {
    if(Date.now() - this.lastFpsCheckTime > 1000) {
      this.lastFpsCheckTime = Date.now();
      this.fps = this._frames;
      this._frames = 0;
    }
    this._frames++;
  }

  loop() {
    var delta = (Date.now() - (this.lastTick || Date.now()))/60;

    this.updateFPS();

    this.lastTick = Date.now();

    if(this.onTick != null) { this.onTick(delta); }

    if(this.useInterval) { return setTimeout(() => { this.loop() }, this.intervalDelay);}
    window.requestAnimationFrame(this.loop.bind(this));
  }
}
