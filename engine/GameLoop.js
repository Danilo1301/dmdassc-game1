GameLoop = class {
  constructor() {
    this.lastTick;
    this.frameRate = 80;
    this.timeElapsed = 0;

    this.lastFPSCheck = Date.now();
    this.fps = 0;
    this.frames = 0;
    this.fn_tick = null;

    this.useInterval = false;
    try { window; } catch (e) { this.useInterval = true;}
  }

  start() {
    this.tick();
  }

  onTick(fn_tick) {
    this.fn_tick = fn_tick;
  }

  calculateFPS() {
    if(Date.now() - this.lastFPSCheck >= 1000) {
      this.lastFPSCheck = Date.now();
      this.fps = this.frames;
      this.frames = 0;
    }
  }

  call_onTick(dt) {
    this.calculateFPS();
    this.frames += 1;
    if(this.fn_tick) {
      this.fn_tick(dt/1000);
    }
  }

  tick(current) {
    var elapsed = (current - this.lastTick) || 0;

    this.lastTick = current;

    this.timeElapsed += elapsed;


    var interval = (1000/this.frameRate) || elapsed;

    if(interval == Infinity) {
      interval = elapsed
    }

    if(this.timeElapsed >= interval) {
      this.call_onTick(interval);
      this.timeElapsed = this.timeElapsed%interval;
    }

    if(this.useInterval) {
      setTimeout(() => { this.tick(); }, 0)
    } else {
      window.requestAnimationFrame(this.tick.bind(this))
    }
  }
}
