// Main JavaScript file for the Digital Marketing Campaign Application
// This file initializes the application and sets up event listeners

document.addEventListener('DOMContentLoaded', () => {
    console.log('Digital Marketing Campaign Application Initialized');

    // Initialize dashboard functionality
    if (document.getElementById('dashboard')) {
        import('./dashboard.js').then(module => {
            module.initDashboard();
        });
    }

    // Set up event listeners for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetPage = event.target.getAttribute('href');
            loadPage(targetPage);
        });
    });
});

// Function to load a new page
function loadPage(page) {
    fetch(page)
        .then(response => response.text())
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
            window.history.pushState({ page: page }, '', page);
        })
        .catch(error => {
            console.error('Error loading page:', error);
        });
}

// Handle back/forward navigation
window.onpopstate = function(event) {
    if (event.state) {
        loadPage(event.state.page);
    }
};