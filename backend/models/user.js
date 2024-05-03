// user.js
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true}
    // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

export default User;
