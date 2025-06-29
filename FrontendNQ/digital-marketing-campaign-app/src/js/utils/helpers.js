// This file contains utility functions that assist with common tasks, such as formatting data or validating inputs.

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function generateRandomId() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}

export { formatDate, validateEmail, generateRandomId };