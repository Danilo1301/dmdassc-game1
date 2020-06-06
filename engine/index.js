


start = function() {
	//let includes = ["Engine", "GameLoop", "Client", "Render", "Input", "Server", "Entity", "ClientHandle", "Gui", "Button", "Collision"];
  let includes = ["Utils", "Engine", "Client", "GameLoop", "Render", "Input", "Gui", "Button", "Server", "Entity", "Collision", "ClientHandle"];

	(function loadInclude(i) {
		if(i > includes.length-1) { return init(); }
		console.log(`[!] Loading ${includes[i]}`);
		$.getScript("/engine/"+includes[i]+".js", ()=>{
			loadInclude.bind(this, i+1)();
		});
  })(0);


	return;


	//let promises = [];
  //for (var i of includes) { promises.push(new Promise(function(resolve) { $.getScript("/engine/"+i+".js", ()=>{ resolve(); }); })); }
  //Promise.all(promises).then(() => { init(); });
}

// --


let client;
let server;

init = function() {
  client = new Client();
  //engineClient = new Engine();
  console.log(client)
}
