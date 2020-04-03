export default class Cell {
  x: number;
  y: number;

  constructor(food: any) {
    this.x = food.x;
    this.y = food.y;
  }
}
