import { useEffect, useState } from "react";
import { api } from "../api/client";
import CreateGig from "../components/create-gig";

export default function Gigs() {
    const [gigs, setGigs] = useState([]);

    async function loadGigs() {
        const data = await api("/api/gigs");
        setGigs(data);
    }

    useEffect(() => {
        loadGigs();
    }, [gigs]);

    return (
        <div className="p-6 space-y-6">
            <CreateGig onCreated={loadGigs} />

            <div className="grid gap-4 md:grid-cols-2">
                {gigs.map(gig => (
                    <div
                        key={gig._id}
                        className="bg-white p-4 rounded shadow"
                    >
                        <h2 className="font-semibold">{gig.title}</h2>
                        <p className="text-sm text-gray-600">
                            {gig.description}
                        </p>
                        <p className="mt-2 font-bold">₹{gig.budget}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
