import useCart from "../../src/js/useCart.js";

function renderConfirmation() {
  const confirmationContainer = document.querySelector('#confirmation-summary');
  const cartItems = useCart.getItems();
  confirmationContainer.innerHTML = '';

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
                <span class="number">${item.quantity}</span>
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
        </div>
      </li>
    `;

    confirmationContainer.appendChild(itemLi);
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
    buyNowButton.disabled = true;
  }

  const continueShoppingButton = document.getElementById('continueShoppingButton');
  continueShoppingButton.addEventListener('click', () => {
    useCart.clearCart();
  });
}
renderConfirmation();