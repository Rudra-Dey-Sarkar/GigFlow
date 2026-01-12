import { Gig } from "../model/gig.js"

export async function createGig(req, res) {
    const { title, description, budget } = req.body;

    if (!title || !description || budget == null) {
        return res.status(400).json({ error: "all fields are required" });
    }

    const gig = await Gig.create({
        title,
        description,
        budget,
        ownerId: req.user._id
    });

    res.status(201).json(gig);
}

export async function getOpenGigs(req, res) {
    const { search } = req.query;

    const query = {
        status: "open"
    };

    if (search) {
        query.$text = { $search: search };
    }

    const gigs = await Gig.find(query)
        .sort({ createdAt: -1 })
        .populate("ownerId", "name");

    res.json(gigs);
}

export async function getMyGigs(req, res) {
    const gigs = await Gig.find({ ownerId: req.user._id })
        .sort({ createdAt: -1 });

    res.json(gigs);
}

export async function completeGig(req, res) {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) {
        return res.status(404).json({ error: "gig not found" });
    }

    if (gig.ownerId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "not authorized" });
    }

    if (gig.status !== "assigned") {
        return res.status(400).json({ error: "only assigned gigs can be completed" });
    }

    gig.status = "completed";
    await gig.save();

    res.json({ message: "gig marked as completed" });
}