import Random from "random";

const Position = require("../models/Position.ts");
const CoordinatesService = require("../services/CoordinatesService.ts");

class MovementService {
  randomPosition(position: typeof Position, velocity: number, worldWidth: number, worldHeight: number): typeof Position {
    const nextDirection = Random.normal(position.direction, 5)();
    const nextX = position.x + Math.cos(position.direction * Math.PI / 180) * velocity;
    const nextY = position.y + Math.sin(position.direction * Math.PI / 180) * velocity;

    const x = this.normalizeX(nextX, worldWidth);
    const y = this.normalizeY(nextY, worldHeight);
    const direction = this.normalizeAngle(nextDirection);

    return new Position(x, y, direction);
  }

  attackPosition(predatorPosition: typeof Position, velocity: number, preyPosition: typeof Position, worldWidth: number, worldHeight: number): typeof Position {
    const distance = CoordinatesService.distance(predatorPosition, preyPosition);

    if(distance <= velocity) {
      return preyPosition;
    } else {
      const nextDirection = CoordinatesService.direction(predatorPosition, preyPosition);
      const nextX = predatorPosition.x + Math.cos(nextDirection * Math.PI / 180) * velocity;
      const nextY = predatorPosition.y + Math.sin(nextDirection * Math.PI / 180) * velocity;

      const x = this.normalizeX(nextX, worldWidth);
      const y = this.normalizeY(nextY, worldHeight);
      const direction = this.normalizeAngle(nextDirection);

      return new Position(x, y, direction);
    }
  }

  defensePosition(preyPosition: typeof Position, velocity: number, predatorPosition: typeof Position, worldWidth: number, worldHeight: number): typeof Position {
    const nextDirection = Random.normal(CoordinatesService.direction(preyPosition, predatorPosition) + 180, 10)();
    let nextX = preyPosition.x + Math.cos(nextDirection * Math.PI / 180) * velocity;
    let nextY = preyPosition.y + Math.sin(nextDirection * Math.PI / 180) * velocity;

    const x = this.normalizeX(nextX, worldWidth);
    const y = this.normalizeY(nextY, worldHeight);
    const direction = this.normalizeAngle(nextDirection);

    return new Position(x, y, direction)
  }

  normalizeX(x: number, width: number): number {
    if(x < 0) {
      return 0;
    } else {
      return Math.min(x, width);
    }
  }

  normalizeY(y: number, height: number): number {
    if(y < 0) {
      return 0;
    } else {
      return Math.min(y, height);
    }
  }

  normalizeAngle(angle: number): number {
    return angle % 360 < 0 ? angle % 360 + 360 : angle % 360;
  }
}

module.exports = new MovementService();
