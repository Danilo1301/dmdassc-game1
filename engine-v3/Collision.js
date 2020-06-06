CollisionBody = class {
  constructor() {
    this.parts = [];
    this.position = {x: 0, y: 0}
  }

  Add(x, y, width, height) {
    this.parts.push({x: x, y: y, width: width, height: height})
  }
}

Collision = class {
  constructor() {
    this.bodies = [];
  }

  CreateBody(x, y) {
    var body = new CollisionBody();
    this.bodies.push(body);
    return body;
  }

  Update(dt) {
    for (var body of this.bodies) {
      body.colliding_with = null;
      body.isColliding = false;

      for (var test of this.bodies) {
        if(body == test) { continue }


        for (var test_part of test.parts) {
          for (var body_part of body.parts) {
            if(this.CheckRectColision(
              {x: body.position.x + body_part.x, y: body.position.y + body_part.y, width: body_part.width, height: body_part.height},
              {x: test.position.x + test_part.x, y: test.position.y + test_part.y, width: test_part.width, height: test_part.height}
            )) {
              body.isColliding = true;
              body.colliding_with = test;
            }
          }
        }

      }

    }

  }

  CheckRectColision(rect, test) {
    return test.x + test.width > rect.x &&
      test.y + test.height > rect.y &&
      rect.x + rect.width > test.x &&
      rect.y + rect.height > test.y;
  }
}
