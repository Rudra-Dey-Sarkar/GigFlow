import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../model/user.js";
import { Gig } from "../model/gig.js";
import { Bid } from "../model/bid.js";
import { hireBid } from "../services/hire.js";

dotenv.config();

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected\n");

    console.log("Starting race condition test...\n");

    // Create gig owner
    const owner = await User.create({
        name: "Owner",
        email: `owner${Date.now()}@test.com`,
        password: "password"
    });
    console.log("Owner created");

    // Create gig
    const gig = await Gig.create({
        title: "Test Gig",
        description: "Race condition test",
        budget: 500,
        ownerId: owner._id
    });
    console.log("Gig created");

    // Create freelancer
    const freelancer = await User.create({
        name: "Freelancer",
        email: `freelancer${Date.now()}@test.com`,
        password: "password"
    });
    console.log("Freelancer created");

    // Create bid
    const bid = await Bid.create({
        gigId: gig._id,
        freelancerId: freelancer._id,
        message: "I can do this",
        price: 450
    });
    console.log("Bid created\n");

    // Fire TWO hire requests in parallel
    console.log("Firing parallel hire requests...\n");

    const results = await Promise.allSettled([
        hireBid(bid._id, owner._id),
        hireBid(bid._id, owner._id)
    ]);

    results.forEach((result, index) => {
        console.log(`Hire attempt ${index + 1}:- `);
        if (result.status === "fulfilled") {
            console.log({ message: "freelancer hired successfully" });
        } else {
            console.log({ error: result.reason.message });
        }
        console.log();
    });

    // Cleanup
    console.log("Cleaning up test data...");

    await Bid.deleteMany({ gigId: gig._id });
    await Gig.findByIdAndDelete(gig._id);
    await User.deleteMany({ _id: { $in: [owner._id, freelancer._id] } });

    console.log("Cleanup completed");
    console.log("\nRace condition test completed");

    await mongoose.disconnect();
    process.exit(0);
}

main().catch(async err => {
    console.error(err);
    await mongoose.disconnect();
    process.exit(1);
});
