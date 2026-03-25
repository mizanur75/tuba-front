const BASE_URL = "http://127.0.0.1:8000/api/v1";

// Generic fetch function
export const fetchAPI = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error("API Error");
    return await res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Specific APIs
export const getVideos = () => fetchAPI("/videos");
export const getPackages = () => fetchAPI("/packages");
// add more here later