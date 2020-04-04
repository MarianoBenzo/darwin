import Random from 'random';

const World = require("./World.ts").default;
const Food = require("./Food.ts").default;
const CoordinatesService = require("../services/CoordinatesService.ts").default;

class Cell {
  age: number;
  generation: number;
  radius: number;
  x: number;
  y: number;
  direction: number;
  velocity: number;
  visionRange: number;
  mitosisTime: number;
  maxHungry: number;
  hungry: number;

  constructor(
    generation: number,
    radius: number,
    x: number,
    y: number,
    direction: number,
    velocity: number,
    visionRange: number,
    mitosisTime: number,
    maxHungry: number,
    hungry?: number
  ) {
    this.age = 0;
    this.generation = generation;
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.velocity = velocity;
    this.visionRange = visionRange;
    this.mitosisTime = mitosisTime;
    this.maxHungry = maxHungry;
    this.hungry = hungry ? hungry : 0;
  }

  static newStartingCell(worldWidth: number, worldHeight: number) {
    const generation = 0;
    const radius = 15;
    const x = Random.uniform(0, worldWidth)();
    const y = Random.uniform(0, worldHeight)();
    const direction = Random.uniform(0, 360)();
    const velocity = Random.normal(2, 0.2)();
    const visionRange = Random.normal(200, 2)();
    const mitosisTime = Math.round(Random.normal(2000, 20)());
    const maxHungry = Math.round(Random.normal(1000, 10)());

    return new Cell(generation, radius, x, y, direction, velocity, visionRange, mitosisTime, maxHungry);
  }

  mitosis(world: typeof World) {
    const generation = this.generation + 1;
    const radius = 15;
    const x = this.x;
    const y = this.y;
    const direction = this.direction;
    const velocity = Random.normal(this.velocity, 0.2)();
    const visionRange = Random.normal(this.visionRange, 2)();
    const mitosisTime = Math.round(Random.normal(this.mitosisTime, 20)());
    const maxHungry = Math.round(Random.normal(this.maxHungry, 10)());
    const hungry = Math.min(this.hungry, maxHungry);

    const newCell = new Cell(generation, radius, x, y, direction, velocity, visionRange, mitosisTime, maxHungry, hungry);

    world.addCell(newCell);
  }

  update(world: typeof World) {
    this.age += 1;
    this.hungry += 1;

    if(this.hungry >= this.maxHungry) world.removeCell(this);
    if(this.age % this.mitosisTime === 0) this.mitosis(world);

    this.move(world);
  }

  move(world: typeof World) {
    const targetFood: typeof Food = this.targetFood(world);
    const targetFoodInVisionRange = targetFood && CoordinatesService.distance(this.x, this.y, targetFood.x, targetFood.y) <= this.visionRange;

    if (targetFoodInVisionRange) {
      this.moveAttack(world, targetFood);
    } else {
      this.moveRandom(world.width, world.height);
    }
  }

  moveRandom(worldWidth: number, worldHeight: number) {
    const nextDirection = Random.normal(this.direction, 5)();
    const nextX = this.x + Math.cos(this.direction * Math.PI / 180) * this.velocity;
    const nextY = this.y + Math.sin(this.direction * Math.PI / 180) * this.velocity;

    this.direction = CoordinatesService.normalizeAngle(nextDirection);
    this.x = CoordinatesService.normalizeX(nextX, worldWidth);
    this.y = CoordinatesService.normalizeY(nextY, worldHeight);
  }

  moveAttack(world: typeof World, food: typeof Food) {
    const nextDirection = CoordinatesService.direction(this.x, this.y, food.x, food.y);
    let nextX = this.x + Math.cos(nextDirection * Math.PI / 180) * this.velocity;
    let nextY = this.y + Math.sin(nextDirection * Math.PI / 180) * this.velocity;

    let foodDistance: number = CoordinatesService.distance(this.x, this.y, food.x, food.y);
    if (this.velocity >= foodDistance) {
      nextX = food.x;
      nextY = food.y;

      this.eat(world, food);
    }

    this.direction = CoordinatesService.normalizeAngle(nextDirection);
    this.x = CoordinatesService.normalizeX(nextX, world.width);
    this.y = CoordinatesService.normalizeY(nextY, world.height);
  }

  eat(world: typeof World, food: typeof Food) {
    this.hungry -= food.calories;
    world.removeFood(food);
  }

  targetFood(world: typeof Food): typeof Food{
    let targetFood: typeof Food = null;
    let targetFoodDistance: number = null;

    world.foods.forEach((food: typeof Food) => {
      const foodDistance = CoordinatesService.distance(this.x, this.y, food.x, food.y);

      if(this.hungry >= food.calories) {

        if (targetFood) {
          if(targetFoodDistance > foodDistance) {
            targetFood = food;
            targetFoodDistance = foodDistance;
          }
        } else {
          targetFood = food;
          targetFoodDistance = foodDistance;
        }

      }
    });

    return targetFood;

  }
}

module.exports = Cell;
