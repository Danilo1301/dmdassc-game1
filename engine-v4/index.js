


start = function() {
	//let includes = ["Engine", "GameLoop", "Client", "Render", "Input", "Server", "Entity", "ClientHandle", "Gui", "Button", "Collision"];
  let includes = ["Utils", "Engine", "Client", "MasterServer", "GameLoop", "DataRecorder", "Render", "Input", "Gui", "Button", "Server", "Entity", "PlayerEntity", "Collision", "ClientHandle"];

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
let masterServer;

init = function() {
  masterServer = new MasterServer();
  client = new Client();
  console.log(masterServer)
}
