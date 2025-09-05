const container = document.querySelector(".container");
const filterButtons = document.querySelectorAll(".filter-buttons button");
const API_URL = "https://v2.api.noroff.dev/gamehub";

let products = [];

async function fetchAndCreateProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const products = data.data;

    products.forEach(game => {
        const gameHTML = document.createElement('div'); // oppretter div for hvert spill

        let priceHTML = `<p class="card-price">$${game.price}</p>`;
        if (game.onSale && game.discountedPrice) {
          priceHTML = `
            <div class="price-sale">
                <p class="card-price-discount">$${game.discountedPrice}</p>
              <p class="card-price-original">$${game.price}</p>
            </div>`;
        }

        gameHTML.innerHTML = `
            <div class="card" data-genre="${game.genre}">
                <a href="product/?id=${game.id}">
                    <img class="#" src="${game.image.url}" alt="${game.image.alt}">
                </a>
                    <div class="card-content">
                        <div class="card-top">
                            <a href="product/?id=${game.id}">
                                <div class="card-info">
                                    <h3 class="card-title">${game.title}</h3> 
                                    <p class="card-genre">${game.genre}</p>
                                </div>
                            </a>
                            <svg role="img" class="icon-m" aria-label="Add to wishlist" width="100%" height="100%" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.31,9.62c0-2.56-2.13-4.64-4.77-4.64-1.97,0-3.66,1.16-4.39,2.82-.73-1.66-2.42-2.82-4.39-2.82-2.63,0-4.77,2.08-4.77,4.64,0,7.44,9.15,12.36,9.15,12.36,0,0,9.15-4.92,9.15-12.36Z" style="fill: none; stroke: #520e35; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.31px;"/>
                            </svg>
                        </div>

                        <div class="card-bottom" data-id="${game.id}">

                            <a href="product/?id=${game.id}">
                                ${priceHTML}
                            </a>
                            <div class="cta-md cta-color-orange add-cart">
                                <span>Buy now</span>
                                <svg role="img" class="icon-s" aria-label="Cart" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17" xmlns:xlink="http://www.w3.org/1999/xlink">
                                    <defs>
                                        <clipPath id="clippath">
                                            <rect y=".98" width="16" height="16" style="fill: none;"/>
                                        </clipPath>
                                    </defs>
                                    <g style="clip-path: url(#clippath);">
                                        <path d="M1,2h1.04c.38,0,.72.26.82.63l.29,1.08M3.14,3.7c4.18-.12,8.35.35,12.4,1.38-.62,1.84-1.35,3.63-2.19,5.35H4.94M3.14,3.7l1.8,6.73M4.94,10.44c-.6,0-1.17.24-1.59.66s-.66.99-.66,1.59h11.81M3.81,14.94c0,.15-.06.29-.16.4-.11.11-.25.16-.4.16s-.29-.06-.4-.16c-.11-.11-.16-.25-.16-.4s.06-.29.16-.4c.11-.11.25-.16.4-.16s.29.06.4.16c.11.11.16.25.16.4ZM13.38,14.94c0,.15-.06.29-.16.4-.11.11-.25.16-.4.16s-.29-.06-.4-.16c-.11-.11-.16-.25-.16-.4s.06-.29.16-.4c.11-.11.25-.16.4-.16s.29.06.4.16c.11.11.16.25.16.4Z" style="fill: none; stroke: #faf9f6; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.13px;"/>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
            </div>`;
        container.appendChild(gameHTML);
    });
    
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

/* Code from https://www.youtube.com/watch?v=RKfMtCNx1z0 */

const filterCards = (e) => {
  // toggle active class
  document.querySelector(".filter-buttons .active").classList.remove("active");
  e.target.classList.add("active");

  const selectedGenre = e.target.dataset.name;
  const cards = container.querySelectorAll(".card");

  cards.forEach(card => {
    const parent = card.parentElement; // target the wrapper div
    parent.classList.add("hide");

    if (selectedGenre === "all" || card.dataset.genre.toLowerCase() === selectedGenre.toLowerCase()) {
      parent.classList.remove("hide");
    }
  });
};


filterButtons.forEach(button => button.addEventListener("click", filterCards));

fetchAndCreateProducts();