import { useState } from "react";
import Login from "./login";
import Register from "./register";
import Modal from "../modal";

export default function AuthModal({ onClose }) {
    const [mode, setMode] = useState("login");

    return (
        <Modal onClose={onClose}>
            {mode === "login" ? (
                <Login 
                switchMode={() => setMode("register")}
                onClose={onClose} />
            ) : (
                <Register 
                switchMode={() => setMode("login")}
                onClose={onClose} />
            )}
        </Modal>
    );
}
