// This file contains the navigation component for the digital marketing campaign application.
// It handles menu interactions and routing for the application.

class Navigation {
    constructor() {
        this.menuButton = document.querySelector('.menu-button');
        this.navMenu = document.querySelector('.nav-menu');
        this.bindEvents();
    }

    bindEvents() {
        this.menuButton.addEventListener('click', () => this.toggleMenu());
        document.addEventListener('click', (event) => this.closeMenu(event));
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
    }

    closeMenu(event) {
        if (!this.navMenu.contains(event.target) && !this.menuButton.contains(event.target)) {
            this.navMenu.classList.remove('active');
        }
    }
}

// Initialize the navigation component when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

export default Navigation;