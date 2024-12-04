import { Schema, model } from 'mongoose';

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        image:{
            type: String,
            required: true
        }
        ,
        description: {
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        undertaking: {
            type: Schema.Types.ObjectId,
            ref: 'Undertaking',
            required: true
        }
    },
    { timestamp: true }
)

const Product = model('Product', productSchema)

export default Product;