import { createGameCard } from "./components.js";
import useFetch from "./useFetch.js";

const newReleases = document.querySelector(".newReleases");

/**
 * Fetches products from the API and create product cards for new releases.
 * Sorts them by release date (newest first).
 */
async function fetchAndCreateProducts() {
  try {
    const response = await useFetch('/gamehub');
    const sortedByNewest = response.data.sort((a, b) => {
      const dateA = new Date(a.released).getTime();
      const dateB = new Date(b.released).getTime();
      return dateB - dateA;
    });
    const products = sortedByNewest.slice(5, 10);

    newReleases.innerHTML = '';
    products.forEach(game => {
        newReleases.appendChild(createGameCard(game));
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchAndCreateProducts();