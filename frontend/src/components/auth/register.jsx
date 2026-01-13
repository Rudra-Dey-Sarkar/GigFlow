import { useState } from "react";
import { useAuth } from "../../context/auth-context";

export default function Register({ switchMode, onClose }) {
    const { register } = useAuth();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        setLoading(true);
        e.preventDefault();
        try {
            await register(form);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-fit items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-80 space-y-4"
            >
                <h2 className="font-bold text-xl">Register</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <input
                    placeholder="Name"
                    className="w-full border p-2 rounded"
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />

                <input
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                <button
                    disabled={loading}
                    className={`w-full p-2 rounded text-white
                              ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-black"}
                             `}>
                    Register
                </button>
                <p className="text-sm text-center">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={switchMode}
                        className="text-blue-600"
                    >
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
}
