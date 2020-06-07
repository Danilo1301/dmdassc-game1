ClientHandle = class {
  constructor(socket, master) {
    this.master = master;
    this.id = socket.id;
    this.socket = socket;
    this.entity_history = {};

    socket.on("data", this.OnReceiveData.bind(this));
  }

  OnReceiveData(data, callback) {
    if(data.id == "join_server") {
      this.master.ConnectPlayer(this, data.server_id);
    }

    if(data.id == "local_info") {


      console.log(data)
      setTimeout(() => {
        this.lastUpdated = Date.now();
        callback({info: {entities: this.entity_history}});
        this.entity_history = {};
      }, Math.random()*120+120)

    }
  }
}
