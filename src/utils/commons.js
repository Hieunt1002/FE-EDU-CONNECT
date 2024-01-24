
import { jwtDecode } from "jwt-decode";
export const decodeToken = () => {
  try {
    const token = localStorage.getItem("token");
    if(!token) return {isLogin: false}
    const decoded = jwtDecode(token);
    return {...decoded, isLogin: !!token};
  } catch (error) {
    console.error("Unauthenticated!");
    return null;
  }
}
export const getRole = (roleId) => {
  return roleId === 1 ? "student" : roleId === 2 ? "tutor" : roleId === 3  ? "staff" : roleId === 4  ? "admin" : ""
}