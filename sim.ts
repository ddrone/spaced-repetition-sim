function addCards(cards: Map<number, number>, level: number, count: number) {
  const curr = cards.get(level);
  const newCount = (curr ?? 0) + count;
  cards.set(level, newCount);
}

function simulateSuccess(days: number, newCardsPerDay: number): number[] {
  const cardsPerLevel: Map<number, number>[] = [];
  for (let i = 0; i < days; i++) {
    const newMap = new Map<number, number>();
    newMap.set(0, newCardsPerDay);
    cardsPerLevel.push(newMap);
  }

  const result: number[] = [];
  for (let i = 0; i < days; i++) {
    let currResult = 0;
    const cards = cardsPerLevel[i];
    for (const [level, count] of cards.entries()) {
      const nextDay = i + Math.pow(2, level);
      currResult += count;
      if (nextDay < days) {
        addCards(cardsPerLevel[nextDay], level + 1, count);
      }
    }
    result.push(currResult);
  }
  return result;
}

function simulateSuccessWithProbability(days: number, newCardsPerDay: number, probability: number): number[] {
  const cardsPerLevel: Map<number, number>[] = [];
  for (let i = 0; i < days; i++) {
    const newMap = new Map<number, number>();
    newMap.set(0, newCardsPerDay);
    cardsPerLevel.push(newMap);
  }

  const result: number[] = [];
  for (let i = 0; i < days; i++) {
    let currResult = 0;
    const cards = cardsPerLevel[i];
    for (const [level, count] of cards.entries()) {
      currResult += count;
      for (let j = 0; j < count; j++) {
        const nextLevel = (Math.random() < probability) ? level + 1 : 1;
        const nextDay = i + Math.pow(2, nextLevel - 1);
        if (nextDay < days) {
          addCards(cardsPerLevel[nextDay], nextLevel, 1);
        }
      }
    }
    result.push(currResult);
  }
  return result;
}

function runExperiments(days: number, newCardsPerDay: number, probability: number, count: number) {
  const result: number[][] = [];

  for (let i = 0; i < count; i++) {
    result.push(simulateSuccessWithProbability(days, newCardsPerDay, probability));
  }

  for (let i = 0; i < days; i++) {
    const row = [i];
    for (let j = 0; j < count; j++) {
      row.push(result[j][i]);
    }
    console.log(row.join('\t'));
  }
}

function printSimpleExperiment() {
  const result = simulateSuccess(2 * 356, 10);
  for (let i = 0; i < result.length; i++) {
    console.log(`${i}\t${result[i]}`);
  }
}

runExperiments(2 * 356, 10, 0.90, 10);
