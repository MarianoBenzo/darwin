export default class Food {
  x: number;
  y: number;
  radius: number;

  constructor(food: any) {
    this.x = food.x;
    this.y = food.y;
    this.radius = food.radius;
  }
}
