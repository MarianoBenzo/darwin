import Random from "random";

class Position {
  x: number;
  y: number;
  direction: number;

  constructor(x: number, y: number, direction: number) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  static random(worldWidth: number, worldHeight: number) {
    const x = Random.uniform(0, worldWidth)();
    const y = Random.uniform(0, worldHeight)();
    const direction = Random.uniform(0, 360)();

    return new Position(x, y, direction);
  }
}

module.exports = Position;
