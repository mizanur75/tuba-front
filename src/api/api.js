const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://www.app.sadiatherapy.org/api/v1").replace(/\/+$/, "");

// Generic fetch function
export const fetchAPI = async (endpoint) => {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Accept": "application/json",
      },
    });
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
        "Accept": "application/json",
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

export const createStripeCheckoutSession = async (data) => {
  try {
    const configuredEndpoint = import.meta.env.VITE_STRIPE_CHECKOUT_SESSION_ENDPOINT || "/checkout/session";
    const endpoint = configuredEndpoint.startsWith("/") ? configuredEndpoint : `/${configuredEndpoint}`;

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      let message = `Failed to create Stripe Checkout session (HTTP ${res.status}) at ${endpoint}`;
      try {
        const errorText = await res.text();
        if (errorText) {
          try {
            const errData = JSON.parse(errorText);
            message = errData?.message || message;
          } catch {
            message = `${message}. ${errorText}`;
          }
        }
      } catch {
        // Keep fallback message if body can't be read.
      }
      throw new Error(message);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const baseURL = (import.meta.env.VITE_API_ASSET_BASE_URL || "https://www.app.sadiatherapy.org/").replace(/\/?$/, "/");
// Specific APIs
export const getVideos = () => fetchAPI("/videos");
export const getAbout = () => fetchAPI("/about");
export const getSteps = () => fetchAPI("/steps");
export const getPackages = () => fetchAPI("/packages");
export const getSettings = async () => {
  const data = await fetchAPI("/settings");

  if (Array.isArray(data)) {
    return data[0] || null;
  }

  return data || null;
};