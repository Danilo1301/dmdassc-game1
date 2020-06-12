ClientHandle = class {
  constructor(socket) {
    console.log(`Socket ${socket.id} connected`);

    socket.on("data", this.onData.bind(this));

    this.socket = socket;
    this.id = socket.id;
  }

  emit(data) {
    this.socket.emit("data", data);
  }

  onData(data, callback) {
    if(data.id == "servers_list") {
      callback(MasterServer.getServersList());
    }
  }
}
