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
