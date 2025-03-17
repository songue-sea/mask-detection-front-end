/* Gestion des requêtes API */

const API_URL = "http://localhost:5000";

export const login = async (username, password) => {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password}),
    });
    return res.json();
};

export const refreshToken = async () => {
    const res = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        headers: {"Authorization": `Bearer ${localStorage.getItem("refresh_token")}`}
    });
    return res.json();
}
export const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.href = "/login"
};

























