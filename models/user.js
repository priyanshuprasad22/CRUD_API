import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    age: {
        type: Number,
        required: true
    },
    firebaseUserId: {
        type: String
    }
});

const usermodel = mongoose.model('user', userSchema);

export default usermodel;
