"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const models_1 = require("../models/");
// Resolvers
const resolvers = {
    Query: {
        getUserByEmail: (_, { email }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!email)
                throw new Error('Email ID required !');
            try {
                const user = yield models_1.UserModel.findOne({ email });
                if (user) {
                    return user;
                }
                else {
                    throw new Error('User not found !');
                }
            }
            catch (_a) {
                throw new Error(`Error While Getting User`);
            }
        }),
        getPosts: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const posts = yield models_1.PostModel.find({});
                if (posts) {
                    return posts;
                }
                else
                    throw new Error('Unable to get posts');
            }
            catch (error) {
                throw new Error('Error while Getting Posts');
            }
        }),
        getUserByName: (_, { name }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const regex = new RegExp(name, 'i');
                const user = yield models_1.UserModel.find({ name: regex });
                return user;
            }
            catch (error) {
                throw new Error('Error while getting users');
            }
        })
    },
    User: {
        posts: ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const posts = yield models_1.PostModel.find({ email });
                return posts;
            }
            catch (error) {
                throw new Error(`Error while getting posts ${error}`);
            }
        }),
        followings: ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
            var _b;
            try {
                const followings = yield models_1.UserModel.find({ email });
                return (_b = followings[0]) === null || _b === void 0 ? void 0 : _b.followings;
            }
            catch (error) {
                throw new Error('Error while getting followings');
            }
        }),
        followers: ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
            var _c;
            try {
                const followers = yield models_1.UserModel.find({ email });
                return (_c = followers[0]) === null || _c === void 0 ? void 0 : _c.followers;
            }
            catch (error) {
                throw new Error('Error while getting followers');
            }
        }),
    },
    Post: {
        account: ({ email }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const account = yield models_1.UserModel.findOne({ email });
                return {
                    name: account === null || account === void 0 ? void 0 : account.name,
                    avatar: account === null || account === void 0 ? void 0 : account.avatar
                };
            }
            catch (error) {
                throw new Error(`Error while Post Profile Information ${error}`);
            }
        })
    },
    Mutation: {
        updateUserByEmail: (_, { email, payload }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const update = yield models_1.UserModel.findOneAndUpdate({ email }, payload, { new: true });
                if (update) {
                    return 'Updated Successfully...';
                }
                else {
                    throw new Error('Unable to update user :(');
                }
            }
            catch (error) {
                throw new Error('Error while updating user !');
            }
        }),
        createPost: (_, { payload }) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const post = new models_1.PostModel(payload);
                const response = yield post
                    .save()
                    .then(() => 'Post Created Successfully...')
                    .catch(() => 'Something went wrong !');
                return response;
            }
            catch (error) {
                throw new Error(`Error while creating post ${error}`);
            }
        }),
        follow: (_, { payload }) => __awaiter(void 0, void 0, void 0, function* () {
            const { Id, followId } = payload;
            const response = yield models_1.UserModel.findByIdAndUpdate(followId, { $push: { followers: Id } }, { new: true })
                .then(() => {
                const response = models_1.UserModel.findByIdAndUpdate(Id, { $push: { followings: followId } }, { new: true })
                    .then(() => {
                    return 'Followed Succesfully...';
                })
                    .catch((err) => {
                    throw new Error(err);
                });
                return response;
            })
                .catch(err => {
                throw new Error(err);
            });
            return response;
        }),
        unFollow: (_, { payload }) => __awaiter(void 0, void 0, void 0, function* () {
            const { Id, followId } = payload;
            const response = yield models_1.UserModel.findByIdAndUpdate(followId, { $pull: { followers: Id } }, { new: true })
                .then(() => {
                const response = models_1.UserModel.findByIdAndUpdate(Id, { $pull: { followings: followId } }, { new: true })
                    .then(() => {
                    return 'Unfollowed Succesfully...';
                })
                    .catch((err) => {
                    throw new Error(err);
                });
                return response;
            })
                .catch(err => {
                throw new Error(err);
            });
            return response;
        })
    }
};
exports.resolvers = resolvers;
