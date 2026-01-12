import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../model/user.js";
import { Gig } from "../model/gig.js";
import { Bid } from "../model/bid.js";

dotenv.config();

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected\n");
    
    console.log("Started cleaning data");
    await Bid.deleteMany();
    await Gig.deleteMany();
    await User.deleteMany();
    console.log("Database cleared");

    await mongoose.disconnect();
    process.exit(0);
}

main().catch(async err => {
    console.error(err);
    await mongoose.disconnect();
    process.exit(1);
});
