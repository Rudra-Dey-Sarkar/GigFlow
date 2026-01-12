import mongoose from "mongoose";
import { Gig } from "../model/gig.js";
import { Bid } from "../model/bid.js";

export async function hireBid(bidId, userId) {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const bid = await Bid.findById(bidId).session(session);
        if (!bid) throw new Error("bid not found");

        const gig = await Gig.findById(bid.gigId).session(session);
        if (!gig) throw new Error("gig not found");

        if (gig.ownerId.toString() !== userId.toString()) {
            throw new Error("not authorized");
        }
 
        if (gig.status !== "open") {
            throw new Error("gig already assigned");
        }

        // mark gig as assigned
        gig.status = "assigned";
        await gig.save({ session });

        // mark selected bid as hired
        bid.status = "hired";
        await bid.save({ session });

        // reject all other bids
        await Bid.updateMany(
            { gigId: gig._id, _id: { $ne: bid._id } },
            { status: "rejected" },
            { session }
        );

        await session.commitTransaction();
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}
