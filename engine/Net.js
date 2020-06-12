Net = class {
  static socket = null;
  static fn_onConnect = null;

  static connect(callback) {
    this.fn_onConnect = callback;

    this.socket = io();
    this.socket.on("data", this.onData.bind(this));
  }

  static emit(data, callback) {
    this.socket.emit("data", data, callback);
  }

  static onData(data) {
    console.log(`data`, data);
    if(data.id == "joined") { this.fn_onConnect(data); }
  }

  static getServersList() {
    this.emit({id: "servers_list"}, (servers) => {
      Game.client.serverList = servers;
      console.log("sservers", servers)
    });
  }
}
