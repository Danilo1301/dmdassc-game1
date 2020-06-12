DataRecorder = class {
  constructor(server) {
    this.server = server;
  }
}

DataRecorder.Info = class {
  constructor(target) {
    this.target = target;
    this.values = {};
    this.lastValue = {};
    this.history = {};
    this.info = null;
    this.lastUpdated = null;
    this.initialized = false;
    //this.infoProcess = {time: null, current: 0}
  }

  AddValue(key, value, minDifference, lerpAmount, warpAt) {
    this.values[key] = {minDifference: minDifference};

    if(lerpAmount) { this.values[key].lerpAmount = lerpAmount; }
    if(warpAt) { this.values[key].warpAt = warpAt; }

    this.target[key] = value;
  }

  Update() {
    if(this.info != null) {
      //console.log(this.info);

      if(!this.initialized) {
        for (var key in this.info) {
          if(typeof this.info[key].current == "object") {
            for (var k in this.info[key].current) {
              this.target[key][k] = this.info[key].current[k];
            }
          } else {
            this.target[key] = this.info[key].current;
          }
        }
        this.initialized = true;
      }

      for (var key in this.info) {

        if(this.target.isPlayerEntity) {
          break;
        }

        var ct = Date.now() - this.lastUpdated;

        //console.log(ct)


        for (var frame of this.info[key].history) {
          if(ct >= frame.t) {

            if(typeof frame.d == "object") {
              for (var k in frame.d) {
                if(Math.abs(this.target[key][k] - frame.d[k]) >= this.values[key].warpAt) {
                  this.target[key][k] = frame.d[k];
                } else {
                  this.target[key][k] = Math.lerp(this.target[key][k], frame.d[k], this.values[key].lerpAmount);
                }
              }
            } else {
              this.target[key] = frame.d;
            }

            this.info[key].history.splice(this.info[key].history.indexOf(frame), 1);
          }
        }


      }

      //key.key.key = 2
      //console.log("======================")
      //console.log(this.info);
      return
    }






    for (var key in this.values) {
      if(this.lastValue[key] == undefined) {

        this.lastValue[key] = typeof this.target[key] == "object" ? Object.assign({}, this.target[key]) : this.target[key];
        this.history[key] = [];
      }

      var canRecord = false;

      if(typeof this.lastValue[key] == "object") {


        for (var k in this.lastValue[key]) {
          if(Math.abs(this.lastValue[key][k] - this.target[key][k]) >= this.values[key].minDifference) {

            this.lastValue[key][k] = this.target[key][k];
            canRecord = true;
          }

        }


      } else {
        if(Math.abs(this.lastValue[key] - this.target[key]) >= this.values[key].minDifference) {
          this.lastValue[key] = this.target[key];
          canRecord = true;
        }
      }

      if(canRecord || this.history[key].length == 0) {
        this.history[key].push({t: Date.now(), d: typeof this.target[key] == "object" ? Object.assign({}, this.target[key]) : this.target[key]})
      }

      if(Date.now() - this.history[key][0].t > 1000) {
        this.history[key].splice(0, 1);
      }



      //console.log(this.lastValue[key], this.target[key]);
    }



    //console.log(`Updating data for target ${this.target.id}`)
  }

}
