export const applyPowerShift = (
  currentPower: number,
  shift: number,
  min: number = 0,
  max: number = 100
): number => {
  return Math.max(min, Math.min(max, currentPower + shift))
}

