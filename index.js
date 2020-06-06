var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cookieParser = require('cookie-parser');

var PORT = 7855;

app.use(cookieParser());

app.get('/', function(req, res) {
  res.sendFile(`${__dirname}/game.html`);
});

app.get('*', function(req, res) {
  if(req.originalUrl == "/js/index.js") {
    return res.end(getIndexJS());
  }

  if(req.originalUrl.startsWith("/engine/")) {
    return res.sendFile(`${__dirname}\\${req.originalUrl.split("?")[0]}`);
  }


  res.sendFile(`${__dirname}/public/${req.originalUrl}`);
});

http.listen(PORT, "192.168.15.14", function() {
  console.log('[web] Listening on port ' + PORT);
});

function getIndexJS() {
  return `$.getScript("/engine/index.js", ()=>{ start(); });`;
}

//----------------------


for (var inc of ["Utils", "Engine", "MasterServer", "Client", "GameLoop", "Render", "Input", "Gui", "Button", "Server", "Entity", "Collision", "ClientHandle"]) {
  require(`./engine/${inc}`);
}

Utils.Load(this);

var engine = new MasterServer(io);

console.log(engine);
