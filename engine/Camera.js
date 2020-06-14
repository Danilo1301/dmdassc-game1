Camera = class {
  static position = {x: 0, y: 0};
  static offset = {x: 0, y: 0};
  static entity_following = null;

  static dev_zoom = 1;

  static update(delta) {
    if(this.entity_following != null) {
      this.position.x = this.entity_following.position.x;
      this.position.y = this.entity_following.position.y;
    }
  }

  static followEntity(entity) {
    this.entity_following = entity;
  }
}
