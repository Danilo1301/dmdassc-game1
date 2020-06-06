class CGame {
  static dev_zoom = 1.0;
  static camera_pos = {x: 0, y: 0};

  static Initializate() {
    this.PreLoad();
    CInput.Initializate();
    CCamera.Initializate();
    CGrid.Initializate();

    CGameLoop.Initializate();
  }

  static PreLoad() {
    CLoader.RequestImage("files/blocks/0/block.png", "block_0");
    CLoader.RequestImage("files/blocks/1/block.png", "block_1");
    CLoader.RequestImage("files/blocks/2/block.png", "block_2");

    CLoader.LoadAssets().then(()=>{
      console.log("assets loaded");
    });
  }

  static GameTick(deltaTime) {
    CScreen.Resize();

    this.Update(deltaTime);
    this.Render();
  }

  static Update(deltaTime) {
    if(CInput.IsKeyDown(65)) { //A
      this.camera_pos.x -= 5;
    }

    if(CInput.IsKeyDown(68)) { //D
      this.camera_pos.x += 5;
    }

    if(CInput.IsKeyDown(87)) { //W
      this.camera_pos.y -= 5;
    }

    if(CInput.IsKeyDown(83)) { //S
      this.camera_pos.y += 5;
    }

    if(CInput.IsKeyDown(81)) { //Q
      console.log("Q");
    }

    if(CInput.IsKeyDown(69)) { //E
      console.log("E");
    }

    CCamera.Update();

    CGui.Update(deltaTime);
  }

  static ScreenToWorld(pos) {
    return {
      x: pos.x - CScreen.resolution.w/2 + this.camera_pos.x,
      y: pos.y - CScreen.resolution.h/2 + this.camera_pos.y
    }
  }

  static Render() {


    CScreen.FillBackground("#000000");


    CScreen.Translate(((1-this.dev_zoom)*CScreen.resolution.w)/2, ((1-this.dev_zoom)*CScreen.resolution.h)/2);
    CScreen.ctx.scale(this.dev_zoom, this.dev_zoom);

    CScreen.ctx.save();

    CScreen.FillBackground("#1A207C");

    CScreen.Translate(CScreen.resolution.w/2, CScreen.resolution.h/2);

    CScreen.Translate(-this.camera_pos.x, -this.camera_pos.y);

    CGrid.Draw();

    var worldpos = this.ScreenToWorld({x: CInput.mouse.position.x, y: CInput.mouse.position.y});

    CScreen.SetAttribute("fillStyle", "white");
    CScreen.FillText(`WORLD ${Math.round(worldpos.x)}, ${Math.round(worldpos.y)}`, worldpos.x, worldpos.y);

    CScreen.ctx.restore();
    //Gui

    var newpos = {x: CInput.mouse.position.x, y: CInput.mouse.position.y}

    CScreen.SetAttribute("fillStyle", "white");
    CScreen.FillText(`${Math.round(newpos.x)}, ${Math.round(newpos.y)}`, 15, 20);
    CScreen.FillText(`${CGame.fps} FPS`, 15, 50);






  }
}
