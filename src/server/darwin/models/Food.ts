import Random from 'random';

const World = require("./World.ts").default;
const Cell = require("./Cell.ts").default;
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
    const velocity = Random.normal(1, 0.1)();
    const visionRange = Random.normal(100, 1)();
    const calories = Random.normal(300, 3)();

    return new Food(radius, x, y, direction, velocity, visionRange, calories);
  }

  update(world: typeof World) {
    this.move(world);
  }

  move(world: typeof World) {
    const nearestCell: typeof Cell = this.nearestCell(world);
    const nearestCellInVisionRange = nearestCell && CoordinatesService.distance(this.x, this.y, nearestCell.x, nearestCell.y) <= this.visionRange;

    if(nearestCellInVisionRange) {
      this.moveEscape(world, nearestCell);
    } else {
      this.moveRandom(world);
    }
  }

  moveRandom(world: typeof World) {
    const nextDirection = Random.normal(this.direction, 10)();
    const nextX = this.x + Math.cos(nextDirection * Math.PI / 180) * this.velocity;
    const nextY = this.y + Math.sin(nextDirection * Math.PI / 180) * this.velocity;

    this.direction = CoordinatesService.normalizeAngle(nextDirection);
    this.x = CoordinatesService.normalizeX(nextX, world.width);
    this.y = CoordinatesService.normalizeY(nextY, world.height);
  }

  moveEscape(world: typeof World, cell: typeof Cell) {
    const nextDirection = Random.normal(CoordinatesService.direction(this.x, this.y, cell.x, cell.y) + 180, 10)();
    let nextX = this.x + Math.cos(nextDirection * Math.PI / 180) * this.velocity;
    let nextY = this.y + Math.sin(nextDirection * Math.PI / 180) * this.velocity;

    this.direction = CoordinatesService.normalizeAngle(nextDirection);
    this.x = CoordinatesService.normalizeX(nextX, world.width);
    this.y = CoordinatesService.normalizeY(nextY, world.height);
  }

  nearestCell(world: typeof World) {
    let nearestCell: typeof Cell = null;
    let nearestCellDistance: number = null;

    world.cells.forEach((cell: typeof Cell) => {
      const cellDistance = CoordinatesService.distance(this.x, this.y, cell.x, cell.y);

      if (nearestCell) {
        if(nearestCellDistance > cellDistance) {
          nearestCell = cell;
          nearestCellDistance = cellDistance;
        }
      } else {
        nearestCell = cell;
        nearestCellDistance = cellDistance;
      }
    });

    return nearestCell;
  }
}

module.exports = Food;
