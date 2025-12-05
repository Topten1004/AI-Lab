export const getNextPatternValue = (
  pattern: string[],
  index: number
): string => {
  return pattern[index % pattern.length]
}

