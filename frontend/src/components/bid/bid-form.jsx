import { useState } from "react";
import { api } from "../../api/client";

export default function BidForm({ gigId, onBid }) {
    const [form, setForm] = useState({ message: "", price: "" });
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await api("/api/bids", {
                method: "POST",
                body: JSON.stringify({
                    gigId,
                    message: form.message,
                    price: Number(form.price)
                })
            });
            setForm({ message: "", price: "" });
            onBid();
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-3 space-y-2">
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <input
                placeholder="Message"
                className="w-full border p-2 rounded"
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
            />

            <input
                type="number"
                placeholder="Your price"
                className="w-full border p-2 rounded"
                value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })}
            />

            <button className="text-sm bg-gray-900 text-white px-3 py-1 rounded">
                Apply
            </button>
        </form>
    );
}
