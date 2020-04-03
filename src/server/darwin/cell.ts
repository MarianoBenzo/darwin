import Random from 'random';

const Normalizer = require("./utils/normalizer.ts").default;

class Cell {
  x: number;
  y: number;
  angle: number;
  velocity: number;

  constructor(x: number, y: number, angle: number, velocity: number) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.velocity = velocity;
  }

  moveRandom(worldWidth: number, worldHeight: number) {
    const nextAngle = Random.normal(this.angle, 0.15)();
    const nextX = this.x + Math.cos(this.angle) * this.velocity;
    const nextY = this.y + Math.sin(this.angle) * this.velocity;

    this.angle = Normalizer.angle(nextAngle);
    this.x = Normalizer.x(nextX, worldWidth);
    this.y = Normalizer.y(nextY, worldHeight);
  }
}

module.exports = Cell;
