Engine = class {
  constructor(isServer) {
    this.servers = {};

    this.isServer = isServer || false;

    this.gameLoop = new GameLoop(this.isServer, this.Tick.bind(this));

    if(this.isServer) {
      var server = this.CreateServer("server-1");

      var entities = [];

      for (var i = 0; i < 3; i++) {
        entities.push(server.CreateEntity({position: {x: Math.random()*500-250, y: Math.random()*500-250}}));
      }

      setInterval(() => {
        for (var entity of entities) {
          entity.MoveTo(Math.random()*200-100, Math.random()*200-100);
        }
      }, 2000)

    } else {
      this.client = new Client(this);
    }

    this.gameLoop.Start();
  }

  CreateServer(id) {
    var server = new Server(id);
    this.servers[id] = server;
    return server;
  }

  Tick(dt) {
    if(this.client) {
      this.client.fps = this.gameLoop.fps;
      this.client.Tick(dt);
    }

    for (var server_id in this.servers) {
      this.servers[server_id].Tick(dt);
    }
  }
}
