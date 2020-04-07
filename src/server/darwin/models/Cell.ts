import Random from 'random';

const World = require("./World.ts");
const Food = require("./Food.ts");
const Position = require("./Position.ts");
const MovementService = require("../services/MovementService.ts");
const CoordinatesService = require("../services/CoordinatesService.ts");

class Cell {
  age: number;
  generation: number;
  radius: number;
  position: typeof Position;
  velocity: number;
  visionRange: number;
  mitosisTime: number;
  maxHungry: number;
  hungry: number;

  constructor(
    generation: number,
    radius: number,
    position: typeof Position,
    velocity: number,
    visionRange: number,
    mitosisTime: number,
    maxHungry: number,
    hungry?: number
  ) {
    this.age = 0;
    this.generation = generation;
    this.radius = radius;
    this.position = position;
    this.velocity = velocity;
    this.visionRange = visionRange;
    this.mitosisTime = mitosisTime;
    this.maxHungry = maxHungry;
    this.hungry = hungry ? hungry : 0;
  }

  static startingCell(worldWidth: number, worldHeight: number) {
    const generation = 0;
    const radius = 15;
    const position = Position.random(worldWidth, worldHeight);
    const velocity = Random.normal(2, 0.2)();
    const visionRange = Random.normal(200, 2)();
    const mitosisTime = Math.round(Random.normal(2000, 20)());
    const maxHungry = Math.round(Random.normal(1000, 10)());

    return new Cell(generation, radius, position, velocity, visionRange, mitosisTime, maxHungry);
  }

  mitosis(world: typeof World) {
    const generation = this.generation + 1;
    const radius = 15;
    const position = this.position;
    const velocity = Random.normal(this.velocity, 0.2)();
    const visionRange = Random.normal(this.visionRange, 2)();
    const mitosisTime = Math.round(Random.normal(this.mitosisTime, 20)());
    const maxHungry = Math.round(Random.normal(this.maxHungry, 10)());
    const hungry = Math.min(this.hungry, maxHungry);

    const newCell = new Cell(generation, radius, position, velocity, visionRange, mitosisTime, maxHungry, hungry);

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
    const prey: typeof Food = world.getNearestFood(this.position);
    const preyInVisionRange = prey && CoordinatesService.distance(this.position, prey.position) <= this.visionRange;
    const hungryEnough = this.maxHungry * 0.7 < this.hungry;

    if (preyInVisionRange && hungryEnough) {
      this.position = MovementService.getAttackPosition(this.position, this.velocity, prey.position, world.width, world.height);

      const distance: number = CoordinatesService.distance(this.position, prey.position);

      if(distance <= this.radius - prey.radius) {
        this.eat(world, prey);
      }
    } else {
      this.position = MovementService.getRandomPosition(this.position, this.velocity, world.width, world.height);
    }
  }

  eat(world: typeof World, food: typeof Food) {
    this.hungry = Math.max(0, this.hungry - food.calories);
    world.removeFood(food);
  }
}

module.exports = Cell;
