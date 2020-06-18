MasterServer = class {
  static io = null;
  static clients = {};
  static servers = {};
  static gameLoop = null;

  static start(io) {
    this.gameLoop = new GameLoop();
    this.gameLoop.onTick(this.tick.bind(this));
    this.gameLoop.frameRate = 60;
    this.gameLoop.start();



    this.io = io;
    if(!io) { this.io = FakeSocketServer }
    this.io.on("connection", this.onSocketConnect.bind(this));

    var server = this.createServer("server-1");
  }

  static tick(delta) {
    for (var server_id in this.servers) {
      this.servers[server_id].update(delta);
    }
  }

  static createServer(server_id) {
    var server = new Server();
    server.createDefaultWorld();
    this.servers[server_id] = server;
    return server;
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

  static connectClientToServer(clientHandle, server_id, callback) {
    this.servers[server_id].onPlayerConnect(clientHandle, callback);
  }
}




MasterServerAuth = class {
  static CLIENT_ID = "";

  static load(client_id) {
    this.CLIENT_ID = client_id;

    const {OAuth2Client} = require('google-auth-library');
    this.client = new OAuth2Client(this.CLIENT_ID);


  }

  static async verify(token) {
    const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: this.CLIENT_ID
    });
    const payload = ticket.getPayload();
    //const userid = payload['sub'];

    return payload;
  }

  static login(idtoken, callback) {
    if(Game.DEMO_SERVER) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/tokensignin');
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function() {
        callback(xhr.responseText)
      };
      xhr.send('idtoken=' + idtoken);
      return
    }

    this.verify(idtoken).then((payload) => {
      callback(payload['sub']);
    }).catch(() => {
      callback("");
    });
  }

  static httpSignIn(req, res) {
    MasterServerAuth.verify(req.body.idtoken).then((payload) => {
      res.end(payload['sub']);
    }).catch(() => {
      res.end("");
    });
  }
}
