export const generatePrediction = (
  pattern: string[],
  patternIndex: number,
  willPredictCorrectly: boolean
): string => {
  if (willPredictCorrectly) {
    return pattern[(patternIndex + 1) % pattern.length]
  } else {
    return pattern[Math.floor(Math.random() * pattern.length)]
  }
}

