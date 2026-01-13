import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Gigs() {
    const [gigs, setGigs] = useState([]);

    useEffect(() => {
        api("/api/gigs").then(setGigs);
    }, []);

    return (
        <div className="p-6 grid gap-4 md:grid-cols-2">
            {gigs.map(gig => (
                <div key={gig._id} className="bg-white p-4 rounded shadow">
                    <h2 className="font-semibold">{gig.title}</h2>
                    <p className="text-sm text-gray-600">{gig.description}</p>
                    <p className="mt-2 font-bold">₹{gig.budget}</p>
                </div>
            ))}
        </div>
    );
}
