export class World {
  socketsIds: string[];
  width: number;
  height: number;
  food: Food[];

  constructor(world: any) {
    this.socketsIds = world.socketsIds;
    this.width = world.width;
    this.height = world.height;
    this.food = world.food.map(food => new Food(food))
  }
}

class Food {
  x: number;
  y: number;

  constructor(food: any) {
    this.x = food.x;
    this.y = food.y;
  }
}
