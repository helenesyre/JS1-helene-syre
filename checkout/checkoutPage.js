import { renderCheckout } from "../src/js/components.js";

renderCheckout(); 


/*
 * Toggle visibility of the credit/debit card fields
 * based on the selected payment option.
 */

const cardRadio = document.getElementById('payment-card');
const neoRadio = document.getElementById('payment-neopay');
const cardDetails = document.querySelector('.payment-card-details');

function toggleCardDetails() {
  if (cardRadio.checked) {
    cardDetails.style.display = 'flex'; // keep flex layout
  } else {
    cardDetails.style.display = 'none';
  }
}

// Initial check
toggleCardDetails();

// Listen for changes
cardRadio.addEventListener('change', toggleCardDetails);
neoRadio.addEventListener('change', toggleCardDetails);

// Email validation
const emailInput = document.getElementById('email');
emailInput.addEventListener('input', () => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!pattern.test(emailInput.value)) {
    emailInput.setCustomValidity("Please enter a valid email address");
    emailInput.classList.add('input-error');
  } else {
    emailInput.setCustomValidity("");
    emailInput.classList.remove('input-error');
  }
});


// Phone validation
const phoneInput = document.getElementById('phone-number');
phoneInput.addEventListener('input', () => {
  const pattern = /^\+?\d{7,15}$/; // allows + and 7-15 digits
  if (!pattern.test(phoneInput.value)) {
    phoneInput.setCustomValidity("Enter a valid phone number");
    phoneInput.classList.add('input-error');
  } else {
    phoneInput.setCustomValidity("");
    phoneInput.classList.remove('input-error');
  }
});

