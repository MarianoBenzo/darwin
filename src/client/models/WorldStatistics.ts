class WorldStatistics {
  statistics: Statistics[];

  constructor(worldStatistics: any) {
    this.statistics = worldStatistics.map(statistics => new Statistics(statistics));
  }
}

class Statistics {
  text: string;
  value: string;

  constructor(statistics: any) {
    this.text = statistics.text;
    this.value = statistics.value;
  }
}

export default WorldStatistics;
