import mongoose from 'mongoose'

const { ObjectId } = mongoose.Schema.Types


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    posts: Array,
    followers: [{ type: ObjectId, ref: 'users' }],
    followings: [{ type: ObjectId, ref: 'users' }],
    avatar: String,
    tagLine: String
})


export const UserModel = mongoose.model('users', UserSchema)