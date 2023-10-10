import mongoose from 'mongoose'

const connectDB = async () => {
    await mongoose.connect(`${process.env.MONGO_CONNECT_URL}`)
        .then(() => console.log('Connected To DB'))
        .catch(err => console.log('Error while connecting to DB', err))
}

export { connectDB }