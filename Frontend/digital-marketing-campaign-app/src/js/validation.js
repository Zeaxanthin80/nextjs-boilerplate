function validateLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    let isValid = true;

    if (username.trim() === '') {
        isValid = false;
        alert('Username is required.');
    }

    if (password.trim() === '') {
        isValid = false;
        alert('Password is required.');
    }

    return isValid;
}

function validateSignupForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    let isValid = true;

    if (name.trim() === '') {
        isValid = false;
        alert('Name is required.');
    }

    if (email.trim() === '') {
        isValid = false;
        alert('Email is required.');
    } else if (!validateEmail(email)) {
        isValid = false;
        alert('Please enter a valid email address.');
    }

    if (phone.trim() === '') {
        isValid = false;
        alert('Phone number is required.');
    }

    if (password.trim() === '') {
        isValid = false;
        alert('Password is required.');
    }

    if (confirmPassword.trim() === '') {
        isValid = false;
        alert('Please confirm your password.');
    } else if (password !== confirmPassword) {
        isValid = false;
        alert('Passwords do not match.');
    }

    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}