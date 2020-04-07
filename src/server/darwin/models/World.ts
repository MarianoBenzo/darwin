import Random from 'random';

const Food = require("./Food.ts");
const Cell = require("./Cell.ts");
const Position = require("./Position.ts");
const CoordinatesService = require("../services/CoordinatesService.ts");

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
      const food = Food.startingFood(this.width, this.height);
      this.foods.push(food);
    }
    this.cells = [];
    for(let x = 0; x < 5; x++) {
      const cell = Cell.startingCell(this.width, this.height);
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
    if (Random.uniformInt(0, 25)() === 0) {
      this.addFood(Food.startingFood(this.width, this.height));
    }
  }

  getNearestCell(position: typeof Position): typeof Cell {
    let nearestCell: typeof Cell = null;
    let nearestCellDistance: number = null;

    this.cells.forEach((cell: typeof Cell) => {
      const cellDistance = CoordinatesService.distance(position, cell.position);

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

  getNearestFood(position: typeof Position): typeof Food {
    let nearestFood: typeof Food = null;
    let nearestFoodDistance: number = null;

    this.foods.forEach((food: typeof Food) => {
      const foodDistance = CoordinatesService.distance(position, food.position);

      if (nearestFood) {
        if(nearestFoodDistance > foodDistance) {
          nearestFood = food;
          nearestFoodDistance = foodDistance;
        }
      } else {
        nearestFood = food;
        nearestFoodDistance = foodDistance;
      }
    });

    return nearestFood;
  }
}

module.exports = new World();
