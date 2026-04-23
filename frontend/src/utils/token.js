// src/utils/token.js

// Save token in localStorage
export const setToken = (token) => localStorage.setItem("authToken", token);

// Get token from localStorage
export const getToken = () => localStorage.getItem("authToken");

// Remove token
export const removeToken = () => localStorage.removeItem("authToken");

// Decode role from token
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  // Token format: "role|mockToken123"
  return token.split("|")[0]; // e.g., "volunteer"
};