import { calculateCosts } from "./calculator.js";
const breakdown = document.querySelector("#breakdown");

const fields = [
  ["carPrice", "Ціна автомобіля"],
  ["auctionFees", "Збори аукціону"],
  ["inlandShipping", "Доставка до порту"],
  ["oceanShipping", "Морська доставка та логістика"],
  ["customs", "Митні платежі"],
  ["localCosts", "Доставка по Україні та інші витрати"],
  ["repair", "Ремонт"],
  ["insurance", "Страхування"]
];

function formatUSD(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

function validateCosts(costs) {
  const invalidField = fields.find(function ([id]) {
    const value = costs[id];

    return value.trim() === "" ||
      !Number.isFinite(Number(value)) ||
      Number(value) < 0;
  });

  return invalidField ? invalidField[1] : null;
}


function calculateTotal() {
  
const rawCosts = Object.fromEntries(
  fields.map(function ([id]) {
    return [
      id,
      document.getElementById(id).value
    ];
  })
);

const invalidField = validateCosts(rawCosts);

if (invalidField) {
  breakdown.innerHTML = "";

  const message = document.createElement("p");
  message.textContent = "Перевір поле: " + invalidField;

  breakdown.append(message);
  return;
}


  
const calculation = {
  country: document.getElementById("country").value,
  auction: document.getElementById("auction").value,

  costs: Object.fromEntries(
    fields.map(function ([id]) {
      return [
        id,
        Number(document.getElementById(id).value)
      ];
    })
  )
};

const values = fields.map(function ([id, label]) {
  return {
    id: id,
    label: label,
    amount: calculation.costs[id]
  };
});


const costs = calculation.costs;
const result = calculateCosts(costs);
const total = result.total;

  const categories = [
    {
      title: "Автомобіль та аукціон",
      ids: ["carPrice", "auctionFees"]
    },
    {
      title: "Логістика",
      ids: ["inlandShipping", "oceanShipping", "localCosts"]
    },
    {
      title: "Митниця та страхування",
      ids: ["customs", "insurance"]
    },
    {
      title: "Ремонт",
      ids: ["repair"]
    }
  ];

  breakdown.innerHTML = "";

  const totalCard = document.createElement("div");
  totalCard.className = "total-card";

  const totalLabel = document.createElement("p");
  totalLabel.textContent = "Орієнтовна загальна вартість";

  const totalValue = document.createElement("strong");
  totalValue.textContent = formatUSD(total);

  totalCard.append(totalLabel, totalValue);
  breakdown.append(totalCard);

  categories.forEach(function (category) {
    const section = document.createElement("div");
    section.className = "cost-category";

    const heading = document.createElement("h3");
    heading.textContent = category.title;
    section.append(heading);

    const categoryTotal = values
      .filter(function (item) {
        return category.ids.includes(item.id);
      })
      .reduce(function (sum, item) {
        return sum + item.amount;
      }, 0);

    category.ids.forEach(function (id) {
      const item = values.find(function (value) {
        return value.id === id;
      });

      const row = document.createElement("div");
      row.className = "result-row";

      const name = document.createElement("span");
      name.textContent = item.label;

      const amount = document.createElement("strong");
      amount.textContent = formatUSD(item.amount);

      row.append(name, amount);
      section.append(row);
    });

    const subtotal = document.createElement("div");
    subtotal.className = "category-total";

    const subtotalLabel = document.createElement("span");
    subtotalLabel.textContent = "Разом за категорією";

    const subtotalValue = document.createElement("strong");
    subtotalValue.textContent = formatUSD(categoryTotal);

    subtotal.append(subtotalLabel, subtotalValue);
    section.append(subtotal);

    breakdown.append(section);
  });
}

fields.forEach(function ([id]) {
  const input = document.getElementById(id);
  input.addEventListener("input", calculateTotal);
});

calculateTotal();
