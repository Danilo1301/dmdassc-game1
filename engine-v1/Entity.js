Entity = class {
  constructor() {
    this.position = {x: 0, y: 0};
    this.target_position = {x: 0, y: 0};
  }

  Update(dt) {
    if(this.position.x > this.target_position.x) { this.position.x -= 2*dt; }
    if(this.position.x < this.target_position.x) { this.position.x += 2*dt; }

    if(this.position.y > this.target_position.y) { this.position.y -= 2*dt; }
    if(this.position.y < this.target_position.y) { this.position.y += 2*dt; }
  }

  MoveToPosition(x, y) {
    console.log(`Moving to ${x}, ${y}`);
    this.target_position.x = x;
    this.target_position.y = y;

  }
}
