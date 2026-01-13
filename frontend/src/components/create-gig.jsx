import { useState } from "react";
import { api } from "../api/client";

export default function CreateGig({ onCreated }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        budget: ""
    });
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api("/api/gigs", {
                method: "POST",
                body: JSON.stringify({
                    ...form,
                    budget: Number(form.budget)
                })
            });
            setForm({ title: "", description: "", budget: "" });
            onCreated();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-4 rounded shadow space-y-3"
        >
            <h3 className="font-semibold">Post a Gig</h3>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <input
                placeholder="Title"
                className="w-full border p-2 rounded"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
            />

            <textarea
                placeholder="Description"
                className="w-full border p-2 rounded"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
            />

            <input
                type="number"
                placeholder="Budget"
                className="w-full border p-2 rounded"
                value={form.budget}
                onChange={e => setForm({ ...form, budget: e.target.value })}
            />

            <button className="bg-black text-white px-4 py-2 rounded">
                Create
            </button>
        </form>
    );
}
