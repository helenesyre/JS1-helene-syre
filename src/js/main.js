import { addCartEventListener } from "./addToCart.js";
import { renderCart } from "./components.js";
import useCart from "./useCart.js";

function init() {
    // Initialize any other functionality here
    // addCartEventListener(); - Deprecated
}
addCartEventListener();
renderCart();
init();