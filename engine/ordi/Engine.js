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


    client.playerEntity = client.server.CreateEntity({position: {x: Math.random()*100-50, y: Math.random()*100-50}});

    client.SendData({id: "joined", client_id: client.id, entity_id: client.playerEntity.id});
  }

  CreateServer(id) {
    var server = new Server(id);
    this.servers[id] = server;
    return server;
  }
}
