
export function calculateCosts(costs) {
  const total = Object.values(costs).reduce(function (sum, amount) {
    return sum + amount;
  }, 0);

  return { total: total };
}
