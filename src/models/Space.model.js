import { Schema, model } from "mongoose";

const spaceSchema = new Schema(

    {
        ubication: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        undertaking: {
            type: Schema.Types.ObjectId,
            ref: 'Undertaking',
            default: null
        },
        reservedUntil: {
            type: Date, 
            default: null
        }
    },

  { timestamps: true }
);

const Space = model("Space", spaceSchema);

export default Space;
