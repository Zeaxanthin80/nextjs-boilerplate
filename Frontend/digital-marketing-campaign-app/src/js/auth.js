// This file contains JavaScript functions related to authentication, such as handling login and signup submissions.

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            handleLogin(username, password);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            handleSignup(name, email, phone, password, confirmPassword);
        });
    }
});

function handleLogin(username, password) {
    // Implement login logic here
    console.log('Logging in with', username, password);
    // Add your authentication API call here
}

function handleSignup(name, email, phone, password, confirmPassword) {
    // Implement signup logic here
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }
    console.log('Signing up with', name, email, phone, password);
    // Add your signup API call here
}