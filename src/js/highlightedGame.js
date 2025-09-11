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
                        <a class="cta-l cta-color-orange" href="${import.meta.env.BASE_URL}/product/?id=${game.id}/">
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

    highlightedGame.innerHTML = '';
    highlightedGame.appendChild(gameHTML);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

fetchAndCreateHighlightedGame();