import useFetch from "./useFetch.js";

const highlightedGame = document.querySelector(".highlightedGame");

async function fetchAndCreateHighlightedGame() {
  try {
    const response = await useFetch(`/gamehub/2bbaab8b-57b0-47f6-ab8d-8d443ac767da`);
    const game = response.data;

    const gameHTML = document.createElement('a'); // Makes an <a> for each game

    gameHTML.href = `${import.meta.env.BASE_URL}/product/?id=${game.id}`;

    gameHTML.innerHTML = `
            <div class="featured-card">
                <img class="hero-bg" src="${game.image.url}" alt="${game.image.alt}">
                <div class="hero-content">
                    <div class="card-information">
                        <p class="card-genre">${game.genre}</p>
                        <h2 class="card-title">${game.title}</h2> 
                        <p>${game.description}</p>
                    </div>
                    <div class="hero-buttons">
                        <a class="cta-l cta-color-orange add-cart" href="${import.meta.env.BASE_URL}/product/?id=${game.id}/">
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
                        </a>
                        <a class="cta-l cta-border-color-orange" href="${import.meta.env.BASE_URL}/product/?id=${game.id}/">
                            <span>Read More</span>
                        </a>
                        <div class="icon-background">
                            <svg role="img" class="icon-m icon-white" aria-label="Add to wishlist" width="100%" height="100%" viewBox="0 0 24 25" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.31,9.62c0-2.56-2.13-4.64-4.77-4.64-1.97,0-3.66,1.16-4.39,2.82-.73-1.66-2.42-2.82-4.39-2.82-2.63,0-4.77,2.08-4.77,4.64,0,7.44,9.15,12.36,9.15,12.36,0,0,9.15-4.92,9.15-12.36Z" style="fill: none; stroke: currentColor; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.31px;"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>`;

    const addToCartButton = gameHTML.querySelector('.add-cart');
    addToCartButton.addEventListener('click', () => {
        useCart.addItem(game);
        renderCart();
    });

    highlightedGame.appendChild(gameHTML);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchAndCreateHighlightedGame();