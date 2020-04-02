import {World} from "../models/World";

class CanvasService {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor() {
    this.ctx = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  initialize(canvas: HTMLCanvasElement, ) {
    canvas.style.width='100%';
    canvas.style.height='100%';
    canvas.width  = this.width;
    canvas.height = this.height;

    this.ctx = canvas.getContext('2d');
  }

  draw(world: World) {
    if(this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.drawGrid(world.width, world.height);

      this.drawCircle(world.width / 2, world.height / 2, 50);

      world.food.forEach(food =>
        this.drawCircle(food.x, food.y, 10)
      )
    }
  }

  drawGrid(width: number, height: number) {

    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillRect(0, 0, width, height);

    this.ctx.beginPath();
    for (let x = 0; x < width; x += 40) {
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, height);
    }
    this.ctx.moveTo(width, 0);
    this.ctx.lineTo(width, height);

    for (let y = 0; y < height; y += 40) {
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(width, y);
    }
    this.ctx.moveTo(0, height);
    this.ctx.lineTo(width, height);

    this.ctx.closePath();

    this.ctx.strokeStyle = "#ddd";
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

  }

  drawCircle(x: number, y: number, radius: number) {
    this.ctx.fillStyle = "#FF0000";
    this.ctx.beginPath();
    this.ctx.arc(x,y,radius,0,(Math.PI/180)*360,true);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.strokeStyle = "#D00000";
    this.ctx.lineWidth = 4;
    this.ctx.stroke();
  }

}

export default new CanvasService();
