const container = document.querySelector(".container");
const API_URL = "https://v2.api.noroff.dev/gamehub";
let cartList = document.querySelector(".cart-list");
let cartBadge = document.querySelector(".cart-badge");

let carts = [];
let products = [];

async function fetchAndCreateProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    products = data.data.slice(0, 5);

    products.forEach(game => {
        const gameHTML = document.createElement('div');
        let priceHTML = `<p class="card-price">$${game.price}</p>`;
        if (game.onSale && game.discountedPrice) {
          priceHTML = `
            <div class="price-sale">
                <p class="card-price-discount">$${game.discountedPrice}</p>
              <p class="card-price-original">$${game.price}</p>
            </div>`;
        }

        gameHTML.innerHTML = `
            <div class="card">
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

    if(localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

container.addEventListener('click', (event) => {
    const clickedButton = event.target.closest(".add-cart");
    if (clickedButton) {
        let productId = clickedButton.parentElement.getAttribute("data-id");
        addToCart(productId);
    }
});

function addToCart(product_id) {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0) {
        carts = [{
            product_id: product_id,
            quantity: 1
        }]
    }else if(positionThisProductInCart < 0) {
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem("cart", JSON.stringify(carts));
}

function addCartToHTML() {
    cartList.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0;
    if(carts.length > 0) {
        carts.forEach((cart) => {
            totalQuantity = totalQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = products.findIndex((value) => value.id == cart.product_id);
            let info = products[positionProduct];
            let itemTotal = info.onSale && info.discountedPrice
                ? info.discountedPrice * cart.quantity
                : info.price * cart.quantity;

            totalPrice += itemTotal; 
            
            newCart.innerHTML = `
                <div class="cart-info">
                    <div class="cart-left">
                      <img src="${info.image.url}" alt="${info.image.alt}">
                      <div class="cart-details">
                        <h3 class="title-xs">${info.title}</h3>
                        <p class="index">Digital purchase</p>
                        <div class="quantity">
                            <span><i class="fa-solid fa-minus decrease"></i></span>
                            <span class="number">${cart.quantity}</span>
                            <span><i class="fa-solid fa-plus increase"></i></span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                        <div class="cart-total">
                            ${
                                info.onSale && info.discountedPrice
                                ? `
                                    <p class="card-price-original">$${(info.price * cart.quantity).toFixed(2)}</p>
                                    <p class="card-price-discount">$${(info.discountedPrice * cart.quantity).toFixed(2)}</p>
                                    `
                                : `<p class="card-price">$${(info.price * cart.quantity).toFixed(2)}</p>`
                            }
                        </div>
               
                    </div>
                  </div>`;
            cartList.appendChild(newCart);
        });
        const cartTotalDiv = document.getElementById("cartTotal");
        cartTotalDiv.innerHTML = `
            <div class="cart-total-label">
                <span>Total:</span>
                <span class="cart-total-price">$${totalPrice.toFixed(2)}</span>
            </div>
        `;
    }
    cartBadge.innerText = totalQuantity;
}

cartList.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains ('decrease') || positionClick.classList.contains ('increase')) {
        let productId = positionClick.closest('.item').dataset.id;
        let type = 'decrease';
        if (positionClick.classList.contains ('increase')) {
            type = 'increase';
        }
        changeQuantity(productId, type);
        addCartToHTML();
        addCartToMemory();
    }
})

const changeQuantity = (product_id, type) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if (positionThisProductInCart >= 0) {
        switch (type) {
            case 'increase':
                carts[positionThisProductInCart].quantity =
                    carts[positionThisProductInCart].quantity + 1;
                break;
            default:
                let valueChange = carts[positionThisProductInCart].quantity - 1;
                if (valueChange > 0) {
                    carts[positionThisProductInCart].quantity = valueChange;
                } else {
                    carts.splice(positionThisProductInCart, 1);
                }
                break;
        }
    }

    addCartToMemory();
    addCartToHTML();
};

fetchAndCreateProducts();