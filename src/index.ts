import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { config } from 'dotenv'
import { connectDB } from './db/config'
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import cors from 'cors'

// Dotenv
config()

// GraphQl
async function init() {
    // Connect To DB
    connectDB()

    const app = express() 
    app.use(cors({
        origin: "*"
    }))
    app.use(express.json({ limit: '500mb' }))
    
    const PORT = Number(process.env.PORT) || 8000

    // Create Graphql Server
    const gqlServer = new ApolloServer({ typeDefs, resolvers })

    await gqlServer.start()
    app.use('/api', expressMiddleware(gqlServer))
    app.listen(PORT, () => console.log('Server is running...'))
}


init()