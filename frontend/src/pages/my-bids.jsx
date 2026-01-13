import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function MyBids() {
    const [bids, setBids] = useState([]);

    useEffect(() => {
        api("/api/bids/my").then(setBids);
    }, []);

    return (
        <div className="p-6 space-y-4">
            <h2 className="font-bold text-xl">My Applications</h2>

            {bids.length === 0 && (
                <p className="text-gray-500">You haven’t applied to any gigs yet.</p>
            )}

            {bids.map(bid => (
                <div
                    key={bid._id}
                    className="bg-white p-4 rounded shadow space-y-1"
                >
                    {/* Gig details */}
                    <h3 className="font-semibold">{bid.gigId.title}</h3>
                    <p className="text-sm text-gray-600">
                        Budget: ₹{bid.gigId.budget}
                    </p>
                    <p className="text-sm">
                        Gig Status:{" "}
                        <span className="font-medium">{bid.gigId.status}</span>
                    </p>

                    <hr className="my-2" />

                    {/* My bid details */}
                    <p className="text-sm">
                        Your Bid: ₹{bid.price}
                    </p>
                    <p className="text-sm text-gray-600">
                        Message: {bid.message}
                    </p>
                    <p className="text-sm">
                        Bid Status:{" "}
                        <span className="font-medium">{bid.status}</span>
                    </p>
                </div>
            ))}
        </div>
    );
}
