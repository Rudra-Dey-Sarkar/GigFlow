import { useEffect, useState } from "react";
import { api } from "../api/client";
import CreateGig from "../components/gig/create-gig";
import Modal from "../components/modal";

export default function MyGigs() {
    const [gigs, setGigs] = useState([]);
    const [showCreate, setShowCreate] = useState(false);

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

            {gigs.length>0 ? gigs.map(gig => (
                <div key={gig._id} className="bg-white p-4 rounded shadow">
                    <h3 className="font-semibold">{gig.title}</h3>
                    <p>Status: {gig.status}</p>
                    <p>Budget: {gig.budget}</p>
                </div>
            )) : <div className="text-gray-500">No gigs!</div>}
        </div>
    );
}
