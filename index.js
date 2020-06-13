var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var cookieParser = require('cookie-parser');

process.env.is_glitch = true;

const PORT = process.env.is_glitch ? 3000 : 7855;
const IP = process.env.is_glitch ? "127.0.0.1" : "192.168.15.14";
const classes = {
  main: ["Assets", "Client", "Server", "Fade", "Gui", "Button", "MessageBox", "GoogleApi", "Input", "Mouse", "Utils", "Net", "Screens", "FakeSocket", "MasterServer", "ClientHandle"],
  screens: ["ScreenMain", "ScreenLoading", "ScreenServersList", "ScreenGoogleLogin"]
};

app.use(cookieParser());

app.get('/', function(req, res) { res.sendFile(`${__dirname}/game.html`); });

app.get('/scripts', function(req, res) { res.json(classes); });

app.get('*', function(req, res) {
  if(req.originalUrl == "/js/index.js") { return res.end(getIndexJS()); }

  if(req.originalUrl.startsWith("/engine/")) { return res.sendFile(`${__dirname}/${req.originalUrl.split("?")[0]}`); }

  res.sendFile(`${__dirname}/public/${req.originalUrl}`);
});

http.listen(PORT, IP, function() { console.log('[web] Listening on port ' + PORT); });

function getIndexJS() { return `$.getScript("/engine/Game.js", ()=> { Game.start(); });`; }

//----------------------


for (var inc of classes.main) { require(`./engine/${inc}`); }

Utils.load();

//MasterServer.start(io);
