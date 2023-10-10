import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    title: String,
    picture: String,
    email: String,
    mentions: [{
        name: String,
        avatar: String,
        _id: String
    }]
})


export const PostModel = mongoose.model('posts', PostSchema)