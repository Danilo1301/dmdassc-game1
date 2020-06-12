Game = class {
  static gameLoop = null;
  static client = null;

  static loadResources(callback) {
    Assets.addImage("cursor.png", "cursor")
    Assets.addImage("test.png", "test")
    Assets.addImage("bg/main_menu_1.png", "bg_main_menu_1")
    Assets.addImage("bg/servers_menu_1.png", "bg_servers_menu_1")

    Preload.progress.total = Assets.loadQuery.length;
    Preload.progress.current = Assets.loadQuery.length/2;
    Assets.onProgress((info) => {
      Preload.progress.current += 0.5;
      Preload.loadtext = `Loading ${info.name}...`
    }).load(callback);
  }

  static start() {
    Preload.loadScripts(["Render", "GameLoop"], () => {
      Render.start();

      this.gameLoop = new GameLoop();
      this.gameLoop.onTick = this.tick.bind(this);
      this.gameLoop.start();

      Preload.load(() => {

        this.loadResources(() => {
          Preload.loadtext = "Loaded!";
          setTimeout(() => {
            Preload.loading = false;

            Utils.load();
            Input.load();
            Mouse.load();

            this.client = new Client();
            this.client.onFinishLoad();
          }, 500)

        });
      });
    });
  }

  static drawFPS(x, y) {
    Render.ctx.textAlign = "left";
    Render.ctx.fillStyle = "white";
    Render.fillText(`${this.gameLoop.fps || 0} FPS`, x, y);
  }

  static drawCursor() {
    if(!Mouse.isLocked) { return; }
    Render.drawImage(Assets.get("cursor"), Mouse.position.x, Mouse.position.y, 20, 20*1.3)
  }

  static tick(delta) {
    Render.resize();

    if(Preload.loading) {
      Render.fillBackground("black");
      Render.ctx.fillStyle = "white";
      Render.fillText(Preload.loadtext, 5, Render.resolution.h-55);
      Render.fillRect(0, Render.resolution.h-40, (Preload.progress.current / Preload.progress.total)*Render.resolution.w, 30);
      return;
    }

    if(this.client) { this.client.update(delta); }
  }
}

Preload = class {
  static currentLoadingScript = null;
  static scriptsLoaded = [];
  static totalScripts = [];
  static loading = false;
  static assetsLoaded = false;
  static loadtext = "";

  static progress = {current: 0, total: 0}

  static load(callback) {
    var self = this;



    this.getScripts((all_scripts) => {
      var scripts = [];
      for (var s of all_scripts.main) {
        scripts.push(s);
      }


      for (var s of all_scripts.screens) {
        scripts.push("screens/"+s);
      }

      console.log(scripts)

      self.totalScripts = scripts;
      this.loading = true;



      self.progress.total = scripts.length;

      (function loadInclude(i) {
    		if(i > scripts.length-1) { return callback(); }
        self.currentLoadingScript = scripts[i];

        self.loadScript(scripts[i]).then(() => {
          self.scriptsLoaded.push(scripts[i]);
          self.progress.current += 0.5;
          self.loadtext = `Loading ${Preload.currentLoadingScript}...`
          loadInclude.bind(this, i+1)();
        });
      })(0);
    });
  }

  static getScripts(callback) { fetch("scripts").then(response => response.json()).then(data => { callback(data); }); }

  static loadScripts(scripts, callback) {
    var promises = [];
    for (var s of scripts) { promises.push(this.loadScript(s)); }
    Promise.all(promises).then(() => { callback(); })
  }

  static loadScript(text) { return new Promise(function(resolve) { $.getScript("/engine/"+text+".js", function() { resolve(); }); }); }
}
