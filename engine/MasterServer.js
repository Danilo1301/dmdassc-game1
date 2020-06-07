MasterServer = class extends Engine {
  constructor(io) {
    super();
    this.clients = {};

    this.StartGameLoop();

    io.on("connection", this.OnConnection.bind(this));

    var server = this.CreateServer("server-1");

    var es = [];

    for (var i = 0; i < 20; i++) {
      var e = server.CreateEntity({position: {x: Math.random()*100-50, y: Math.random()*100-50}});
      es.push(e);
    }


    setInterval(() => {
      for (var e of es) {
        e.ApplyForce(Math.random()*50-25, Math.random()*50-25);
      }
    }, 3000)



  }

  OnConnection(socket) {
    var client = new ClientHandle(socket, this);
    this.clients[socket.id] = client;

  }

  Update(dt) {

  }
}
