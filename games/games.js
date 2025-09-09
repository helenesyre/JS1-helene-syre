import { createGameCard } from "../src/js/components.js";

const container = document.querySelector(".container");
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

// Select all buttons inside the container with class "filter-buttons"
const buttons = document.querySelectorAll('.filter-buttons button');
// Select all cards (items to filter)
const cards = document.querySelectorAll('.card');

/**
 * Add click event listeners to each filter button
 */
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove 'active' class from all buttons
    buttons.forEach(btn => btn.classList.remove('active'));
    // Add 'active' class to the clicked button
    button.classList.add('active');

    // Get the filter value from the button's class name
    const filter = button.className
      .split(' ') // Split the class names into an array
      .find(c => c.startsWith('filter-')) // Find the class that starts with 'filter-'
      .replace('filter-', ''); // Get the filter value

    // Loop through all cards to show or hide based on the filter
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const parent = card.parentElement; // The wrapper
        const genre = card.dataset.genre.toLowerCase(); // Get the genre from data attribute and convert to lowercase

        // Show the card if filter is 'all' or if genre matches filter
        if (filter === 'all' || genre.includes(filter)) {
            parent.style.display = ''; // Show the card
        } else {
            parent.style.display = 'none'; // Hide the card
        }
    });
  });
});


fetchAndCreateProducts();