var engineClient = new Engine();
var engineServer = new Engine(true);

Engine = class {
  static servers = {};

  static CreateSinglePlayerSrver() {
    var mainServer = this.CreateServer("single-player");
    var entity = mainServer.CreateEntity(200, 200);

    setInterval(() => {
      entity.MoveTo(Math.random()*500-250, Math.random()*500-250);
    }, 2000)
  }

  static Initialize(serverMode) {
    this.serverMode = serverMode;

    this.Log(`Init (${serverMode ? "SERVER" : "LOCAL"})`);

    GameLoop.Initialize(serverMode, this.Tick.bind(this));

    if(serverMode) {

    } else {
      this.CreateSinglePlayerSrver();
      Client.Load();
    }
  }

  static Tick(dt) {
    if(!this.serverMode) {
      Client.Tick(dt);
    }
  }

  static OnSocketConnection(socket) {
    this.Log("New socket connection");
  }

  static CreateServer(id) {
    var server = new Server(id);
    this.servers[id] = server;

    server.Log("started");
    return server;
  }

  static Log(text) {
    var args = [`[Engine]`];
    for (var a of arguments) { args.push(a); }
    console.log.apply(null, args);
  }
}
