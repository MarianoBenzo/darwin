class World {
  socketsIds: string[];
  width: number;
  height: number;
  food: Food[];

  constructor() {
    this.socketsIds = [];
    this.width = 1280;
    this.height = 720;
    this.food = [];
    for(let x = 0; x <= 100; x++) {
      this.food.push(new Food(Math.random() * this.width, Math.random() * this.height))
    }
  }

  addSocketId(socketId: string) {
    this.socketsIds.push(socketId);
  }

  update() {
    this.moveFood();
  }

  moveFood() {
    this.food.forEach(food => food.move(this.width, this.height));
  }
}

class Food {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(worldWidth: number, worldHeight: number) {
    this.x = (this.x + 1) % worldWidth;
    this.y = (this.y + 1) % worldHeight;
  }
}

export default new World();
