export function calculateConfidenceWeight(minutesAgo, lambda = 0.015) {
  return Math.exp(-lambda * Math.max(0, minutesAgo));
}

export function calculateSuitabilityScore(spot, selectedVibe) {
  const capacityMap = { Quiet: 0.2, Moderate: 0.55, Packed: 0.9 };
  const cNorm = capacityMap[spot.status] ?? 0.5;

  const prefMatch =
    selectedVibe === 'All' || spot.vibe === selectedVibe ? 1.0 : 0.4;

  const alpha = 0.6;
  const beta = 0.4;
  const rawScore = alpha * (1 - cNorm) + beta * prefMatch;
  return Math.round(rawScore * 100);
}