const catalog = [
  { id: 'c1', title: 'Basic Science Lab (Sim)', topic: 'science', level: 1, durationMin: 10 },
  { id: 'c2', title: 'Math Practice: Numbers', topic: 'math', level: 1, durationMin: 8 },
  { id: 'c3', title: 'Local Language Reading', topic: 'language', level: 1, durationMin: 12 },
  { id: 'c4', title: 'Physics: Gravity Simulation', topic: 'science', level: 2, durationMin: 15 },
  { id: 'c5', title: 'Storytelling in AR (culture)', topic: 'social', level: 1, durationMin: 10 }
];

function recommend(userProfile, n = 3) {
  const { grade = 1, preferredTopics = [], performance = {} } = userProfile || {};

  const scored = catalog.map(item => {
    let score = 0;
    if (preferredTopics.includes(item.topic)) score += 20;
    if (item.level <= grade + 1) score += 10;

    const perf = performance[item.topic];
    if (typeof perf === 'number') {
      score += (100 - perf) * 0.2;
    } else {
      score += 10;
    }

    score += Math.max(0, 10 - item.durationMin);
    return { ...item, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, n);
}

module.exports = { recommend, catalog };
