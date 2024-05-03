// activity.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    amount: {type: Number, require: true},
    date: {type: String, require:true},
    time: {type: String, require: true}
    // Add more fields as needed
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
