import { useAuth } from "../context/auth-context";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="flex justify-between p-4 bg-white shadow">
            <h1 className="font-bold">GigFlow</h1>
            {user && (
                <button 
                onClick={logout} 
                className="text-sm text-red-500 font-semibold hover:underline">
                    Logout
                </button>
            )}
        </nav>
    );
}
