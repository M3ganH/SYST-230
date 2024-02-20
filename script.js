// script.js

async function fetchRandomDogImage() {
    try {
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        return data.message; // Extract the image URL from the response
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Function to display the fetched random dog image
async function displayRandomDogImage() {
    const dogImageContainer = document.getElementById('dogImageContainer');
    try {
        const imageUrl = await fetchRandomDogImage();
        if (!imageUrl) return; // Exit if imageUrl is null
        // Clear previous image
        dogImageContainer.innerHTML = '';
        // Create new image element and set its src attribute to the fetched imageUrl
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Random Dog Image';
        // Append the image to the container
        dogImageContainer.appendChild(img);
    } catch (error) {
        console.error('Error:', error);
    }
}

// Call the displayRandomDogImage function to fetch and display a random dog image when the page loads
window.onload = displayRandomDogImage;
