import Random from 'random';

const CoordinatesService = require("../services/CoordinatesService.ts").default;

class Food {
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
    const nextAngle = Random.normal(this.angle, 0.20)();
    const nextX = this.x + Math.cos(this.angle) * this.velocity;
    const nextY = this.y + Math.sin(this.angle) * this.velocity;

    this.angle = CoordinatesService.normalizeAngle(nextAngle);
    this.x = CoordinatesService.normalizeX(nextX, worldWidth);
    this.y = CoordinatesService.normalizeY(nextY, worldHeight);
  }
}

module.exports = Food;
