import { useEffect, useState } from "react";
import { api } from "../api/client";
import CreateGig from "../components/gig/create-gig";
import Modal from "../components/modal";
import BidList from "../components/bid/bid-list";

export default function MyGigs() {
    const [gigs, setGigs] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [activeGig, setActiveGig] = useState(null);

    async function loadMyGigs() {
        const data = await api("/api/gigs/my");
        setGigs(data);
    }

    useEffect(() => {
        loadMyGigs();
    }, []);

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-xl">My Gigs</h2>
                <button
                    onClick={() => setShowCreate(true)}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Post Gig
                </button>
            </div>
            <p className="text-gray-500">You see the gigs that you posted</p>

            {gigs.length > 0 ? gigs.map(gig => (
                <div key={gig._id} className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">{gig.title}</h3>
                    <p>Status: {gig.status}</p>
                    <p>Budget: ₹{gig.budget}</p>

                    <button
                        onClick={() => setActiveGig(gig._id)}
                        className="text-sm text-blue-600"
                    >
                        View Bids
                    </button>

                    {gig.status === "assigned" && (
                        <button
                            onClick={() =>
                                api(`/api/gigs/${gig._id}/complete`, { method: "PATCH" })
                                    .then(loadMyGigs)
                            }
                            className="ml-2 text-sm text-green-600"
                        >
                            Mark Completed
                        </button>
                    )}
                </div>
            )) : <div className="text-gray-500">No gigs!</div>}

            {showCreate && (
                <Modal onClose={() => setShowCreate(false)}>
                    <CreateGig
                        onCreated={() => {
                            loadMyGigs();
                            setShowCreate(false);
                        }}
                    />
                </Modal>
            )}
            {activeGig && (
                <Modal onClose={() => setActiveGig(null)}>
                    <BidList
                        gigId={activeGig}
                        onHire={async bidId => {
                            await api(`/api/bids/${bidId}/hire`, { method: "PATCH" });
                            loadMyGigs();
                            setActiveGig(null);
                        }}
                    />
                </Modal>
            )}
        </div>
    );
}
