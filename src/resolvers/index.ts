import { UserModel, PostModel } from "../models/"

// Resolvers
const resolvers = {
    Query: {
        getUserByEmail: async (_: any, { email }: { email: string }) => {
            if (!email) throw new Error('Email ID required !')

            try {
                const user = await UserModel.findOne({ email })

                if (user) {
                    return user
                }
                else {
                    throw new Error('User not found !')
                }
            }
            catch {
                throw new Error(`Error While Getting User`)
            }
        },
        getPosts: async () => {
            try {
                const posts = await PostModel.find({})
                if (posts) {
                    return posts
                }
                else throw new Error('Unable to get posts')
            }
            catch (error) {
                throw new Error('Error while Getting Posts')
            }
        },
        getUserByName: async (_: any, { name }: { name: string }) => {
            try {
                const regex = new RegExp(name, 'i')
                const user = await UserModel.find({ name:regex })
                return user
            }
            catch (error) {
                throw new Error('Error while getting users')
            }
        }
    },
    User: {
        posts: async ({ email }: { email: String }) => {
            try {
                const posts = await PostModel.find({ email })
                return posts
            } catch (error) {
                throw new Error(`Error while getting posts ${error}`)
            }
        },
        followings: async ({ email }: { email: String }) => {
            try {
                const followings = await UserModel.find({ email })
                return followings[0]?.followings
            }
            catch (error) {
                throw new Error('Error while getting followings')
            }
        },
        followers: async ({ email }: { email: String }) => {
            try {
                const followers = await UserModel.find({ email })
                return followers[0]?.followers
            }
            catch (error) {
                throw new Error('Error while getting followers')
            }
        },
    },
    Post: {
        account: async ({ email }: { email: String }) => {
            try {
                const account = await UserModel.findOne({ email })
                return {
                    name: account?.name,
                    avatar: account?.avatar
                }
            }
            catch (error) {
                throw new Error(`Error while Post Profile Information ${error}`)
            }
        }
    },
    Mutation: {
        updateUserByEmail: async (_: any, { email, payload }: { email: string, payload: {} }) => {
            try {
                const update = await UserModel.findOneAndUpdate({ email }, payload, { new: true })
                if (update) {
                    return 'Updated Successfully...'
                }
                else {
                    throw new Error('Unable to update user :(')
                }
            } catch (error) {
                throw new Error('Error while updating user !')
            }
        },
        createPost: async (_: any, { payload }: { email: string, payload: {} }) => {
            try {
                const post = new PostModel(payload)
                const response = await post
                    .save()
                    .then(() => 'Post Created Successfully...')
                    .catch(() => 'Something went wrong !')
                return response
            }
            catch (error) {
                throw new Error(`Error while creating post ${error}`)
            }
        },
        follow: async (_: any, { payload }: { payload: { followId: string, Id: string } }) => {
            const { Id, followId } = payload
            const response =
                await UserModel.findByIdAndUpdate(followId, { $push: { followers: Id } }, { new: true })
                    .then(() => {
                        const response = UserModel.findByIdAndUpdate(Id, { $push: { followings: followId } }, { new: true })
                            .then(() => {
                                return 'Followed Succesfully...'
                            })
                            .catch((err) => {
                                throw new Error(err)
                            })
                        return response
                    })
                    .catch(err => {
                        throw new Error(err)
                    })

            return response
        },
        unFollow: async (_: any, { payload }: { payload: { followId: string, Id: string } }) => {
            const { Id, followId } = payload
            const response =
                await UserModel.findByIdAndUpdate(followId, { $pull: { followers: Id } }, { new: true })
                    .then(() => {
                        const response = UserModel.findByIdAndUpdate(Id, { $pull: { followings: followId } }, { new: true })
                            .then(() => {
                                return 'Unfollowed Succesfully...'
                            })
                            .catch((err) => {
                                throw new Error(err)
                            })
                        return response
                    })
                    .catch(err => {
                        throw new Error(err)
                    })

            return response
        }
    }
}

export { resolvers }