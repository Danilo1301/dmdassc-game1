const includes = [];

Math.lerp = function (value1, value2, amount) {
	amount = amount < 0 ? 0 : amount;
	amount = amount > 1 ? 1 : amount;
	return value1 + (value2 - value1) * amount;
};

isPointInsideRect = function (point, rect) {
    return rect.x <= point.x && point.x <= rect.x + rect.width &&
           rect.y <= point.y && point.y <= rect.y + rect.height;
}



start = function() {
  let includes = ["Engine", "GameLoop", "Client", "Render", "Input", "Server", "Entity", "ClientHandle", "Gui", "Button", "Collision"];
  let promises = [];
  for (var i of includes) { promises.push(new Promise(function(resolve) { $.getScript("/engine/"+i+".js", ()=>{ resolve(); }); })); }
  Promise.all(promises).then(() => { init(); });
}

// --


let engineClient;
let engineServer;

init = function() {
  engineServer = new Engine(true);
  engineClient = new Engine();
  console.log(engineClient)
}
