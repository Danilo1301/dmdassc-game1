ClientHandle = class {
  constructor(socket) {
    console.log(`Socket ${socket.id} connected`);

    socket.on("data", this.onData.bind(this));

    this.socket = socket;
    this.id = socket.id;
    this.uid = null;
  }

  emit(data) {
    this.socket.emit("data", data);
  }

  onData(data, callback) {
    var self = this;

    if(data.id == "servers_list") {
      callback(MasterServer.getServersList());
    }

    if(data.id == "login") {
      MasterServerAuth.login(data.id_token, (uid) => {
        self.uid = uid;
        callback(uid);
        console.log(self)
      });
    }

    if(data.id == "join_server") {
      MasterServer.connectClientToServer(this, data.server_id, callback);
    }
  }
}
