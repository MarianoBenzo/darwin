export default class Position {
  x: number;
  y: number;
  direction: number;

  constructor(position: any) {
    this.x = position.x;
    this.y = position.y;
    this.direction = position.direction;
  }
}
