/* import '/quantitySelector.js'; Does not work */

async function displayProductDetails() {
    const productContainer = document.getElementById('product-container');
    const gameHTML = document.createElement('div');
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const req = await fetch(`https://v2.api.noroff.dev/gamehub/${productId}`);
        const game = await req.json();

        gameHTML.innerHTML = `
                    <nav aria-label="Breadcrumb" class="breadcrumb">
              <ol>
                <li><a href="#" class="page">Home</a></li>
                <li><a href="#" class="page">Games</a></li>
                <li><a href="#" class="page">Adventure</a></li>
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
                          Adventure
                      </span>
                      <span class="tag">
                          <svg role="img" class="icon-m" aria-label="Checkmark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                          </svg>
                          2010
                      </span>
                      <span class="tag">
                          <svg role="img" class="icon-m" aria-label="Checkmark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                          </svg>
                          +12
                      </span>
                  </div>
                </div>
                <div class="game-info">
                  <p class="game-description">Unleash your inner warrior and become a legend of the forge in this epic adventure.</p>
                  <div class="price-section">
                    <span class="current-price">$19.99</span>
                    <span class="original-price">$39.99</span>
                  </div>
                </div>

                <div class="quantity-selector">
                  <label for="quantity" class="quantity-label">Quantity:</label>
                  <div class="quantity-controls">
                    <button class="qty-count btn-minus" data-action="minus" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
                      </svg>
                    </button>
                    <input class="product-qty" type="number" name="product-qty" min="0" max="10" value="1">
                    <button class="qty-count btn-plus" data-action="add" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.75" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
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
        productContainer.appendChild(gameHTML);

    } catch (error) {
        console.error("Error fetching the product:", error);
    }
}

displayProductDetails();