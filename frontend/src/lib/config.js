export const BASE_URL = import.meta.env.MODE === "development"
  ? import.meta.env.VITE_BASE_URL // Local Backend
  : import.meta.env.VITE_BASE_URL_PROD; // Deployed Backend
