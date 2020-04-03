import {World} from "../models/World";
import Food from "../models/Food";
import Cell from "../models/Cell";

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

  drawWorld(world: World) {
    if(this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      this.drawGrid(world.width, world.height);

      world.foods.forEach(food =>
        this.drawFood(food)
      );

      world.cells.forEach(cell =>
        this.drawCell(cell)
      )
    }
  }

  drawCell(cell: Cell) {
    const fillColor = 'rgba(0, 0, 255, 0.7)';
    const strokeColor = 'rgba(0, 0, 255, 0.8)';
    this.drawCircle(cell.x, cell.y, 15, 3, fillColor, strokeColor);
  }

  drawFood(food: Food) {
    const fillColor = 'rgba(255, 0, 0, 0.6)';
    const strokeColor = 'rgba(255, 0, 0, 0.7)';
    this.drawCircle(food.x, food.y, 5, 2, fillColor, strokeColor);
  }

  drawGrid(width: number, height: number) {
    const fillColor = 'rgba(255, 255, 255)';
    const strokeColor = 'rgba(221, 221, 221)';

    this.ctx.fillStyle = fillColor;
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

    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();

  }

  drawCircle(x: number, y: number, radius: number, lineWidth: number, fillColor: string, strokeColor: string) {
    this.ctx.fillStyle = fillColor;
    this.ctx.beginPath();
    this.ctx.arc(x,y,radius,0,(Math.PI/180)*360,true);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.strokeStyle = strokeColor;
    this.ctx.lineWidth = lineWidth;
    this.ctx.stroke();
  }
}

export default new CanvasService();
