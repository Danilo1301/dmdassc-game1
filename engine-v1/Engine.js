Engine = class {
  static servers = {};
  static clients = {};

  static Initialize() {
    console.log("[Engine] Started");

    this.CreateServer("server-1");

    try {
      Client.Initialize();
    } catch (e) {
      console.error(e);
      Client.isServer = true;
    }


    GameLoop.Initialize(this.Update.bind(this));
  }

  static CreateServer(name) {
    console.log(`[Engine] Create server ${name}`);
    this.servers[name] = new Server(name);
  }

  static Update(dt) {
    for (var server_name in this.servers) {
      this.servers[server_name].Update(dt);
    }

    Client.Update(dt);
  }

  static OnConnection(socket) {
    var id = Math.round(Math.random()*100);

    console.log(`[Engine] New connection from socket (ID: ${id})`);

    this.clients[id] = new ClientHandle(id);

    this.clients[id].SendData({id: "join", player_id: id});
  }
}
