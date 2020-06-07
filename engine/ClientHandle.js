ClientHandle = class {
  constructor(socket, master) {
    this.master = master;
    this.id = socket.id;
    this.socket = socket;
    this.entity_history = {};

    this.mouse = {x: 0, y: 0}

    this.recorded_mouse = [];

    socket.on("data", this.OnReceiveData.bind(this));
  }

  Update(dt) {
    var ct = Date.now() - this.lastUpdated;

    //console.log(this.recorded_mouse)
    for (var frame of this.recorded_mouse) {
      if(ct >= frame.t) {
        this.mouse.x = frame.x
        this.mouse.y = frame.y;
        this.recorded_mouse.splice(this.recorded_mouse.indexOf(frame), 1);
      }
    }

  }

  OnReceiveData(data, callback) {
    if(data.id == "join_server") {
      this.master.ConnectPlayer(this, data.server_id);
    }

    if(data.id == "local_info") {

      this.recorded_mouse = data.info.mouse || [];
      //this.playerEntity


      setTimeout(() => {
        this.lastUpdated = Date.now();
        callback({info: {entities: this.entity_history}});
        this.entity_history = {};
      }, Math.random()*0)

    }
  }
}
