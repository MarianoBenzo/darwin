export default class Cell {
  x: number;
  y: number;
  radius: number;

  constructor(cell: any) {
    this.x = cell.x;
    this.y = cell.y;
    this.radius = cell.radius;
  }
}
