import { jwtDecode } from "jwt-decode";

export const getBearerToken = () => {
  return localStorage.getItem("accessToken") || "";
};

export const decodeToken = (token) => {
  if (!token) {
    console.error("No token provided");
    return null;
  }
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken || null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
