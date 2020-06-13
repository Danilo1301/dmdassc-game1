Entity = class {
  constructor() {
    this.id = null;
    this.size = 100;

    this._dataInfo = new DataRecorder.Info(this);
    this._dataInfo.AddValue("position", {x: 0, y: 0}, 0.1, 0.1, 3);
    this._dataInfo.AddValue("force", {x: 0, y: 0}, 0.1, 1, 5);
    this._dataInfo.AddValue("number", 0, 1);
    this._dataInfo.AddValue("float", 0.0, 0.1);
    //this._dataInfo.AddValue("size", 100, 1);

    this.collision = Collision.CreateBody(this);
    this.collision.AddRect(-this.size/2, -this.size/2, this.size, this.size);

    this.inputs = [];
    this.keys = {};

    //this.size = 100;
    //this.position = {x: 0, y: 0};
    //this.target_position = {x: 0, y: 0};
    //this.force = {x: 0, y: 0};
    //this.history = [];
  }

  ProcessInputs() {
    //console.log(this.inputs)
    if(this.inputs.length > 0) {
      for (var inp of this.inputs) {
        if(inp == undefined) {
          console.log(this.inputs)
        }
        this.keys[inp.key] = inp.down;
        console.log(`${inp.key}, ${inp.down}`)
      }
      this.inputs = [];
    }

    if(this.keys[65]) {
      this.ApplyForce(-1, 0);
    }

    if(this.keys[68]) {
      this.ApplyForce(1, 0);
    }

    if(this.keys[87]) {
      this.ApplyForce(0, -1);
    }

    if(this.keys[83]) {
      this.ApplyForce(0, 1);
    }
  }

  ApplyInfo(info) {
    this._dataInfo.info = info;
    this._dataInfo.lastUpdated = Date.now();
  }

  CreateColision() {
    //this.collisionBody = Collision.CreateBody(this);
    //this.collisionBody.AddRect(-this.size/2, -this.size/2, this.size, this.size);
  }

  ApplyForce(fx, fy) {
    this.force.x += fx;
    this.force.y += fy;
  }

  Update(dt) {
    this.ProcessInputs();

    var add = {x: this.force.x * dt, y: this.force.y * dt};

    this.position.x += add.x;
    this.position.y += add.y;

    this.force.x = Math.lerp(this.force.x, 0, 0.2 * dt);
    this.force.y = Math.lerp(this.force.y, 0, 0.2 * dt);

    this._dataInfo.Update();

    if(false) {

      if(this.history.length > 0) {

        var ct = Date.now() - this.lastUpdated;

        for (var frame of this.history) {
          if(ct >= frame.t) {
            this.target_position.x = frame.x
            this.target_position.y = frame.y;
            this.history.splice(this.history.indexOf(frame), 1);
          }
        }

        this.position.x = Math.lerp(this.position.x, this.target_position.x, 0.8*dt);
        this.position.y = Math.lerp(this.position.y, this.target_position.y, 0.8*dt);
      }



      var add = {x: this.force.x * dt, y: this.force.y * dt};

      this.position.x += add.x;
      this.position.y += add.y;

      Collision.GetCollisionsOfBody(this.collisionBody);

      var collidingWithBody = this.collisionBody.info.collidingWith[0];

      if(collidingWithBody) {
        var r = {
          x: this.position.x - collidingWithBody.entity.position.x,
          y: this.position.y - collidingWithBody.entity.position.y
        };

        var rd = {
          x: r.x/(Math.abs(r.x)) || 0,
          y: r.y/(Math.abs(r.y)) || 0
        };

        this.force.x += 1.5 * rd.x * dt;
        this.force.y += 1.5 * rd.y * dt;
      }

      this.force.x = Math.lerp(this.force.x, 0, 0.5 * dt);
      this.force.y = Math.lerp(this.force.y, 0, 0.5 * dt);

      //console.log(add);
      //console.log("d")
      //mo my position, check if I collided with someon (only if in radius)
    }
  }

  Draw() {
    Render.Translate(this.position.x, this.position.y);

    Render.ctx.fillStyle = "black";
    Render.FillRect(-3, -3, 6, 6);
    Render.FillText(`Entity.${this.id}\n`, 0, 0)
    Render.FillText(`${this.number} | ${this.float}`, 0, 20)

    this.DrawCollision();

    Render.Translate(-(this.position.x), -(this.position.y));
  }

  DrawCollision() {
    for (var part of this.collision.parts) {
      Render.ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      Render.FillRect(part.position.x, part.position.y, part.width, part.height);
    }
  }
}
