import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  history: {
    type: [historySchema],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);
export default User;
export { userSchema, historySchema };