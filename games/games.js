import { createGameCard } from "../src/js/components.js";

const container = document.querySelector(".container");
const cards = document.querySelectorAll('.card');
const API_URL = "https://v2.api.noroff.dev/gamehub";

async function fetchAndCreateProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const products = data.data;

    products.forEach(game => {
        container.appendChild(createGameCard(game));
    });
    
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

/* Code inspired by https://www.youtube.com/watch?v=RKfMtCNx1z0 */

const buttons = document.querySelectorAll('.filter-buttons button');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.className
      .split(' ')
      .find(c => c.startsWith('filter-'))
      .replace('filter-', '');

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const parent = card.parentElement; // the wrapper
        const genre = card.dataset.genre.toLowerCase();
        if (filter === 'all' || genre.includes(filter)) {
            parent.style.display = '';
        } else {
            parent.style.display = 'none';
        }
    });
  });
});


fetchAndCreateProducts();