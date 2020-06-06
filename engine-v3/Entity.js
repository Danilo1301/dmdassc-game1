Entity = class {
  constructor(server) {
    this.id = null;
    this.size = Math.round(Math.random()*60+40);
    this.position = {x: 0, y: 0};
    this.target_position = {x: 0, y: 0};
    this.move_to = {x: 0, y: 0};
    this.moving = true;
    this.frames = [];

    this.force = {x: 0, y: 0}

    this.speed = {x: 0, y: 0};
    this.target_speed = {x: -10, y: -10};

    this.collision = server.Collision.CreateBody(0, 0);
    this.collision.Add(-this.size/2, -this.size/2, this.size, this.size);
    this.collision.Add(0, -80, 20, 20);
    this.collision.ofEntity = this;
  }

  ApplyForce(fx, fy) {
    this.force.x += fx;
    this.force.y += fy;
  }

  CheckRectColision(rect, test) {
    return test.x + test.width > rect.x &&
      test.y + test.height > rect.y &&
      rect.x + rect.width > test.x &&
      rect.y + rect.height > test.y;
  }



  Update(dt, server) {
    if(this.collision.isColliding) {

      this.position.x -= 1*(this.force.x/Math.abs(this.force.x));
      this.force.x = 0.01*(this.force.x/Math.abs(this.force.x));

      //this.position.y -= 0.5;
    }

    this.position.x += this.force.x * dt;
    this.position.y += this.force.y * dt;
    this.collision.position.x = this.position.x;
    this.collision.position.y = this.position.y;

    this.force.x = Math.lerp(this.force.x, 0, 0.1 * dt);
    this.force.y = Math.lerp(this.force.y, 0, 0.1 * dt);

    return;

    if(this.target_speed.x > 0.1) { this.target_speed.x -= 1.5 * dt; } else
    if(this.target_speed.x < 0.1) { this.target_speed.x += 1.5 * dt; } else {
      this.target_speed.x = 0;
    }

    if(this.target_speed.y > 0.1) { this.target_speed.y -= 0.5 * dt; } else
    if(this.target_speed.y < 0.1) { this.target_speed.y += 0.5 * dt; } else {
      this.target_speed.y = 0;
    }

    if(this.moving) {

      if(this.position.x > this.move_to.x + 10) { this.target_speed.x = -5; }
      if(this.position.x < this.move_to.x - 10) { this.target_speed.x = 5; }

      if(this.position.y > this.move_to.y + 10) { this.target_speed.y = -5; }
      if(this.position.y < this.move_to.y - 10) { this.target_speed.y = 5; }

      this.speed.x = Math.lerp(this.speed.x, this.target_speed.x, 0.1);
    }

    this.position.x += this.speed.x * dt;
    this.position.y += this.speed.y * dt;


    var coliding = false;

    this.colliding_with = [];

    for (var check_entity_id in server.entities) {
      var check_entity = server.entities[check_entity_id];
      if(check_entity == this) { continue }


      if(this.CheckRectColision(
        {x: this.position.x - this.size/2, y: this.position.y - this.size/2, width: this.size, height: this.size},
        {x: check_entity.position.x - check_entity.size/2, y: check_entity.position.y - check_entity.size/2, width: check_entity.size, height: check_entity.size}
      )) {
        coliding = true;
        this.colliding_with.push(check_entity);
      }

    }

    if(coliding) {
      this.coliding = true;
      var dffx = this.position.x - this.colliding_with[0].position.x;
      dffx = dffx/Math.abs(dffx);

      this.target_speed.x += dffx*0.5;
      console.log(dffx)
    } else {
      this.coliding = false;
    }

    if(isPointInsideRect(this.position, {x: this.move_to.x-5, y: this.move_to.y-5, width: 10, height: 10})) {
      this.moving = false;
    }
    return;




    if(this.position.y > this.move_to.y) { this.position.y -= 2*dt; }
    if(this.position.y < this.move_to.y) { this.position.y += 2*dt; }

    return;

    //this.position.x = Math.lerp(this.position.x, this.target_position.x, 0.5*dt);


    if(this.frames.length > 0) {
      var frame = this.frames[0];

      var ct = Date.now() - this.processingFrames.started;

      if(ct >= frame.t) {
        this.target_position.x = frame.position.x;
        this.target_position.y = frame.position.y;
        this.frames.splice(0, 1);

        //console.log(frame.position.x)
      }
      //console.log(this.processingFrames)
    }
  }

  MoveTo(x, y) {
    this.move_to.x = x;
    this.move_to.y = y;
    this.moving = true;
  }

  Log(text) {
    var args = [`[Entity : ${this.id}]`];
    for (var a of arguments) { args.push(a); }
    console.log.apply(null, args);
  }
}
