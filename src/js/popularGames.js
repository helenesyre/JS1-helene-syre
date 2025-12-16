import { createGameCard } from "./components.js";
import useFetch from "./useFetch.js";

const container = document.querySelector(".container");

let products = [];

/**
 * Fetch and create product cards for popular games.
 */
async function fetchAndCreateProducts() {
  try {
    const response = await useFetch("/gamehub");
    products = response.data.slice(0, 5);

    container.innerHTML = '';
    products.forEach(game => {
      container.appendChild(createGameCard(game));
    });
  } catch (error) {
  }
}
fetchAndCreateProducts();