import Food from "./Food";
import Cell from "./Cell";

export class World {
  socketsIds: string[];
  width: number;
  height: number;
  foods: Food[];
  cells: Cell[];

  constructor(world: any) {
    this.socketsIds = world.socketsIds;
    this.width = world.width;
    this.height = world.height;
    this.foods = world.foods.map(food => new Food(food));
    this.cells = world.cells.map(cell => new Cell(cell));
  }
}
