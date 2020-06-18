Game = class {
  static gameLoop = null;
  static client = null;

  static getAssets() {
    return {
      images: [
        ["cursor", "cursor.png"],
        ["loading_1", "loading_1.png"],
        ["player", "player.png"],
        ["npc", "npc.png"],
        ["bg_main_menu_1", "bg/main_menu_1.png"],
        ["bg_servers_menu_1", "bg/servers_menu_1.png"]
      ], audios: [

      ]
    }
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

  static loadBlock(id) {
    return new Promise(function(resolve) {
      console.log(id)

      var asset = Assets.add("block.png", "block_"+id, Image);

      asset.path = `engine/assets/blocks/${id}/`;

      asset.load().then(() => {
        resolve();
      });

      setTimeout(() => {
        //resolve();
      }, 500);
    });
  }

  static start() {

    Preload.loadMultipleFiles(["Render", "GameLoop"], () => {
      Render.start();

      this.gameLoop = new GameLoop();
      this.gameLoop.onTick(this.tick.bind(this));
      this.gameLoop.start();

      var load_classes = Preload.new();
      var load_screens = Preload.new();
      var load_images = Preload.new();
      var load_blocks = Preload.new();

      load_classes.setLoadMethod( (a, b) => { return new Promise(function(resolve) { Preload.loadFile(a).then(() => { resolve(); }); }); });
      load_screens.setLoadMethod( (a, b) => { return new Promise(function(resolve) { Preload.loadFile("/screens/"+a).then(() => { resolve(); }); }); });

      var assetsLoaded = false;

      var onProgress = function() {
        if(!assetsLoaded) {
          try {
            load_images.setLoadMethod( (a, b, c) => {
              return new Promise(function(resolve) {
                var asset = Assets.add(b, a, c);
                asset.load().then(() => { resolve() })
              });
            });

            load_blocks.setLoadMethod( (a, b) => {
              return new Promise(function(resolve) { Game.loadBlock(b).then(() => { resolve(); }); });
            });

            assetsLoaded = true;
          } catch (e) {

          }
        }
      }

      fetch("scripts").then(response => response.json()).then(data => {
        console.log(data)

        for (var c of data.main) { load_classes.add(c); }
        for (var c of data.screens) { load_screens.add(c); }

        var assets = this.getAssets();

        for (var e of assets.images) { load_images.add(e[0], e[1], Image); }
        for (var e of assets.audios) { load_images.add(e[0], e[1], Audio); }

        for (var blockid in data.data.blocks) {
          load_blocks.add("Blocks", blockid);
        }


        //load_images.add("cursor", "cursor.png", Image);
        ////load_images.add("lol", "lol.mp3", Audio);

        Preload.load(onProgress, () => {
          console.log("finished")

          Utils.load();
          Input.load();
          Mouse.load();

          this.client = new Client();
          this.client.onFinishLoad();
        });
      });
    })
  }

  static tick(delta) {
    Render.resize();

    if(!this.client) {
      Render.fillBackground("black");
      Render.ctx.fillStyle = "white";
      Render.fillText(`Loading ${Preload.progress.current_loading[0]}`, 5, Render.resolution.h-55);
      Render.fillRect(0, Render.resolution.h-40, (Preload.progress.total_progress[0] / Preload.progress.total_progress[1])*Render.resolution.w, 30);
      return
    }

    this.client.tick(delta);
  }
}

Preload = class {
  static loads = [];
  static progress = {
    current_loading: [],
    loaders: [0, 0],
    total_progress: [0, 0]
  }
  static fn_onProgress = null;
  static fn_onEnd = null;

  static load(fn, fn_end) {
    this.progress.loaders = [0, this.loads.length];
    this.fn_onProgress = fn;
    this.fn_onEnd = fn_end;
    this.progress.total_progress = [0, 0];
    for (var l of this.loads) {
      this.progress.total_progress[1] += l.items.length;
    }

    this.loadStep();
  }

  static loadStep(fn) {

    if(this.loads.length == 0) {
      return this.fn_onEnd();
    }

    var load = this.loads[0];

    if(load.items.length == 0) {
      this.loads.splice(0, 1);
      this.progress.loaders[0]++;
      return this.loadStep();
    }

    Preload.progress.current_loading = load.items[0];

    this.fn_onProgress();

    load.load(() => {
      this.progress.total_progress[0]++;
      this.fn_onProgress();
      this.loadStep();
    });
  }

  static new() {
    var load = new this.Load();
    this.loads.push(load);
    return load;
  }

  static loadFile(file) { return new Promise(function(resolve) { $.getScript("/engine/"+file+".js", function() { resolve(); }); }); }

  static loadMultipleFiles(files, callback) {
    var promises = [];
    for (var f of files) { promises.push(this.loadFile(f)); }
    Promise.all(promises).then(() => { callback(); })
  }

}

Preload.Load = class {
  constructor() {
    this.loadMethod = null;
    this.items = [];
  }

  setLoadMethod(fn) {
    this.loadMethod = fn;
  }

  add() {
    var args = [];
    for (var a of arguments) {
      args.push(a);
    }

    this.items.push(args);
  }

  load(callback) {
    if(this.items.length == 0) { return console.log("Finished"); }

    var item = this.items[0];

    this.loadMethod.apply(null, item).then(e => {
      this.items.splice(0, 1)
      callback();
    });
  }
}
