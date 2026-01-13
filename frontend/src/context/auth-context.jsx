import { createContext, useContext, useState } from "react";
import { api } from "../api/client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    async function login(data) {
        const res = await api("/api/auth/login", {
            method: "POST",
            body: JSON.stringify(data)
        });
        setUser(res);
    }

    async function register(data) {
        const res = await api("/api/auth/register", {
            method: "POST",
            body: JSON.stringify(data)
        });
        setUser(res);
    }

    async function logout() {
        await api("/api/auth/logout", { method: "POST" });
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
