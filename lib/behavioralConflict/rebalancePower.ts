export const rebalancePower = (
  modelAPower: number,
  modelBPower: number,
  rebalanceRate: number = 0.05
): { modelAPower: number; modelBPower: number } => {
  const diff = (modelAPower - modelBPower) * rebalanceRate
  return {
    modelAPower: modelAPower - diff,
    modelBPower: modelBPower + diff,
  }
}

