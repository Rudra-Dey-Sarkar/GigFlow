import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
    {
        gigId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "gig",
            required: true
        },
        freelancerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        message: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: ["pending", "hired", "rejected"],
            default: "pending"
        }
    },
    { timestamps: true }
);

// prevent same freelancer bidding twice on same gig
bidSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });

export const Bid = mongoose.model("bid", bidSchema);
