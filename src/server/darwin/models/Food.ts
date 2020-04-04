import Random from 'random';

const World = require("./World.ts").default;
const CoordinatesService = require("../services/CoordinatesService.ts").default;

class Food {
  radius: number;
  x: number;
  y: number;
  direction: number;
  velocity: number;
  visionRange: number;
  calories: number;

  constructor(
    radius: number,
    x: number,
    y: number,
    direction: number,
    velocity: number,
    visionRange: number,
    calories: number
  ) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.velocity = velocity;
    this.visionRange = visionRange;
    this.calories = calories;
  }

  static newFood(worldWidth: number, worldHeight: number) {
    const radius = 5;
    const x = Random.uniform(0, worldWidth)();
    const y = Random.uniform(0, worldHeight)();
    const direction = Random.uniform(0, 360)();
    const velocity = Random.normal(0.5, 0.05)();
    const visionRange = Random.normal(100, 1)();
    const calories = Random.normal(300, 3)();

    return new Food(radius, x, y, direction, velocity, visionRange, calories);
  }

  update(world: typeof World) {
    this.moveRandom(world.width, world.height);
  }

  moveRandom(worldWidth: number, worldHeight: number) {
    const nextDirection = Random.normal(this.direction, 10)();
    const nextX = this.x + Math.cos(nextDirection * Math.PI / 180) * this.velocity;
    const nextY = this.y + Math.sin(nextDirection * Math.PI / 180) * this.velocity;

    this.direction = CoordinatesService.normalizeAngle(nextDirection);
    this.x = CoordinatesService.normalizeX(nextX, worldWidth);
    this.y = CoordinatesService.normalizeY(nextY, worldHeight);
  }
}

module.exports = Food;
