import mongoose from "mongoose";

const gigSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    budget: {
      type: Number,
      required: true,
      min: 0
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    status: {
      type: String,
      enum: ["open", "assigned", "completed"],
      default: "open"
    }
  },
  { timestamps: true }
);

// search by title
gigSchema.index({ title: "text" });

export const Gig = mongoose.model("gig", gigSchema);
