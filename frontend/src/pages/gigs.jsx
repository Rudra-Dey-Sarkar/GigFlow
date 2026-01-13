import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/auth-context";
import CreateGig from "../components/gig/create-gig";
import BidForm from "../components/bid/bid-form";
import Modal from "../components/modal";

export default function Gigs() {
    const [gigs, setGigs] = useState([]);
    const [appliedGigIds, setAppliedGigIds] = useState(new Set());
    const [showCreate, setShowCreate] = useState(false);
    const [showBid, setShowBid] = useState(null);
    const { user } = useAuth();

    async function loadGigs() {
        const gigsData = await api("/api/gigs");
        setGigs(gigsData);

        if (user) {
            const myBids = await api("/api/bids/my");
            setAppliedGigIds(
                new Set(myBids.map(bid => bid.gigId._id))
            );
        }
    }

    useEffect(() => {
        loadGigs();
    }, []);

    return (
        <div className="p-6 space-y-6">
            {/* Post Gig Button */}
            {user && (
                <button
                    onClick={() => setShowCreate(true)}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Post Gig
                </button>
            )}

            {/* Create Gig Modal */}
            {showCreate && (
                <Modal onClose={() => setShowCreate(false)}>
                    <CreateGig
                        onCreated={() => {
                            loadGigs();
                            setShowCreate(false);
                        }}
                    />
                </Modal>
            )}

            {/* Gig List */}
            <div className="grid gap-4 md:grid-cols-2">
                {gigs.map(gig => (
                    <div
                        key={gig._id}
                        className="bg-white p-4 rounded shadow"
                    >
                        <h2 className="font-semibold">{gig.title}</h2>
                        <p className="text-sm text-gray-600">{gig.description}</p>
                        <p className="mt-2 font-bold">₹{gig.budget}</p>

                        {/* Actions */}
                        {!user ? (
                            <p className="text-sm text-blue-600">
                                Login to apply
                            </p>
                        ) : String(gig.ownerId?._id) === String(user._id) ? (
                            <p className="text-sm text-gray-500">
                                You posted this gig
                            </p>
                        ) : appliedGigIds.has(gig._id) ? (
                            <p className="text-sm text-green-600">
                                You already applied
                            </p>
                        ) : (
                            <button
                                onClick={() => setShowBid(gig._id)}
                                className="mt-2 bg-gray-900 text-white px-3 py-1 rounded text-sm"
                            >
                                Apply
                            </button>
                        )
                        }

                        {/* Bid Modal */}
                        {showBid === gig._id && (
                            <Modal onClose={() => setShowBid(null)}>
                                <BidForm
                                    gigId={gig._id}
                                    onBid={() => {
                                        loadGigs();
                                        setShowBid(null);
                                    }}
                                />
                            </Modal>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
