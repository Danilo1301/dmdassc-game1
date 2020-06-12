ClientHandle = class {
  constructor(master) {
    this.master = master;
    this.server = null;

    this.lastUpdated = null;


    this.entity_history = {};

    this.mouse = {x: 0, y: 0}

    this.recorded_mouse = [];

    this.inputs = [];

    //socket.on("data", this.OnReceiveData.bind(this));
  }

  SetupSocket(socket) {
    if(socket) {
      socket.on("data", this.OnData.bind(this));
      this.id = socket.id;
    } else {
      this.id = "LOCAL_CLIENT";
    }
  }

  OnData(data, callback) {
    //console.log(`[ClientHandle-get]`, data);

    if(data.id == "join_server") {
      this.master.ConnectPlayer(this, data.server_id);
    }

    if(data.id == "events") {

      this.ProcessInputs(true);

      this.inputs = data.inputs;

      var events = this.server.GetEvents(this.lastUpdated);
      callback({id: "events", events});
      this.lastUpdated = Date.now();
      //this.SendData({id: "events", events});
    }
  }

  ProcessInputs(all) {
    if(this.playerEntity) {
      for (var inp of this.inputs) {
        if(all) {
          this.playerEntity.keys[inp.key] = inp.down;
        } else {
          if((Date.now() - this.lastUpdated >= inp.t) || all) {
            this.playerEntity.inputs.push(inp);
            this.inputs.splice(this.inputs.indexOf(inp), 1);
          }
        }
      }
    }
  }

  SendData(data) {
    //client.socket.emit("data", data);
    if(this.id == "LOCAL_CLIENT") { setTimeout(() => { client.OnData(data); }, 500) }

    console.log(`[ClientHandle-send]`, data);
  }

  Update(dt) {
    this.ProcessInputs();

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
