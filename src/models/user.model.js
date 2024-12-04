import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        photo:{
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        Role: {
            type: [String],
            enum: ['admin', 'user', 'owner'],
            default: ['user']
        },
        undertaking: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Undertaking'
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    { timestamp: true }
)


const User = model('User', userSchema);

export default User;