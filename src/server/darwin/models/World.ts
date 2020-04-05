import Random from 'random';

const Food = require("./Food.ts");
const Cell = require("./Cell.ts");

class World {
  width: number;
  height: number;
  foods: typeof Food[];
  cells: typeof Cell[];

  constructor() {
    this.width = 1280;
    this.height = 720;
    this.foods = [];
    for(let x = 0; x < 10; x++) {
      const food = Food.newFood(this.width, this.height);
      this.foods.push(food);
    }
    this.cells = [];
    for(let x = 0; x < 5; x++) {
      const cell = Cell.newStartingCell(this.width, this.height);
      this.cells.push(cell);
    }

    setInterval(this.update.bind(this), 1000/60);
  }

  update() {
    this.generateFood();
    this.foods.forEach(food => food.update(this));
    this.cells.forEach(cell => cell.update(this));
  }

  addCell(cell: typeof Cell) {
    this.cells.push(cell);
  }

  addFood(food: typeof Food) {
    this.foods.push(food);
  }

  removeCell(cell: typeof Cell) {
    this.cells = this.cells.filter(c => c !== cell);
  }

  removeFood(food: typeof Food) {
    this.foods = this.foods.filter(f => f !== food);
  }

  generateFood() {
    if (Random.uniformInt(0, 50)() === 0) {
      this.addFood(Food.newFood(this.width, this.height));
    }
  }
}

export default new World();
