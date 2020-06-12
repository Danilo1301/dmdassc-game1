MasterServer = class {
  static io = null;
  static clients = {};
  static servers = {};

  static start(io) {
    this.io = io;
    this.io.on("connection", this.onSocketConnect.bind(this));

    var server = this.createServer("server-1");
  }

  static createServer(server_id) {
    this.servers[server_id] = new Server();
  }

  static onSocketConnect(socket) {
    var client = new ClientHandle(socket);

    this.clients[socket.id] = client;

    client.emit({id: "joined", client_id: client.id});
  }

  static getServersList() {
    var servers = {};
    for (var server_id in this.servers) {
      servers[server_id] = {players: 0};
    }
    return servers;
  }
}
