Entity = class {
  constructor(id, x, y) {
    this.id = id;
    this.position = {x: x, y: y};
    this.target_position = {x: x, y: y};
  }

  Update(dt) {
    if(this.position.x > this.target_position.x) { this.position.x -= 2*dt; }
    if(this.position.x < this.target_position.x) { this.position.x += 2*dt; }

    if(this.position.y > this.target_position.y) { this.position.y -= 2*dt; }
    if(this.position.y < this.target_position.y) { this.position.y += 2*dt; }
  }

  MoveTo(x, y) {
    this.target_position.x = x;
    this.target_position.y = y;
    this.Log(`Move to ${x}, ${y}`);
  }

  Log(text) {
    var args = [`[Entity : ${this.id}]`];
    for (var a of arguments) { args.push(a); }
    console.log.apply(null, args);
  }
}
