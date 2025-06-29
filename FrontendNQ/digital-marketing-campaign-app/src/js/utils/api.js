// This file contains functions for making API calls, handling responses, and managing data retrieval.

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API base URL

// Function to fetch data from the API
async function fetchData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch data:', error);
        throw error;
    }
}

// Function to post data to the API
async function postData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Failed to post data:', error);
        throw error;
    }
}

// Function to update data on the API
async function updateData(endpoint, data) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Failed to update data:', error);
        throw error;
    }
}

// Function to delete data from the API
async function deleteData(endpoint) {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return true; // Return true if deletion was successful
    } catch (error) {
        console.error('Failed to delete data:', error);
        throw error;
    }
}

// Exporting the API functions
export { fetchData, postData, updateData, deleteData };