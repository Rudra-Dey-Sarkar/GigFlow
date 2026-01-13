import { useState } from "react";
import { useAuth } from "../context/auth-context";

export default function Login({ switchMode }) {
    const { login } = useAuth();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await login(form);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-80 space-y-4"
            >
                <h2 className="font-bold text-xl">Login</h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

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

                <button className="w-full bg-black text-white p-2 rounded">
                    Login
                </button>
                
                <p className="text-sm text-center">
                    New here?{" "}
                    <button
                        type="button"
                        onClick={switchMode}
                        className="text-blue-600"
                    >
                        Register
                    </button>
                </p>
            </form>
        </div>
    );
}
