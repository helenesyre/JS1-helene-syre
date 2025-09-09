let iconCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".close-btn");
let body = document.querySelector("body");


export function addCartEventListener() {
    iconCart.addEventListener("click", () => {
        body.classList.toggle("show-cart");
    });

    closeCart.addEventListener("click", () => {
        body.classList.remove("show-cart");
    });
}
