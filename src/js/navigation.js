const menu_toggle = document.querySelector('.menu-toggle');
		const sidebar = document.querySelector('.sidebar');

		menu_toggle.addEventListener('click', () => {
			menu_toggle.classList.toggle('is-active');
			sidebar.classList.toggle('is-active');
		});

const menuToggle = document.querySelector('.menu-toggle');
const mainContent = document.querySelector('.main-content');

menuToggle.addEventListener('click', () => {
  mainContent.classList.toggle('menu-open');
});