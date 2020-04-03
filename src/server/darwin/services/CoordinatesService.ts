class CoordinatesService {
  normalizeX(x: number, width: number): number {
    return x % width < 0 ? x % width + width : x % width;
  }

  normalizeY(y: number, height: number): number {
    return y % height < 0 ? y % height + height : y % height;
  }

  normalizeAngle(angle: number): number {
    return angle % 360 < 0 ? angle % 360 + 360 : angle % 360;
  }

  vectorAngle(x: number, y: number) {
    return Math.atan(y/x);
  }

  vectorModule(x: number, y: number) {
    return Math.sqrt(Math.pow(x,2) + Math.pow(y,2))
  }

  distance(x1: number, y1: number, x2: number, y2: number) {
    return this.vectorModule(x2 - x1, y2 - y1)
  }
}

export default new CoordinatesService();
