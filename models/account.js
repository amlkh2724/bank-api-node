import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  cash: {
    type: Number,
    default: 0,
  },
  credit: {
    default: 0,
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});
export default mongoose.model("Account", accountSchema);
