Utils = class {
  static checkPoint(center, radius, point) {
    return Math.sqrt(Math.pow((point[0] - center[0]), 2) + Math.pow((point[1] - center[1]), 2)) < radius;
  }

  static checkCircleCollision(p1x, p1y, r1, p2x, p2y, r2) {
    return ((r1 + r2) ** 2 > (p1x - p2x) ** 2 + (p1y - p2y) ** 2);
  }

  static getAvaliableId(object) {
    var id = 0;
    for (var k in object) {
      if(object[k].id != id) { break; }
      id++;
    }
    return id;
  }

  static CheckRectColision(rect, test) {
    return test.x + test.width > rect.x &&
      test.y + test.height > rect.y &&
      rect.x + rect.width > test.x &&
      rect.y + rect.height > test.y;
  }

  static isPointInsideRect(point, rect) {
      return rect.x <= point.x && point.x <= rect.x + rect.width &&
             rect.y <= point.y && point.y <= rect.y + rect.height;
  }


  static Load() {
    Math.lerp = function (value1, value2, amount) {
    	amount = amount < 0 ? 0 : amount;
    	amount = amount > 1 ? 1 : amount;
    	return value1 + (value2 - value1) * amount;
    };
  }
}
