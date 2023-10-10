"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const UserSchema = new mongoose_1.default.Schema({
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
});
exports.UserModel = mongoose_1.default.model('users', UserSchema);
