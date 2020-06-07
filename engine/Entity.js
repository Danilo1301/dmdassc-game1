Entity = class {
  constructor() {
    this.id = null;
    this.size = 100;
    this.position = {x: 0, y: 0};
    this.target_position = {x: 0, y: 0};
    this.force = {x: 0, y: 0};
    this.history = [];
  }

  CreateColision() {
    this.collisionBody = Collision.CreateBody(this);
    this.collisionBody.AddRect(-this.size/2, -this.size/2, this.size, this.size);
  }

  ApplyForce(fx, fy) {
    this.force.x += fx;
    this.force.y += fy;
  }

  Update(dt) {

    if(this.history.length > 0) {

      var ct = Date.now() - this.lastUpdated;

      for (var frame of this.history) {
        if(ct >= frame.t) {
          this.target_position.x = frame.x
          this.target_position.y = frame.y;
          this.history.splice(this.history.indexOf(frame), 1);
        }
      }

      this.position.x = Math.lerp(this.position.x, this.target_position.x, 0.1);
      this.position.y = Math.lerp(this.position.y, this.target_position.y, 0.1);
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

  Draw() {
    Render.Translate(this.position.x, this.position.y);

    Render.ctx.fillStyle = "black";
    Render.FillRect(-3, -3, 6, 6);
    Render.FillText(`Entity.${this.id}`, 0, 0)

    this.DrawCollision();

    Render.Translate(-(this.position.x), -(this.position.y));
  }

  DrawCollision() {
    for (var part of this.collisionBody.parts) {
      if(this.collisionBody.info.collidingWith.length > 0) {
        Render.ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
      } else {
        Render.ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      }

      Render.FillRect(part.position.x, part.position.y, part.width, part.height);
    }
  }
}
