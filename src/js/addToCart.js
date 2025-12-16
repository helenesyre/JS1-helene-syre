let iconCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".close-btn");
let body = document.querySelector("body");

/**
 * Add event listeners to handle cart visibility.
 * Toggles the "show-cart" class on <body> when the cart icon is clicked,
 * and removes the class when the close button is clicked.
 */
export function addCartEventListener() {
  iconCart.addEventListener("click", () => {
    body.classList.toggle("show-cart");
  });

  closeCart.addEventListener("click", () => {
    body.classList.remove("show-cart");
  });
}
