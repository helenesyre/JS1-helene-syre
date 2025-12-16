/**
 * Toggle the sidebar open/close state.
 * Adds/removes "is-active" on the menu button and sidebar when clicked.
 */
const menu_toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

menu_toggle.addEventListener('click', () => {
  menu_toggle.classList.toggle('is-active'); // toggles the menu button
  sidebar.classList.toggle('is-active'); // toggles the sidebar
});

/**
 * Toggle main content layout when menu is opened.
 * Adds/removes "menu-open" class on main content when menu button is clicked.
 */
const menuToggle = document.querySelector('.menu-toggle');
const mainContent = document.querySelector('.main-content');

menuToggle.addEventListener('click', () => {
  mainContent.classList.toggle('menu-open'); // toggles the main content layout
});