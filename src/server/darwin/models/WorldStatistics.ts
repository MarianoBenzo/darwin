const World = require("./World.ts");

class WorldStatistics {
  statistics: Statistics[];

  constructor(world: typeof World) {
    const numberOfFoods = world.foods.length;
    const numberOfCells = world.cells.length;

    let maxGeneration = 0;
    let sumOfAge = 0;
    let sumOfRadius = 0;
    let sumOfVelocity = 0;
    let sumOfVisionRange = 0;
    let sumOfMitosisTime = 0;
    let sumOfMaxHungry = 0;
    let sumOfHungry = 0;

    world.cells.forEach(cell => {
      maxGeneration = Math.max(maxGeneration, cell.generation);
      sumOfAge += cell.age;
      sumOfRadius += cell.radius;
      sumOfVelocity += cell.velocity;
      sumOfVisionRange += cell.visionRange;
      sumOfMitosisTime += cell.mitosisTime;
      sumOfMaxHungry += cell.maxHungry;
      sumOfHungry += cell.hungry;
    });

    this.statistics = [
      new Statistics("numberOfFoods", numberOfFoods),
      new Statistics("numberOfCells", numberOfCells),
      new Statistics("maxGeneration", maxGeneration),
      new Statistics("averageAge", sumOfAge / numberOfCells),
      new Statistics("averageRadius", sumOfRadius / numberOfCells),
      new Statistics("averageVelocity", sumOfVelocity / numberOfCells),
      new Statistics("averageVisionRange", sumOfVisionRange / numberOfCells),
      new Statistics("averageMitosisTime", sumOfMitosisTime / numberOfCells),
      new Statistics("averageMaxHungry", sumOfMaxHungry / numberOfCells),
      new Statistics("averageHungry", sumOfHungry / numberOfCells),
    ];
  }
}

class Statistics {
  text: string;
  value: string;

  constructor(text: string, value: number) {
    this.text = text;
    this.value = value % 1 !== 0 ? value.toFixed(2) : value.toString();
  }
}

module.exports = WorldStatistics;
