import { renderCart } from "../src/js/components.js";
import useCart from "../src/js/useCart.js";

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
    const buyNowLink = document.getElementById('buyNowLink');
    buyNowButton.disabled = true;
    buyNowLink.href = '#';
  }
}