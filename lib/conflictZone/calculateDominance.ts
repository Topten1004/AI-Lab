export const calculateDominance = (
  modelAPower: number,
  modelBPower: number
): 'A' | 'B' | 'balanced' => {
  const diff = modelAPower - modelBPower
  
  if (diff > 15) {
    return 'A'
  } else if (diff < -15) {
    return 'B'
  } else {
    return 'balanced'
  }
}

