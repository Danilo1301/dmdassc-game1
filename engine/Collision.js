Collision = class {
  static bodies = [];

  static CreateBody(entity) {
    var body = new this.Body(entity);
    this.bodies.push(body);
    return body;
  }

  static GetCollisionsOfBody(body) {
    var col = {
      collidingWith: []
    }

    for (var test of this.bodies) {
      if(body == test) { continue }

      for (var test_part of test.parts) {
        for (var body_part of body.parts) {
          if(Utils.CheckRectColision(
            {x: body.entity.position.x + body_part.position.x, y: body.entity.position.y + body_part.position.y, width: body_part.width, height: body_part.height},
            {x: test.entity.position.x + test_part.position.x, y: test.entity.position.y + test_part.position.y, width: test_part.width, height: test_part.height}
          )) {
            if(!col.collidingWith.includes(test)) { col.collidingWith.push(test); }
          }
        }
      }
    }

    body.info = col;

    return col;
  }
}

Collision.Body = class {
  constructor(entity) {
    this.entity = entity;
    this.parts = [];
  }

  AddRect(x, y, width, height) {
    var part = {};
    part.position = {x: x, y: y};
    part.width = width;
    part.height = height;
    this.parts.push(part);
  }
}
