
import { calculateCosts } from "./calculator.js";

function test(name, actual, expected) {
  if (actual === expected) {
    console.log("✅ Пройдено: " + name);
  } else {
    console.error(
      "❌ Не пройдено: " + name +
      ". Очікували " + expected +
      ", отримали " + actual
    );
  }
}

test(
  "Складає всі витрати",
  calculateCosts({
    carPrice: 3000,
    auctionFees: 500,
    inlandShipping: 0,
    oceanShipping: 1000,
    customs: 1200,
    localCosts: 0,
    repair: 800,
    insurance: 100
  }).total,
  6600
);

test(
  "Працює з нульовими витратами",
  calculateCosts({
    carPrice: 0,
    auctionFees: 0
  }).total,
  0
);

test(
  "Рахує кількість витрат",
  calculateCosts({
    carPrice: 3000,
    auctionFees: 500,
    repair: 800
  }).count,
  3
);

test(
  "Рахує кількість нульових витрат",
  calculateCosts({
    carPrice: 0,
    auctionFees: 0
  }).count,
  2
);