import { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    undertakingId: {
      type: Schema.Types.ObjectId,
      ref: "Undertaking",
      required: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      // required: true,
    },
  },
  { timestamp: true }
);

const Comment = model("Comment", commentSchema);
export default Comment;
