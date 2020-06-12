MasterServer = class extends Engine {
  constructor(io) {
    super();
    this.clients = {};

    this.StartGameLoop();

    if(io) {
      io.on("connection", this.OnConnection.bind(this));
    }


    var server = this.CreateServer("server-1");

    var es = [];

    for (var i = 0; i < 1; i++) {
      var e = server.CreateEntity({position: {x: Math.random()*100-50, y: Math.random()*100-50}});
      es.push(e);
    }


    setInterval(() => {
      for (var e of es) {
        e.ApplyForce(Math.random()*50-25, Math.random()*50-25);
        e.number = Math.round(Math.random()*50);
        e.float = Math.random()*10-5;
      }
    }, 3000)


    console.log("Master", this)
  }

  OnConnection(socket) {
    var client = new ClientHandle(this);

    client.SetupSocket(socket);

    this.clients[client.id] = client;
    console.log(client)
  }

  Update(dt) {

  }
}
