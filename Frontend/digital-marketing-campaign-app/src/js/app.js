// Main JavaScript logic for the digital marketing campaign app

// Function to initialize the application
function initApp() {
    console.log("Application initialized");
    // Add event listeners or any initialization logic here
}

// Function to handle navigation to different pages
function navigateTo(page) {
    window.location.href = page;
}

// Event listener for the start button on the landing page
document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    if (startButton) {
        startButton.addEventListener("click", function() {
            navigateTo("pages/login.html");
        });
    }
});

// Call the initialization function
initApp();