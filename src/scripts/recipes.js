// src/scripts/recipes.js
import recipes from '../data/recipes.json';
//import Chart from 'https://cdn.jsdelivr.net/npm/chart.js';
import { Chart } from 'chart.js'; // 👈 Use the installed package import

// ---------- 1️⃣ Build the ingredient‑by‑recipe matrix ----------
function buildIngredientMatrix() {
  // Collect a sorted list of all unique ingredient names
  const ingredientSet = new Set();
  recipes.forEach(r => r.ingredients.forEach(i => ingredientSet.add(i.name)));
  const ingredients = Array.from(ingredientSet).sort();

  // Create the table element
  const table = document.createElement('table');
  table.className = 'matrix-table';

  // Header row
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  headRow.innerHTML = `<th>Ingredient</th>` + recipes.map(r => `<th>${r.name}</th>`).join('');
  thead.appendChild(headRow);
  table.appendChild(thead);

  // Body rows
  const tbody = document.createElement('tbody');
  ingredients.forEach(name => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${name}</td>`;
    recipes.forEach(r => {
      const match = r.ingredients.find(i => i.name === name);
      const cell = match ? `${match.amount} ${match.unit}` : '';
      row.innerHTML += `<td>${cell}</td>`;
    });
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  document.getElementById('matrix-container').appendChild(table);
}

// ---------- 2️⃣ Build the bar chart of total ingredient usage ----------
function buildIngredientChart() {
  // Aggregate totals per ingredient (grouped by unit)
  const totals = {};
  recipes.forEach(r => {
    r.ingredients.forEach(i => {
      const key = `${i.name} (${i.unit})`;
      totals[key] = (totals[key] || 0) + i.amount;
    });
  });

  const labels = Object.keys(totals);
  const data = Object.values(totals);

  new Chart(document.getElementById('ingredientChart'), {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Total amount',
        data,
        backgroundColor: 'rgba(54,162,235,0.6)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      scales: {
        x: { beginAtZero: true }
      }
    }
  });
}

// ---------- 3️⃣ Run after DOM ready ----------
document.addEventListener('DOMContentLoaded', () => {
  buildIngredientMatrix();
  buildIngredientChart();
});

