import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "./auth/auth-modal";
import { useAuth } from "../context/auth-context";

export default function Navbar() {
    const { pathname } = useLocation();
    const { user, logout } = useAuth();
    const [showAuth, setShowAuth] = useState(false);

    return (
        <nav className="flex justify-between items-center p-4 bg-white shadow">
            <Link to="/" className="font-bold">GigFlow</Link>

            <div className="flex gap-4 text-sm">
                <Link to="/" className={`hover:underline ${pathname === "/" ? "underline font-semibold" : ""}`}>Gigs</Link>

                {user ? (
                    <>
                        <Link to="/my-gigs" className={`hover:underline ${pathname === "/my-gigs" ? "underline font-semibold" : ""}`}>My Gigs</Link>
                        <Link to="/my-bids" className={`hover:underline ${pathname === "/my-bids" ? "underline font-semibold" : ""}`}>My Bids</Link>
                        <button onClick={logout} className="text-red-500 font-semibold hover:underline">
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => setShowAuth(true)}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Login / Register
                    </button>
                )}

                {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
            </div>
        </nav>
    );
}
