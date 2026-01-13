import { useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./auth-modal";
import { useAuth } from "../context/auth-context";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [showAuth, setShowAuth] = useState(false);

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow">
            <Link to="/" className="font-bold">GigFlow</Link>

            <div className="flex gap-4 text-sm">
                <Link to="/">Gigs</Link>

                {user ? (
                    <>
                        <Link to="/my-gigs">My Gigs</Link>
                        <Link to="/my-bids">My Bids</Link>
                        <button onClick={logout} className="text-red-500">
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setShowAuth(true)}
                        className="text-blue-600"
                    >
                        Login / Register
                    </button>
                )}

                {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
            </div>
        </nav>
    );
}
