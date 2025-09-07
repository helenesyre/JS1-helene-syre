const API_URL = 'https://v2.api.noroff.dev';

async function useFetch(url, options = {}) {
  try {
    const response = await fetch(API_URL + url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export default useFetch;