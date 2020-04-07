import Position from "./Position";

export default class Cell {
  position: Position;
  radius: number;

  constructor(cell: any) {
    this.position = new Position(cell.position);
    this.radius = cell.radius;
  }
}
