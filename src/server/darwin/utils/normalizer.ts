class Normalizer {
  x(x: number, width: number): number {
    return x % width < 0 ? x % width + width : x % width;
  }

  y(y: number, height: number): number {
    return y % height < 0 ? y % height + height : y % height;
  }

  angle(angle: number): number {
    return angle % 360 < 0 ? angle % 360 + 360 : angle % 360;
  }
}

export default new Normalizer();
