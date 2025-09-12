import { renderCheckout } from "../src/js/components.js";

renderCheckout(); 

/*
 * Toggle visibility of the credit/debit card fields
 * based on the selected payment option.
 */
const cardRadio = document.getElementById('payment-card');
const neoRadio = document.getElementById('payment-neopay');
const cardDetails = document.querySelector('.payment-card-details');
const cardInputs = cardDetails.querySelectorAll('input');

function toggleCardDetails() {
  if (cardRadio.checked) {
    cardDetails.style.display = 'flex'; // Keep flex layout
    
    // Make card inputs required
    cardInputs.forEach(input => input.setAttribute('required', ''));
  } else {
    cardDetails.style.display = 'none';

    // Remove required when not using card
    cardInputs.forEach(input => input.removeAttribute('required'));
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
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Pattern to validate email addresses
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
  const pattern = /^\+?\d{7,15}$/; // Allows + and 7-15 digits
  if (!pattern.test(phoneInput.value)) {
    phoneInput.setCustomValidity("Enter a valid phone number");
    phoneInput.classList.add('input-error');
  } else {
    phoneInput.setCustomValidity("");
    phoneInput.classList.remove('input-error');
  }
});


// Postal code
const postalInput = document.getElementById('postal-code');
postalInput.addEventListener('input', () => {
  const pattern = /^\d{4}(-\d{4})?$/;
  if (!pattern.test(postalInput.value)) {
    postalInput.setCustomValidity("Enter a valid postal code");
    postalInput.classList.add('input-error');
  } else {
    postalInput.setCustomValidity("");
    postalInput.classList.remove('input-error');
  }
});


// Card number
const cardNumberInput = document.getElementById('card-number');

cardNumberInput.addEventListener('input', () => {
  let value = cardNumberInput.value.replace(/\D/g, "");
  value = value.substring(0, 16); // Limit to max 16 digits
  value = value.match(/.{1,4}/g)?.join(" ") || ""; // Insert space every 4 digits

  cardNumberInput.value = value;

  const pattern = /^(\d{4} ){3}\d{4}$/; // 16 digits grouped by spaces
  if (!pattern.test(value)) {
    cardNumberInput.setCustomValidity("Enter a valid 16-digit card number");
    cardNumberInput.classList.add("input-error");
  } else {
    cardNumberInput.setCustomValidity("");
    cardNumberInput.classList.remove("input-error");
  }
});

// Expiration date
const expDateInput = document.getElementById('expiry');

expDateInput.addEventListener('input', () => {
  let value = expDateInput.value.replace(/\D/g, "");
  value = value.substring(0, 4); // Limit to max 4 digits (MMYY)
  if (value.length > 2) {
    value = value.substring(0, 2) + "/" + value.substring(2); // Auto-insert slash after 2 digits
  }

  value = value.substring(0, 5); // Ensure max length is 5 (MM/YY)

  expDateInput.value = value;

  const pattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY (01–12 months)

  if (!pattern.test(value)) {
    expDateInput.setCustomValidity("Enter a valid expiration date (MM/YY)");
    expDateInput.classList.add("input-error");
  } else {
    expDateInput.setCustomValidity("");
    expDateInput.classList.remove("input-error");
  }
});

// CVC
const cvcInput = document.getElementById('cvc');

cvcInput.addEventListener('input', () => {
  let value = cvcInput.value.replace(/\D/g, "");
  value = value.substring(0, 4); // Limit to max 4 digits

  cvcInput.value = value;

  const pattern = /^\d{3,4}$/; // 3 or 4 digits

  if (!pattern.test(value)) {
    cvcInput.setCustomValidity("Enter a valid 3- or 4-digit CVC");
    cvcInput.classList.add("input-error");
  } else {
    cvcInput.setCustomValidity("");
    cvcInput.classList.remove("input-error");
  }
});
