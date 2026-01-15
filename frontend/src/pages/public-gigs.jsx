import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/auth-context";
import BidForm from "../components/bid/bid-form";
import Modal from "../components/modal";
import AuthModal from "../components/auth/auth-modal";

export default function PublicGigs() {
    const { user } = useAuth();
    const [gigs, setGigs] = useState([]);
    const [appliedGigIds, setAppliedGigIds] = useState(new Set());
    const [showBid, setShowBid] = useState(null);
    const [showAuth, setShowAuth] = useState(false);
    const [search, setSearch] = useState("");

    async function loadGigs() {
        const query = search ? `?search=${encodeURIComponent(search)}` : "";
        const gigsData = await api(`/api/gigs${query}`);
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
    }, [user, search]);

    if (gigs.length === 0) {
        return (<div className="flex flex-col p-6 space-y-6 gap-2 text-gray-500">
            <input
                placeholder="Search gigs by title..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full md:w-1/2 border p-2 rounded"
            />
            No gigs!
        </div>);
    } else {
        return (
            <div className="p-6 space-y-6">
                <input
                    placeholder="Search gigs by title..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full md:w-1/2 border p-2 rounded"
                />

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
                                <button
                                    onClick={() => setShowAuth(true)}
                                    className="text-sm text-blue-600">
                                    Login to apply
                                </button>
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
                            {/* Auth Modal */}
                            {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
