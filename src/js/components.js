// Import the custom useCart module to access cart functionality
import useCart from "./useCart.js";

/**
 * Create a game card element
 * @param {Object} game - The game data
 * @returns {HTMLElement} The game card element
 */
export function createGameCard(game) {
    const gameCard = document.createElement('div'); // Makes a <div> for each game

    let priceHTML = `<p class="card-price">$${game.price}</p>`;
    if (game.onSale && game.discountedPrice) {
        priceHTML = `
        <div class="price-sale">
            <p class="card-price-discount">$${game.discountedPrice}</p>
            <p class="card-price-original">$${game.price}</p>
        </div>`;
    }

    gameCard.innerHTML = `
        <div class="card" data-genre="${game.genre}">
            <a href="${import.meta.env.BASE_URL}/product/?id=${game.id}">
                <img src="${game.image.url}" alt="${game.title}">
            </a>
                <div class="card-content">
                    <div class="card-top">
                        <a href="${import.meta.env.BASE_URL}/product/?id=${game.id}">
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

                        <a href="${import.meta.env.BASE_URL}/product/?id=${game.id}">
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

    /**
     * Add event listener for "Add to Cart" button
     */
    const addToCartButton = gameCard.querySelector('.add-cart');
    addToCartButton.addEventListener('click', () => {
        useCart.addItem(game);
        renderCart();
    });
    return gameCard;
}

/**
 * Create a cart item element
 * @param {Object} cartItem - The cart item data
 * @returns {HTMLElement} The cart item element
 */
function createCartItem(cartItem) {
    const cartItemDiv = document.createElement('div');
    cartItemDiv.classList.add('item');

    cartItemDiv.innerHTML = `
        <div class="cart-info">
            <div class="cart-left">
            <img src="${cartItem.image.url}" alt="${cartItem.image.alt}">
            <div class="cart-details">
                <h3 class="title-xs">${cartItem.title}</h3>
                <p class="index">Digital purchase</p>
                <div class="quantity">
                    <span id="decrease-${cartItem.id}"><i class="fa-solid fa-minus decrease"></i></span>
                    <span class="number">${cartItem.quantity}</span>
                    <span id="increase-${cartItem.id}"><i class="fa-solid fa-plus increase"></i></span>
                </div>
            </div>
            </div>
            
            <div>
                <div class="cart-total">
                    ${
                        cartItem.onSale && cartItem.discountedPrice
                        ? `
                            <p class="card-price-original">$${(cartItem.price * cartItem.quantity).toFixed(2)}</p>
                            <p class="card-price-discount">$${(cartItem.discountedPrice * cartItem.quantity).toFixed(2)}</p>
                            `
                        : `<p class="card-price">$${(cartItem.price * cartItem.quantity).toFixed(2)}</p>`
                    }
                </div>
    
            </div>
        </div>`;

    const decreaseButton = cartItemDiv.querySelector(`#decrease-${cartItem.id}`);
    const increaseButton = cartItemDiv.querySelector(`#increase-${cartItem.id}`);

    decreaseButton.addEventListener('click', () => {
        useCart.updateItemQuantity(cartItem.id, cartItem.quantity - 1);
        renderCart();
    });

    increaseButton.addEventListener('click', () => {
        useCart.updateItemQuantity(cartItem.id, cartItem.quantity + 1);
        renderCart();
    });
    return cartItemDiv;
}

/**
 * Render the shopping cart
 */
export function renderCart() {
    const cartContainer = document.getElementById("cartList");
    const cartBadge = document.querySelector(".cart-badge");
    const isCheckoutPage = document.querySelector("#order-summary") !== null;
    const cartItems = useCart.getItems();

    cartContainer.innerHTML = '';

    if(cartItems.length > 0) {
        cartItems.forEach((item) => {
            cartContainer.appendChild(createCartItem(item));
        });
    }

    const cartTotalDiv = document.getElementById("cartTotal");
    cartTotalDiv.innerHTML = `
        <div class="cart-total-label">
            <span>Total:</span>
            <span class="cart-total-price">$${useCart.getCartTotal().toFixed(2)}</span>
        </div>
    `;

    cartBadge.innerText = useCart.getCartCount();

    if (isCheckoutPage) {
        renderCheckout();
    }
}

/**
 * Render the checkout summary of the cart on the checkout page
 */
export function renderCheckout() {
  const checkoutContainer = document.querySelector('#order-summary');
  const cartItems = useCart.getItems();
  checkoutContainer.innerHTML = '';

  cartItems.forEach(item => {
    const itemLi = document.createElement('li');
    itemLi.classList.add('summary-info');
    itemLi.innerHTML = `
      <div class="summary-left">
        <img src="${item.image.url}" alt="${item.title}"/>
        <div class="summary-details">
            <h3 class="title-xs">${item.title}</h3>
            <p class="index">Digital purchase</p>
            <div class="quantity">
                <span id="decrease-${item.id}"><i class="fa-solid fa-minus decrease"></i></span>
                <span class="number">${item.quantity}</span>
                <span id="increase-${item.id}"><i class="fa-solid fa-plus increase"></i></span>
            </div>
          </div>
        </div>

        <div>
          <div class="summary-price">
            ${
              item.onSale && item.discountedPrice
                ? `
                  <p class="card-price-original">$${(item.price * item.quantity).toFixed(2)}</p>
                  <p class="card-price-discount">$${(item.discountedPrice * item.quantity).toFixed(2)}</p>
                  `
                : `<p class="card-price">$${(item.price * item.quantity).toFixed(2)}</p>`
            }
          </div> 
          <svg id="remove-${item.id}" role="img" class="icon-m remove" aria-label="Remove product" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>           
        </div>
      </li>
    `;

    const decreaseButton = itemLi.querySelector(`#decrease-${item.id}`);
    const increaseButton = itemLi.querySelector(`#increase-${item.id}`);
    const removeButton = itemLi.querySelector(`#remove-${item.id}`);

    decreaseButton.addEventListener('click', () => {
        useCart.updateItemQuantity(item.id, item.quantity - 1);
        renderCheckout();
        renderCart();
    });

    increaseButton.addEventListener('click', () => {
        useCart.updateItemQuantity(item.id, item.quantity + 1);
        renderCheckout();
        renderCart();
    });

    removeButton.addEventListener('click', () => {
        useCart.removeItem(item.id);
        renderCheckout();
        renderCart();
    });

    checkoutContainer.appendChild(itemLi);
});

    /**
     * Render totals: subtotal, taxes, total
     */
    const total = document.getElementById('total');
    const subtotal = document.getElementById('subtotal');
    const taxes = document.getElementById('taxes');

    subtotal.textContent = `$${useCart.getCartTotal().toFixed(2)}`;

    taxes.textContent = `$${(useCart.getCartTotal() * 0.25).toFixed(2)}`;
    total.textContent = `$${(useCart.getCartTotal() + useCart.getCartTotal() * 0.25).toFixed(2)}`;
    if (useCart.getCartTotal() === 0) {
        // If the cart is empty, display a message or take appropriate action
        checkoutContainer.innerHTML = '<p>Your cart is empty</p>';
        const buyNowButton = document.getElementById('buyNowButton');
        buyNowButton.disabled = true;
    }
}