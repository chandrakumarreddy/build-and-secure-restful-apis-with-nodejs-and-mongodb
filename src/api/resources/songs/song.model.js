import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
const { Schema } = mongoose;

const songsSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Songs must have title'],
    },
    url: {
        type: String,
        required: [true, 'Songs must have url'],
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
});
songsSchema.plugin(mongoosePaginate);

export default mongoose.model('Song', songsSchema);
