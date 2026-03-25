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

// ✅ Create Appointment (FIXED)
export const createAppointment = async (data) => {
  try {
    const res = await fetch(`${BASE_URL}/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(res);
    

    if (!res.ok) throw new Error("Failed to create appointment");

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};


export const baseURL = "http://127.0.0.1:8000/";
// Specific APIs
export const getVideos = () => fetchAPI("/videos");
export const getAbout = () => fetchAPI("/about");
export const getSteps = () => fetchAPI("/steps");
export const getPackages = () => fetchAPI("/packages");
// add more here later