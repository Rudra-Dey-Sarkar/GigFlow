import { useEffect, useState } from "react";
import { api } from "../../api/client";

export default function BidList({ gigId, onHire }) {
    const [bids, setBids] = useState([]);

    useEffect(() => {
        api(`/api/bids/${gigId}`).then(setBids);
    }, [gigId]);

    return (
        <div className="space-y-3">
            <h3 className="font-semibold">Bids</h3>

            {bids.map(bid => (
                <div
                    key={bid._id}
                    className="border p-3 rounded flex justify-between items-center"
                >
                    <div>
                        <p className="font-medium">{bid.freelancerId.name}</p>
                        <p className="text-sm text-gray-600">₹{bid.price}</p>
                        <p className="text-sm">{bid.message}</p>
                        <p className="text-xs">Status: {bid.status}</p>
                    </div>

                    {bid.status === "pending" && (
                        <button
                            onClick={() => onHire(bid._id)}
                            className="bg-black text-white px-3 py-1 rounded text-sm"
                        >
                            Hire
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}
