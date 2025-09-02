let iconCart = document.querySelector(".icon-cart");
let closeCart = document.querySelector(".close-btn");
let body = document.querySelector("body");
let productSectionHTML = document.querySelector("#products-section");


export function addCartEventListener() {
    iconCart.addEventListener("click", () => {
        body.classList.toggle("show-cart");
    });

    closeCart.addEventListener("click", () => {
        body.classList.remove("show-cart");
    });
    /*
    productSectionHTML.addEventListener('click', (event) => {
        const clickedButton = event.target.closest(".add-cart");
        if (clickedButton) {
            alert('1');
            console.log("clicked");
        }
    });
    */
}
