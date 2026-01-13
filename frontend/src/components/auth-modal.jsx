import { useState } from "react";
import Login from "../pages/login";
import Register from "../pages/register";
import Modal from "./modal";

export default function AuthModal({ onClose }) {
    const [mode, setMode] = useState("login");

    return (
        <Modal onClose={onClose}>
            {mode === "login" ? (
                <Login switchMode={() => setMode("register")} />
            ) : (
                <Register switchMode={() => setMode("login")} />
            )}
        </Modal>
    );
}
