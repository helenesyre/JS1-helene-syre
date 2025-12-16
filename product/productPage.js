import { createGameCard, renderCart } from "../src/js/components.js";
// Import the custom useCart module to access cart functionality
import useCart from "../src/js/useCart.js";
import useFetch from "../src/js/useFetch.js";

let quantity = 1;

/**
 * Fetch and display product details on the product page.
 * Uses the `useFetch` utility to request game data.
 * Updates the page title and meta description.
 * Renders the game information in the product container.
 */
async function displayProductDetails() {
  const productContainer = document.getElementById('product-container');
  const gameHTML = document.createElement('div');
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const game = await useFetch(`/gamehub/${productId}`);

    // Update title + meta tags
    document.title = `GameHub | Buy ${game.data.title} today`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        `Buy ${game.data.title} at GameHub. ${game.data.description || "Instant digital download available."}`
      );
    }

    let priceHTML = `<p class="card-price-product-page">$${game.data.price}</p>`;
    if (game.data.onSale && game.data.discountedPrice) {
      priceHTML = `
        <div class="price-section">
          <p class="card-price-discount">$${game.data.discountedPrice}</p>
          <p class="card-price-original">$${game.data.price}</p>
        </div>`;
    }


    gameHTML.innerHTML = `
      <nav aria-label="Breadcrumb" class="breadcrumb">
        <ol>
          <li><a href="${import.meta.env.BASE_URL}/" class="page">Home</a></li>
          <li><a href="${import.meta.env.BASE_URL}/games/" class="page">Games</a></li>
          <li><span aria-current="page" class="current-page">${game.data.title}</span></li>
        </ol>
      </nav>
        <div class="product-page">
          <img src="${game.data.image.url}" alt="${game.data.title}" class="game-image"/>
          <div class="game-details">
            <div class="game-info">
              <div class="rating">
                <span class="star-filled"><i class="fa-solid fa-star"></i></span>
                <span class="star-filled"><i class="fa-solid fa-star"></i></span>
                <span class="star-filled"><i class="fa-solid fa-star"></i></span>
                <span class="star-filled"><i class="fa-solid fa-star"></i></span>
                <span class="star-empty"><i class="fa-solid fa-star"></i></span>
              </div>
              <h1>${game.data.title}</h1>
              <div class="game-tags">
                <span class="tag">
                  <svg role="img" class="icon-m" aria-label="Checkmark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  ${game.data.genre}
                </span>
                <span class="tag">
                  <svg role="img" class="icon-m" aria-label="Checkmark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  ${game.data.released}
                </span>
                <span class="tag">
                  <svg role="img" class="icon-m" aria-label="Checkmark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                  </svg>
                  ${game.data.ageRating}
                </span>
              </div>
            </div>
            <div class="game-info">
              <p class="game-description">${game.data.description}</p>
              <div class="price-section">
                ${priceHTML}
              </div>
            </div>

            <div class="quantity-selector">
              <p>Quantity:</p>
              <div class="quantity">
                <span id="decrease"><i class="fa-solid fa-minus decrease"></i></span>
                <span id="quantity" class="number">${quantity}</span>
                <span id="increase"><i class="fa-solid fa-plus increase"></i></span>
              </div>
            </div>

            <a class="cta-no-padding wishlist" href="#">
              <svg role="img" class="icon-m wishlist" aria-label="Wishlist" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 25">
                <path d="M21.31,9.62c0-2.56-2.13-4.64-4.77-4.64-1.97,0-3.66,1.16-4.39,2.82-.73-1.66-2.42-2.82-4.39-2.82-2.63,0-4.77,2.08-4.77,4.64,0,7.44,9.15,12.36,9.15,12.36,0,0,9.15-4.92,9.15-12.36Z" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.75px;"/>
              </svg>
              <span>Add to wishlist</span>
            </a>
            <a class="cta-xl cta-color-orange add-cart" href="#">
              <span>Buy now</span>
            </a>
          </div>
        </div>
      `;

    const decreaseButton = gameHTML.querySelector(`#decrease`); // Decrease button
    const increaseButton = gameHTML.querySelector(`#increase`); // Increase button
    const quantityDisplay = gameHTML.querySelector(`#quantity`); // Quantity display

    decreaseButton.addEventListener('click', () => {
      if (quantity > 1) {
        quantity -= 1;
        quantityDisplay.textContent = quantity;
      }
    });

    increaseButton.addEventListener('click', () => {
      quantity += 1;
      quantityDisplay.textContent = quantity;
    });

    const addToCartButton = gameHTML.querySelector('.add-cart');
    addToCartButton.addEventListener('click', () => {
      useCart.addItem(game.data, quantity);
      renderCart();
    });

    /**
     * Fetch and display similar games based on genre.
     */
    productContainer.innerHTML = ''; // Clear any existing content
    productContainer.appendChild(gameHTML);

    const similarGames = document.querySelector(".similarGames");

    const response = await useFetch('/gamehub');
    const currentGameGenre = game.data.genre;
    const sortedByGenre = response.data.sort((a, b) => {
      if (a.genre === currentGameGenre) return -1;
      if (b.genre === currentGameGenre) return 1;
      return a.genre.localeCompare(b.genre);
    });
    const products = sortedByGenre.slice(0, 5);
    similarGames.innerHTML = '';
    products.forEach(game => {
      similarGames.appendChild(createGameCard(game));
    });
  } catch (error) {
  }
}

displayProductDetails();