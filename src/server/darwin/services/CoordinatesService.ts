const Position = require("../models/Position.ts").default;

class CoordinatesService {

  vectorAngle(x: number, y: number) {
    if (x === 0) return Math.atan(y/x) * 180/Math.PI;
    if (x > 0 && y > 0) return Math.atan(y/x) * 180/Math.PI;
    if (x < 0 && y > 0) return Math.atan(y/x) * 180/Math.PI + 180;
    if (x < 0 && y < 0) return Math.atan(y/x) * 180/Math.PI + 180;
    if (x > 0 && y < 0) return Math.atan(y/x) * 180/Math.PI + 360;
    if (x > 0 && y === 0) return 0;
    if (x === 0 && y > 0) return 90;
    if (x < 0 && y === 0) return 180;
    if (x === 0 && y < 0) return 270;
  }

  vectorModule(x: number, y: number) {
    return Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
  }

  distance(position1: typeof Position, position2: typeof Position) {
    return this.vectorModule(position2.x - position1.x, position2.y - position1.y)
  }

  direction(position1: typeof Position, position2: typeof Position) {
    return this.vectorAngle(position2.x - position1.x, position2.y - position1.y)
  }
}

module.exports = new CoordinatesService();
