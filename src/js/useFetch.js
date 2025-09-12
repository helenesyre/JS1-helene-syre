import { showToast } from "./toast.js";

// Base URL for the API
const API_URL = 'https://v2.api.noroff.dev';

/**
 * Fetch data from the API
 * @param {string} url - The API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} The JSON response from the API
 */
async function useFetch(url, options = {}) {
  try {
    const response = await fetch(API_URL + url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    showToast('Error fetching data. Please try again later.');
    throw error;
  }
}

// Export the function so it can be imported in other modules
export default useFetch;