import Random from 'random';

const Food = require("./Food.ts");
const Cell = require("./Cell.ts");

class World {
  socketsIds: string[];
  width: number;
  height: number;
  foods: typeof Food[];
  cells: typeof Cell[];

  constructor() {
    this.socketsIds = [];
    this.width = 1280;
    this.height = 720;
    this.foods = [];
    for(let x = 0; x <= 10; x++) {
      const width = Random.uniform(0, this.width)();
      const height = Random.uniform(0, this.height)();
      const angle = Random.uniform(0, 360)();
      const velocity = 0.5;
      this.foods.push(new Food(width, height, angle, velocity))
    }
    this.cells = [];
    for(let x = 0; x <= 20; x++) {
      const width = Random.uniform(0, this.width)();
      const height = Random.uniform(0, this.height)();
      const angle = Random.uniform(0, 360)();
      const velocity = 2;
      this.cells.push(new Cell(width, height, angle, velocity));
    }
  }

  addSocketId(socketId: string) {
    this.socketsIds.push(socketId);
  }

  update() {
    this.moveFoods();
    this.moveCells();
  }

  moveFoods() {
    this.foods.forEach(food => food.moveRandom(this.width, this.height));
  }

  moveCells() {
    this.cells.forEach(cell => cell.moveRandom(this.width, this.height));
  }
}

export default new World();
