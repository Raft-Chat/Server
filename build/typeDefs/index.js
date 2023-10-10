"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
// Queries
const typeDefs = (0, apollo_server_express_1.gql) `
    scalar ObjectId

    type User {
        _id: String
        name: String
        email: String
        avatar: String
        tagLine: String
        posts: [Post]
        followers: [ObjectId]
        followings: [ObjectId]
    }

    type PostAccountProfile {
        name: String!
        avatar: String
    }

    type PostMention{
        name: String
        avatar: String
        _id: String
    }

    type Post {
        title: String
        picture: String
        email: String!
        account: PostAccountProfile!
        mentions: [PostMention]
    }

    input UpdateUser {
        name: String,
        tagLine: String,
        avatar: String,
    }

    input PostMentions {
        name: String
        avatar: String
        _id: String
    }

    input PostAccount {        
        name: String,
        avatar: String
    }

    input CreatePost {
        email: String !
        picture: String
        title: String!
        mentions: [PostMentions],
        account: PostAccount
    }

    input FollowInput{
        followId: String!
        Id: String!
    }

    type Query {
        getUserByEmail(email:String!) : User
        getUserByName(name:String!) : [User]
        getPosts: [Post]
    }

    type Mutation{
        updateUserByEmail(email: String!, payload: UpdateUser!): String
        createPost(payload: CreatePost!): String,
        follow(payload: FollowInput!): String,
        unFollow(payload: FollowInput!): String
    }
`;
exports.typeDefs = typeDefs;
