import Position from "./Position";

export default class Food {
  position: Position;
  radius: number;

  constructor(food: any) {
    this.position = new Position(food.position);
    this.radius = food.radius;
  }
}
