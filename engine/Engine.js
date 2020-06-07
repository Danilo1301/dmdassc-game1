Engine = class {
  constructor() {
    this.servers = {};
  }

  StartGameLoop(isClient) {
    this.gameLoop = new GameLoop(this.Tick.bind(this), isClient);
    this.gameLoop.Start();
  }

  Tick(dt) {

    for (var server_id in this.servers) { this.servers[server_id].Update(dt); }
    
    this.Update();
    if(this.Render) { this.Render(); }
  }

  ConnectPlayer(client, server_id) {
    this.servers[server_id].clients[client.id] = client;

    client.server = this.servers[server_id];

    client.socket.emit("data", {id: "joined"});
  }

  CreateServer(id) {
    var server = new Server(id);
    this.servers[id] = server;
    return server;
  }
}
