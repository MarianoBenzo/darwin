import Random from "random";

const Position = require("../models/Position.ts");
const CoordinatesService = require("../services/CoordinatesService.ts");

class MovementService {
  getRandomPosition(position: typeof Position, velocity: number, worldWidth: number, worldHeight: number): typeof Position {
    let newDirection = Random.normal(position.direction, 5)();

    if(position.x === 0) {
      newDirection = position.direction < 180 ? Random.uniform(0, 90)() : Random.uniform(270, 360)();
    } else if (position.x === worldWidth) {
      newDirection = position.direction < 360 && position.direction > 270 ? Random.uniform(180, 270)() : Random.uniform(90, 180)();
    } else if (position.y === 0) {
      newDirection = position.direction < 270 ? Random.uniform(90, 180)() : Random.uniform(0, 90)();
    } else if (position.y === worldHeight) {
      newDirection = position.direction < 90 ? Random.uniform(270, 360)() : Random.uniform(180, 270)();
    }

    return this.getNewPosition(position, newDirection, velocity, worldWidth, worldHeight);
  }

  getAttackPosition(predatorPosition: typeof Position, velocity: number, preyPosition: typeof Position, worldWidth: number, worldHeight: number): typeof Position {
    const distance = CoordinatesService.distance(predatorPosition, preyPosition);

    if(distance <= velocity) {
      return preyPosition;
    } else {
      const newDirection = CoordinatesService.direction(predatorPosition, preyPosition);

      return this.getNewPosition(predatorPosition, newDirection, velocity, worldWidth, worldHeight);
    }
  }

  getDefensePosition(preyPosition: typeof Position, velocity: number, predatorPosition: typeof Position, worldWidth: number, worldHeight: number): typeof Position {
    const newDirection = CoordinatesService.direction(preyPosition, predatorPosition) + 180;

    return this.getNewPosition(preyPosition, newDirection, velocity, worldWidth, worldHeight);
  }

  getNewPosition(actualPosition: typeof Position, newDirection: number, velocity, worldWidth: number, worldHeight: number): typeof Position{
    let newX = actualPosition.x + Math.cos(newDirection * Math.PI / 180) * velocity;
    let newY = actualPosition.y + Math.sin(newDirection * Math.PI / 180) * velocity;

    const x = newX < 0 ? 0 : Math.min(newX, worldWidth);
    const y = newY < 0 ? 0 : Math.min(newY, worldHeight);
    const direction = newDirection % 360 < 0 ? newDirection % 360 + 360 : newDirection % 360;

    return new Position(x, y, direction)
  }
}

module.exports = new MovementService();
