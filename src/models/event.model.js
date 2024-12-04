import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quotas: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    spaces: [
      {
        value: { type: Number },
        state: { type: Boolean, default: false },  
      },
    ],
    undertaking: [
      {
        type: Schema.Types.ObjectId,
        ref: "Undertaking",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Event = model("Event", eventSchema);
export default Event;
