import { Bid } from "../model/bid.js";
import { Gig } from "../model/gig.js";

export async function createBid(req, res) {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || price == null) {
        return res.status(400).json({ error: "all fields are required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig) {
        return res.status(404).json({ error: "gig not found" });
    }

    if (gig.status !== "open") {
        return res.status(400).json({ error: "gig is not open for bidding" });
    }

    try {
        const bid = await Bid.create({
            gigId,
            freelancerId: req.user._id,
            message,
            price
        });

        res.status(201).json(bid);
    } catch {
        return res.status(400).json({ error: "you already bid on this gig" });
    }
}

export async function getBidsForGig(req, res) {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) {
        return res.status(404).json({ error: "gig not found" });
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "not authorized" });
    }

    const bids = await Bid.find({ gigId })
        .populate("freelancerId", "name email")
        .sort({ createdAt: -1 });

    res.json(bids);
}
