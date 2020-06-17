GameLoop = class {
  constructor() {
    this.constantFPS = 80;
    this.accumulatedTime = 0.0;
    this.maxSkipFrames = 5;
    this.timeElapsed = 0;
    this.lastTick = Date.now();

    this.lastFPSCheck = Date.now();
    this.fps = 0;
    this.frames = 0;

    this.fn_update = null;

    this.useInterval = false;
    try { window; } catch (e) { this.useInterval = true;}
  }

  start() {
    this.tick();
  }

  onTick(fn) {
    this.fn_update = fn;
  }

  calculateFPS() {
    if(Date.now() - this.lastFPSCheck >= 1000) {
      this.lastFPSCheck = Date.now();
      this.fps = this.frames;
      this.frames = 0;
    }
  }

  update(dt) {
    this.calculateFPS();
    this.frames += 1;

    if(this.fn_update) {
      this.fn_update(dt/1000);
    }
  }

  tick() {
    this.dt = 1000/this.constantFPS;

    this.timeElapsed = Date.now() - this.lastTick;
    this.accumulatedTime += this.timeElapsed;
    this.lastTick = Date.now();

    var nLoops = 0;
    while(this.accumulatedTime >= this.dt && nLoops < this.maxSkipFrames)	{
			this.update(this.dt);
			this.accumulatedTime -= this.dt;
			nLoops++;
		}




    if(nLoops > 0) {
      this.accumulatedTime = 0;
      console.log("Skipping " + nLoops + " frames")
    }

    if(this.useInterval) {
      setTimeout(() => { this.tick(); }, 0)
    } else {
      window.requestAnimationFrame(this.tick.bind(this))
    }


  }
}
