import Random from 'random';

const World = require("./World.ts");
const Cell = require("./Cell.ts");
const Position = require("./Position.ts");
const MovementService = require("../services/MovementService.ts");
const CoordinatesService = require("../services/CoordinatesService.ts");

class Food {
  radius: number;
  position: typeof Position;
  velocity: number;
  visionRange: number;
  calories: number;

  constructor(
    radius: number,
    position: typeof Position,
    velocity: number,
    visionRange: number,
    calories: number
  ) {
    this.radius = radius;
    this.position = position;
    this.velocity = velocity;
    this.visionRange = visionRange;
    this.calories = calories;
  }

  static startingFood(worldWidth: number, worldHeight: number) {
    const radius = 5;
    const position = Position.random(worldWidth, worldHeight);
    const velocity = Random.normal(1, 0.1)();
    const visionRange = Random.normal(100, 1)();
    const calories = Random.normal(300, 3)();

    return new Food(radius, position, velocity, visionRange, calories);
  }

  update(world: typeof World) {
    this.move(world);
  }

  move(world: typeof World) {
    const predator: typeof Cell = world.getNearestCell(this.position);
    const predatorInVisionRange = predator && CoordinatesService.distance(this.position, predator.position) <= this.visionRange;

    if(predatorInVisionRange) {
      this.position = MovementService.defensePosition(this.position, this.velocity, predator.position, world.width, world.height);
    } else {
      this.position = MovementService.randomPosition(this.position, this.velocity, world.width, world.height);
    }
  }
}

module.exports = Food;
